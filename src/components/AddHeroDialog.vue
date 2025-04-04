<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import EditHero from "@/components/EditHero.vue";

export default {
  name: "AddHeroDialog",
  components: { EditHero },
  setup() {
    const store = useStore();
    const dialog = ref(false);
    const selectedHero = ref(null);
    const tab = ref(0);
    const emptyHero = ref({ publicName: "", realName: "", powers: [] });

    const heroAliases = computed(() => store.state.general.HeroAliases);
    const currentTeam = computed(() => store.state.general.CurrentTeam);

    const sortedHeroes = computed(() =>
      heroAliases.value
        .filter(
          (obj1) =>
            !currentTeam.value.members.some((obj2) => obj1._id === obj2._id)
        )
        .sort((a, b) => a.publicName > b.publicName)
    );

    const isValidForm = computed(() => selectedHero.value !== null);

    const displayDialog = () => {
      dialog.value = true;
    };

    const createNewHero = async (hero) => {
      dialog.value = false;
      const creation = await store.dispatch("general/createHero", hero);
      const id = creation._id;
      const data = {
        idTeam: currentTeam.value._id,
        heroes: [id],
      };
      await store.dispatch("general/addHeroesToTeam", data);
    };

    const recruitHero = async () => {
      dialog.value = false;
      const data = {
        idTeam: currentTeam.value._id,
        heroes: [selectedHero.value._id],
      };
      await store.dispatch("general/addHeroesToTeam", data);
      selectedHero.value = null;
    };

    onMounted(() => {
      store.dispatch("general/getHeroAliases");
    });

    return {
      dialog,
      selectedHero,
      tab,
      emptyHero,
      sortedHeroes,
      isValidForm,
      displayDialog,
      createNewHero,
      recruitHero,
    };
  },
};
</script>

<template>
  <div class="add-hero-dialog">
    <v-dialog v-model="dialog" max-width="500">
      <v-tabs v-model="tab">
        <v-tab key="0">Recruter un héro</v-tab>
        <v-tab key="1">Créer un héro</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card>
            <v-card-title>
              <span class="headline">Recruter un héro</span>
            </v-card-title>

            <v-card-text>
              <v-virtual-scroll :items="sortedHeroes" height="350" item-height="48">
                <template v-slot:default="{ item }">
                  <v-list-item>
                    <v-checkbox
                      :label="item.publicName"
                      :value="item"
                      v-model="selectedHero"
                    ></v-checkbox>
                  </v-list-item>
                </template>
              </v-virtual-scroll>
            </v-card-text>

            <v-card-actions>
              <v-btn @click="dialog = false" color="error">Annuler</v-btn>
              <v-btn :disabled="!isValidForm" color="success" @click="recruitHero">
                Valider
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <br />
          <EditHero :hero="emptyHero" @cancel="dialog = false" @valid="createNewHero" />
        </v-tab-item>
      </v-tabs-items>
    </v-dialog>
  </div>
</template>

<style scoped></style>
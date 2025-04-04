<template>
  <div class="TeamView">
    <div v-if="!CurrentTeam">
      <h2>Aucune équipe sélectionnée</h2>
      <v-btn color="success" @click="router.push('/organisations')">OK</v-btn>
    </div>
    <v-container v-else>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr style="border: 2px solid black">
              <th class="text-left">Id</th>
              <th class="text-left" colspan="2">Nom</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ CurrentTeam._id }}</td>
              <td colspan="2">{{ CurrentTeam.name }}</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th class="text-left" colspan="2">
                Membres
                <v-btn color="success" class="ma-3" @click="openAddDialog"
                  >Ajouter</v-btn
                >
              </th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(member, index) in CurrentTeam.members" :key="index">
              <td colspan="2">
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Id</th>
                        <th class="text-left">Nom</th>
                        <th class="text-left">Alias</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="member">
                        <td>{{ member._id }}</td>
                        <td>{{ member.publicName }}</td>
                        <td>{{ member.realName }}</td>
                      </tr>
                      <tr v-else>
                        <td colspan="3">Chargement...</td>
                      </tr>
                    </tbody>
                    <thead>
                      <tr>
                        <th class="text-left" colspan="3">Pouvoirs</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colspan="3">
                          <v-list-item
                            v-for="(power, index) in member.powers"
                            :key="index"
                          >
                            <v-list-item-content>
                              <v-list-item-title>
                                {{ power.name }} de type
                                {{ HeroPowerTypes[power.type - 1] }} et niveau
                                {{ power.level }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </td>
              <td>
                <v-btn color="warning" class="ma-3" @click="selectHero(member)"
                  >Modifier</v-btn
                >
                <v-btn color="error" @click="removeHero(member)"
                  >Supprimer</v-btn
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <AddHeroDialog ref="addHeroDialogRef" />

      <EditHeroDialog
        :hero="selectedHero"
        ref="editHeroDialogRef"
        @valid="update"
      />

      <ConfirmDialog ref="confirmDialogRef" />
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useGeneralStore } from "@/store/modules/general";
import AddHeroDialog from "@/components/AddHeroDialog.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import EditHeroDialog from "@/components/EditHeroDialog.vue";

// Setup router
const router = useRouter();

// Setup store
const generalStore = useGeneralStore();

// Setup refs
const selectedHero = ref({ publicName: "", realName: "", powers: [] });
const addHeroDialogRef = ref(null);
const editHeroDialogRef = ref(null);
const confirmDialogRef = ref(null);

// Setup computed properties
const CurrentTeam = computed(() => generalStore.CurrentTeam);
const HeroPowerTypes = computed(() => generalStore.HeroPowerTypes);

// Methods
const openAddDialog = () => {
  addHeroDialogRef.value.displayDialog();
};

const removeHero = async (hero) => {
  const data = {
    idTeam: CurrentTeam.value._id,
    heroes: [hero._id],
  };
  
  confirmDialogRef.value.displayDialog(
    "Suppression",
    "Voulez-vous vraiment enlever de l'équipe le héros " + hero.publicName,
    () => {
      generalStore.removeHeroesFromTeam(data);
    }
  );
};

const selectHero = (hero) => {
  selectedHero.value = hero;
  editHeroDialogRef.value.displayDialog();
};

const update = async (hero) => {
  hero._id = selectedHero.value._id;
  await generalStore.updateHero(hero);
};
</script>
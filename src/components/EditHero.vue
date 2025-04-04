<script>
import { ref, watch } from "vue";

export default {
  name: "EditHero",
  props: {
    hero: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const localHero = ref({ ...props.hero });

    watch(
      () => props.hero,
      (newHero) => {
        localHero.value = { ...newHero };
      }
    );

    const cancel = () => {
      emit("cancel");
    };

    const save = () => {
      emit("valid", localHero.value);
    };

    return {
      localHero,
      cancel,
      save,
    };
  },
};
</script>

<template>
  <v-card>
    <v-card-title>
      <span class="headline">Modifier un héros</span>
    </v-card-title>
    <v-card-text>
      <v-text-field v-model="localHero.publicName" label="Nom public" required />
      <v-text-field v-model="localHero.realName" label="Nom réel" required />
    </v-card-text>
    <v-card-actions>
      <v-btn color="error" @click="cancel">Annuler</v-btn>
      <v-btn color="success" @click="save">Enregistrer</v-btn>
    </v-card-actions>
  </v-card>
</template>
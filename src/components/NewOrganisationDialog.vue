<script>
import { ref } from "vue";

export default {
  name: "NewOrganisationDialog",
  setup(_, { emit }) {
    const dialog = ref(false);
    const organisationName = ref("");

    const displayDialog = () => {
      dialog.value = true;
    };

    const createOrganisation = () => {
      emit("create", organisationName.value);
      dialog.value = false;
    };

    return {
      dialog,
      organisationName,
      displayDialog,
      createOrganisation,
    };
  },
};
</script>

<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>
        <span class="headline">Créer une organisation</span>
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="organisationName" label="Nom de l'organisation" required />
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="dialog = false">Annuler</v-btn>
        <v-btn color="success" @click="createOrganisation">Créer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
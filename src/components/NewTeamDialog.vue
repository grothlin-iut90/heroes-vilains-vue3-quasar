<script>
import { ref } from "vue";

export default {
  name: "NewTeamDialog",
  setup(_, { emit }) {
    const dialog = ref(false);
    const teamName = ref("");

    const displayDialog = () => {
      dialog.value = true;
    };

    const createTeam = () => {
      emit("create", teamName.value);
      dialog.value = false;
    };

    return {
      dialog,
      teamName,
      displayDialog,
      createTeam,
    };
  },
};
</script>

<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>
        <span class="headline">Créer une équipe</span>
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="teamName" label="Nom de l'équipe" required />
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="dialog = false">Annuler</v-btn>
        <v-btn color="success" @click="createTeam">Créer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
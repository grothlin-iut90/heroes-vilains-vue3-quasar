<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import AddTeamDialog from "@/components/AddTeamDialog.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

export default {
  name: "OrganisationView",
  components: { ConfirmDialog, AddTeamDialog },
  setup() {
    const store = useStore();

    const currentOrganisation = computed(() => store.state.general.CurrentOrganisation);

    const openAddDialog = () => {
      addTeamDialog.value.displayDialog();
    };

    const openConfirmDialog = (team) => {
      confirmDialog.value.displayDialog(
        "Confirmation",
        `Voulez-vous vraiment supprimer l'équipe : ${team.name}`,
        () => {
          store.dispatch("general/removeTeamFromOrganisation", { idTeam: team._id });
        }
      );
    };

    const selectTeam = async (team) => {
      await store.dispatch("general/setCurrentTeam", team);
      await router.push("/team");
    };

    const addTeamDialog = ref(null);
    const confirmDialog = ref(null);

    return {
      currentOrganisation,
      openAddDialog,
      openConfirmDialog,
      selectTeam,
      addTeamDialog,
      confirmDialog,
    };
  },
};
</script>

<template>
  <v-container class="OrganisationView">
    <h1>Organisation</h1>
    <div v-if="!currentOrganisation">
      <h2>Aucune organisation sélectionnée</h2>
      <v-btn color="success" @click="$router.push('/organisations')">OK</v-btn>
    </div>
    <div v-else>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Id</th>
              <th class="text-left">Nom</th>
              <th class="text-left">Secret</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ currentOrganisation._id }}</td>
              <td>{{ currentOrganisation.name }}</td>
              <td>{{ currentOrganisation.secret }}</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th class="text-left" colspan="2">
                Équipes
                <v-btn color="success" class="ma-3" @click="openAddDialog">Ajouter</v-btn>
              </th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="team in currentOrganisation.teams" :key="team._id">
              <td colspan="2">{{ team.name }}</td>
              <td>
                <v-btn color="warning" class="ma-3" @click="selectTeam(team)">Modifier</v-btn>
                <v-btn color="error" @click="openConfirmDialog(team)">Supprimer</v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <AddTeamDialog ref="addTeamDialog" />
      <ConfirmDialog ref="confirmDialog" />
    </div>
  </v-container>
</template>
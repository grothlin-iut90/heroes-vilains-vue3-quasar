<template>
  <v-container class="OrganisationView">
    <h1>Organisation</h1>
    <div v-if="!currentOrganisation">
      <h2>Aucune organisation sélectionnée</h2>
      <v-btn color="success" @click="router.push('/organisations')">OK</v-btn>
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
      <AddTeamDialog ref="addTeamDialogRef" />
      <ConfirmDialog ref="confirmDialogRef" />
    </div>
  </v-container>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import AddTeamDialog from "@/components/AddTeamDialog.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { useGeneralStore } from "@/store/modules/general";

const router = useRouter();
const generalStore = useGeneralStore();
const addTeamDialogRef = ref(null);
const confirmDialogRef = ref(null);

// Computed properties
const currentOrganisation = computed(() => generalStore.CurrentOrganisation);

// Methods
const openAddDialog = () => {
  addTeamDialogRef.value.displayDialog();
};

const openConfirmDialog = (team) => {
  confirmDialogRef.value.displayDialog(
    "Confirmation",
    `Voulez-vous vraiment supprimer l'équipe : ${team.name}`,
    () => {
      generalStore.removeTeamFromOrganisation({ idTeam: team._id });
    }
  );
};

const selectTeam = async (team) => {
  await generalStore.setCurrentTeam(team);
  await router.push("/team");
};
</script>
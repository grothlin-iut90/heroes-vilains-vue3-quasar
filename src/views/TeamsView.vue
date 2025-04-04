<template>
  <v-container>
    <h1>Teams</h1>

    <v-btn color="primary" @click="newTeam" class="mb-4">Ajouter</v-btn>
    <TeamsList :Teams="Teams"></TeamsList>

    <NewTeamDialog ref="newTeamDialogRef" />
  </v-container>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import TeamsList from "@/components/TeamsList.vue";
import NewTeamDialog from "@/components/NewTeamDialog.vue";
import { useGeneralStore } from "@/store/modules/general";

const generalStore = useGeneralStore();
const newTeamDialogRef = ref(null);

// Computed properties
const Teams = computed(() => generalStore.Teams);

// Methods
const newTeam = () => {
  newTeamDialogRef.value.displayDialog();
};

// Lifecycle hooks
onMounted(() => {
  generalStore.getTeams();
});
</script>

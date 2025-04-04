<template>
  <div>
    <v-container>
      <h1>Organisations</h1>
      <v-btn color="primary" @click="newOrganisation" class="mb-4">Ajouter</v-btn>
      <OrganisationList :organisation-names="sortedOrganisationNames" />
    </v-container>

    <AddOrganisationDialog ref="addOrgDialogRef" />
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import OrganisationList from "@/components/OrganisationsList.vue";
import NewOrganisationDialog from "@/components/NewOrganisationDialog.vue";
import { useGeneralStore } from "@/store/modules/general";

const generalStore = useGeneralStore();
const addOrgDialogRef = ref(null);

// Computed properties
const organisationNames = computed(() => generalStore.OrganisationNames);
const sortedOrganisationNames = computed(() =>
  organisationNames.value.sort((a, b) => a.name.localeCompare(b.name))
);

// Methods
const getOrganisations = () => {
  generalStore.getOrganisations();
};

const newOrganisation = () => {
  addOrgDialogRef.value.displayDialog();
};

// Lifecycle hooks
onMounted(() => {
  getOrganisations();
});
</script>
<script>
import { useStore } from "vuex";
import { computed } from "vue";
import OrganisationList from "@/components/OrganisationsList.vue";
import NewOrganisationDialog from "@/components/NewOrganisationDialog.vue";

export default {
  name: "OrganisationsView",
  components: { AddOrganisationDialog: NewOrganisationDialog, OrganisationList },
  setup() {
    const store = useStore();

    const organisationNames = computed(() => store.state.general.OrganisationNames);

    const sortedOrganisationNames = computed(() =>
      organisationNames.value.sort((a, b) => a.name.localeCompare(b.name))
    );

    const getOrganisations = () => {
      store.dispatch("general/getOrganisations");
    };

    const newOrganisation = () => {
      addOrgDialog.value.displayDialog();
    };

    const addOrgDialog = ref(null);

    return {
      sortedOrganisationNames,
      getOrganisations,
      newOrganisation,
      addOrgDialog,
    };
  },
  mounted() {
    this.getOrganisations();
  },
};
</script>

<template>
  <div>
    <v-container>
      <h1>Organisations</h1>
      <v-btn color="primary" @click="newOrganisation" class="mb-4">Ajouter</v-btn>
      <OrganisationList :organisation-names="sortedOrganisationNames" />
    </v-container>

    <AddOrganisationDialog ref="addOrgDialog" />
  </div>
</template>
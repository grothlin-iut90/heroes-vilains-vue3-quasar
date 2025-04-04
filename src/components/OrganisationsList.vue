<script>
export default {
  name: "OrganisationsList",
  props: {
    organisationNames: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <v-list>
    <v-list-item v-for="organisation in organisationNames" :key="organisation._id">
      <v-list-item-content>
        <v-list-item-title>{{ organisation.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
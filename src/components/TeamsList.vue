<script>
export default {
  name: "TeamsList",
  props: {
    teams: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <v-list>
    <v-list-item v-for="team in teams" :key="team._id">
      <v-list-item-content>
        <v-list-item-title>{{ team.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
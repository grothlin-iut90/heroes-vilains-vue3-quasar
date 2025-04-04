<template>
  <v-app>
    <NavBar></NavBar>
    <v-main>
      <router-view />
    </v-main>
    <v-dialog v-model="errorDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Erreur</v-card-title>
        <v-card-text>{{ errorMessage }}</v-card-text>
        <v-card-actions>
          <v-btn color="error" @click="clearError">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "App",
  components: { NavBar },
  setup() {
    const store = useStore();

    const errorMessage = computed(() => store.state.errors.errorMessage);
    const errorDialog = computed(() => !!store.state.errors.errorMessage);

    const clearError = () => {
      store.dispatch("errors/clearError");
    };

    return {
      errorMessage,
      errorDialog,
      clearError,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

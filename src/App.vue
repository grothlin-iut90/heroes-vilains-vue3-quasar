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

<script setup>
import { computed } from "vue";
import NavBar from "@/components/NavBar.vue";
import { useErrorStore } from "@/store/modules/errors";

const errorStore = useErrorStore();

const errorMessage = computed(() => errorStore.errorMessage);
const errorDialog = computed(() => !!errorStore.errorMessage);

const clearError = () => {
  errorStore.clearError();
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
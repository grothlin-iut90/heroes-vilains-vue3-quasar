<script>
import { useStore } from "vuex";
import { ref } from "vue";

export default {
  name: "AuthentificationView",
  setup() {
    const store = useStore();
    const secretPhrase = ref("");

    const setOrganisationPassword = () => {
      store.dispatch("setOrganisationPassword", secretPhrase.value);
    };

    return {
      secretPhrase,
      setOrganisationPassword,
    };
  },
};
</script>

<template>
  <div class="AuthentificationView">
    <h1>Authentification</h1>
    <h3>Votre phrase secrète: </h3>
    <input type="text" v-model="secretPhrase" />
    <button @click="setOrganisationPassword">Valider</button>
  </div>
</template>
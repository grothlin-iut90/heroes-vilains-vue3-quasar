<script>
import { useStore } from "vuex";
import { ref } from "vue";

export default {
  name: "LoginView",
  setup() {
    const store = useStore();

    const loginInput = ref("");
    const password = ref("");
    const valid = ref(false);
    const errorMessage = ref("");

    const submit = async () => {
      const success = await store.dispatch("auth/login", {
        login: loginInput.value,
        password: password.value,
      });
      if (success) {
        await store.dispatch("auth/fetchUser", loginInput.value);
        router.push("/");
      } else {
        errorMessage.value = "Invalid login or password.";
      }
    };

    return {
      loginInput,
      password,
      valid,
      errorMessage,
      submit,
    };
  },
};
</script>

<template>
  <v-container>
    <h1>Login</h1>
    <v-form ref="form" v-model="valid">
      <v-text-field v-model="loginInput" label="Login" required></v-text-field>
      <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
      <v-btn :disabled="!valid" @click="submit">Login</v-btn>
      <v-btn @click="$router.push('/register')">Register</v-btn>
    </v-form>
  </v-container>
</template>
<template>
  <v-container>
    <h1>Login</h1>
    <v-form ref="form" v-model="valid">
      <v-text-field v-model="loginInput" label="Login" required></v-text-field>
      <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
      <v-btn :disabled="!valid" @click="submit">Login</v-btn>
      <v-btn @click="router.push('/register')">Register</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/modules/auth";

const router = useRouter();
const authStore = useAuthStore();

const loginInput = ref("");
const password = ref("");
const valid = ref(false);
const errorMessage = ref("");

const submit = async () => {
  const success = await authStore.login({
    login: loginInput.value,
    password: password.value,
  });
  if (success) {
    await authStore.fetchUser(loginInput.value);
    router.push("/");
  } else {
    errorMessage.value = "Invalid login or password.";
  }
};
</script>
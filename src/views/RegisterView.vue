<template>
  <v-container>
    <h1>Register</h1>
    <v-form ref="form" v-model="valid">
      <v-text-field v-model="login" label="Login" required></v-text-field>
      <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
      <v-text-field v-model="hero" label="Hero Name" required></v-text-field>
      <vue-recaptcha
        ref="recaptcha"
        :sitekey="captchaSiteKey"
        @verify="onCaptchaVerified"
        @expired="onCaptchaExpired"
      ></vue-recaptcha>
      <v-btn :disabled="!valid || !captchaToken" @click="submit">Register</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { VueRecaptcha } from "vue-recaptcha";
import { captchaSiteKey } from "@/commons/config";
import { useAuthStore } from "@/store/modules/auth";

const router = useRouter();
const authStore = useAuthStore();

const login = ref("");
const password = ref("");
const hero = ref("");
const captchaToken = ref(null);
const valid = ref(false);

const onCaptchaVerified = (token) => {
  captchaToken.value = token;
};

const onCaptchaExpired = () => {
  captchaToken.value = null;
};

const submit = async () => {
  const result = await authStore.registerUser({
    login: login.value,
    password: password.value,
    hero: hero.value,
    captchaToken: captchaToken.value,
  });
  if (result.error === 0) {
    router.push("/login");
  } else {
    console.log(result.data);
  }
};
</script>
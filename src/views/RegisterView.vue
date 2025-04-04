<script>
import { useStore } from "vuex";
import { ref } from "vue";
import { captchaSiteKey } from "@/commons/config";
import { VueRecaptcha } from "vue-recaptcha";

export default {
  name: "RegisterView",
  components: { VueRecaptcha },
  setup() {
    const store = useStore();

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
      const result = await store.dispatch("auth/registerUser", {
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

    return {
      login,
      password,
      hero,
      captchaToken,
      valid,
      captchaSiteKey,
      onCaptchaVerified,
      onCaptchaExpired,
      submit,
    };
  },
};
</script>

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
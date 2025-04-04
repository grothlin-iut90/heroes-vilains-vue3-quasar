<script>
import { ref } from "vue";

export default {
  name: "ConfirmDialog",
  setup() {
    const dialog = ref(false);
    const title = ref("");
    const message = ref("");
    const onConfirm = ref(() => {});

    const confirm = () => {
      onConfirm.value();
      dialog.value = false;
    };

    const displayDialog = (dialogTitle, dialogMessage, confirmCallback) => {
      dialog.value = true;
      title.value = dialogTitle;
      message.value = dialogMessage;
      onConfirm.value = confirmCallback;
    };

    return {
      dialog,
      title,
      message,
      onConfirm,
      confirm,
      displayDialog,
    };
  },
};
</script>

<template>
  <div class="ConfirmDialog">
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">
          {{ title }}
        </v-card-title>
        <v-card-text>
          {{ message }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Annuler
          </v-btn>
          <v-btn color="blue darken-1" text @click="confirm">
            Continuer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped></style>
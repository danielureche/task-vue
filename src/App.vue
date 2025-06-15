<template>
  <div id="app">
    <router-view />
    <Toaster position="bottom-right" />
  </div>
</template>

<script>
import { Toaster } from "vue-sonner";
import "vue-sonner/style.css";
export default {
  name: "App",
  components: {
    Toaster,
  },
};
</script>

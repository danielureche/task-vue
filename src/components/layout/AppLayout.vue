<!--
  AppLayout.vue

  Description:
  This is the main layout wrapper component used across authenticated views in the application.
  It sets up a consistent structure with a header (`AppHeader`) and a main content area where
  child routes are rendered via <router-view>.

  Features:
  - Global page wrapper with a dark background theme (`bg-slate-900`)
  - Includes the application’s top navigation bar (`AppHeader`)
  - Provides padding and container constraints for the main content area
  - Renders both slot content and dynamic routes using <router-view>

  Dependencies:
  - AppHeader.vue: Top-level navigation bar shared across views

  Props: None

  Slots:
  - default: Used to render optional content before the router-view

  Usage:
  <AppLayout>
    <YourCustomComponent />
  </AppLayout>

  Note:
  This layout is typically used for authenticated routes and provides a consistent user experience.
-->
<template>
  <div class="min-h-screen bg-slate-900">
    <!-- Global header -->
    <AppHeader />

    <!-- Main content container -->
    <main class="container mx-auto px-4 py-6">
      <!-- Optional slot content -->
      <slot />

      <!-- Route-based view rendering -->
      <router-view />
    </main>
  </div>
</template>

<script>
import AppHeader from "./AppHeader.vue";

export default {
  name: "AppLayout",
  components: {
    AppHeader,
  },
};
</script>

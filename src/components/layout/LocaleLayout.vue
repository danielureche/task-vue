<!--
  LocaleLayout.vue

  Description:
  A minimal layout component used as a wrapper for locale-specific routes.
  It allows Vue Router to manage nested routes while enabling per-locale routing logic,
  such as /en, /es, etc., typically configured at the router level.

  Features:
  - Acts as a passthrough component to render nested views
  - Commonly used in multi-language applications where localization is part of the route structure
  - Can be extended later to provide locale-aware wrappers or layout modifications

  Props: None

  Slots: None

  Usage:
  Used inside the router configuration as a parent layout to group all routes
  that share a common locale prefix.

  Example router config:
  {
    path: '/:locale',
    component: LocaleLayout,
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      ...
    ]
  }

  Note:
  This layout does not render any content of its own except the matched child route.
-->

<template>
  <router-view />
</template>

<script>
export default {
  name: "LocaleLayout",
};
</script>

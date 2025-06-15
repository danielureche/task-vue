<!--
  AppHeader.vue

  Description:
  The top navigation bar component of the application. It includes branding/logo, a localized title,
  language switcher, user avatar, and dropdown for user account actions like logout.

  Features:
  - Displays application logo and title (i18n-supported)
  - Allows user to switch languages via LanguageSelector
  - Shows the logged-in user’s avatar with a dropdown menu (name, email, logout)
  - Handles user logout and navigates to login screen
  - Fully responsive and accessible with focus styles

  Dependencies:
  - Avatar.vue: Displays user initials or avatar icon
  - UserDropdown.vue: Dropdown panel for user actions (name, email, logout)
  - LanguageSelector.vue: Component for switching application language
  - AuthService.js: Service that manages logout behavior

  Props: None

  Data:
  - showDropdown (Boolean): Toggles visibility of the user dropdown
  - userName (String): Retrieved from localStorage; displayed in the avatar and dropdown
  - userEmail (String): Retrieved from localStorage; displayed in the dropdown

  Methods:
  - toggleDropdown(): Opens/closes the user dropdown
  - closeDropdown(): Force closes the dropdown (used when clicking outside)
  - handleLogout(): Logs out the user and redirects to login

  Usage:
  <AppHeader />
-->

<template>
  <header class="bg-slate-800 border-slate-700">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <!-- Logo and Title -->
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 flex items-center justify-center">
          <img src="/src/assets/logo.png" alt="" />
        </div>
        <h1 class="text-xl font-semibold text-white">
          {{ $t("header.title") }}
        </h1>
      </div>

      <!-- Controls: Language switcher and user menu -->
      <div class="flex items-center gap-3 relative">
        <LanguageSelector />

        <div class="relative">
          <button
            @click="toggleDropdown"
            class="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded-full"
          >
            <Avatar :name="userName" />
          </button>

          <UserDropdown
            :show="showDropdown"
            :user-name="userName"
            :user-email="userEmail"
            @close="closeDropdown"
            @logout="handleLogout"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Avatar from "@/components/ui/Avatar.vue";
import UserDropdown from "@/components/ui/UserDropdown.vue";
import LanguageSelector from "@/components/ui/LanguageSelector.vue";
import AuthService from "@/services/AuthService";

export default {
  name: "AppHeader",
  components: {
    Avatar,
    UserDropdown,
    LanguageSelector,
  },
  data() {
    const user = JSON.parse(localStorage.getItem("authUser")) || {};
    return {
      showDropdown: false,
      userName: user.name,
      userEmail: user.email,
    };
  },
  methods: {
    /**
     * Toggle the visibility of the user dropdown menu.
     */
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },

    /**
     * Close the user dropdown menu.
     */
    closeDropdown() {
      this.showDropdown = false;
    },

    /**
     * Log the user out and redirect to login page.
     */
    async handleLogout() {
      await AuthService.logout();
      this.$router.push("/login");
    },
  },
};
</script>

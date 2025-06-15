vue Copiar código
<!--
  UserDropdown.vue

  Description:
  A dropdown menu component that displays user information and provides options
  for actions such as logging out. It is typically used in a navigation bar or header.

  Features:
  - Displays the user's name and email.
  - Emits a logout event when the logout button is clicked.
  - Emits a close event when the user clicks outside the dropdown.
  - Styled with a floating dropdown and full-screen overlay for outside click detection.
  - Localized text support using Vue i18n ($t).
  
  Props:
  - show (Boolean): Controls the visibility of the dropdown.
  - userName (String): The full name of the user to display.
  - userEmail (String): The email of the user to display.

  Emits:
  - logout: Triggered when the logout button is clicked.
  - close: Triggered when the user clicks outside the dropdown to close it.
  - profile: (Reserved for future use — e.g., user profile access).
  - settings: (Reserved for future use — e.g., user settings page).

  Usage:
  <UserDropdown
    :show="isDropdownVisible"
    :userName="user.name"
    :userEmail="user.email"
    @close="isDropdownVisible = false"
    @logout="handleLogout"
  />
-->

<template>
  <div class="relative">
    <!-- Dropdown menu -->
    <div
      v-if="show"
      class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
      @click.stop
    >
      <!-- User info section -->
      <div class="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
        <div class="font-medium">{{ userName }}</div>
        <div class="text-gray-500">{{ userEmail }}</div>
      </div>

      <!-- Menu options -->
      <div class="py-1">
        <button
          @click="handleLogout"
          class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          {{ $t("auth.logout") }}
        </button>
      </div>
    </div>

    <!-- Overlay to detect clicks outside the dropdown -->
    <div v-if="show" @click="$emit('close')" class="fixed inset-0 z-40"></div>
  </div>
</template>

<script>
export default {
  name: "UserDropdown",
  props: {
    /** Controls visibility of the dropdown */
    show: {
      type: Boolean,
      default: false,
    },
    /** Full name of the logged-in user */
    userName: {
      type: String,
      required: true,
    },
    /** Email of the logged-in user */
    userEmail: {
      type: String,
      required: true,
    },
  },
  emits: ["close", "logout", "profile", "settings"],
  methods: {
    /**
     * Emits logout and close events when logout is triggered.
     */
    handleLogout() {
      this.$emit("logout");
      this.$emit("close");
    },
  },
};
</script>

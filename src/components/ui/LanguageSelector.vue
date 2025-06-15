<!--
  LanguageSelector.vue

  Description:
  A dropdown component that allows users to switch between supported languages.
  Integrates with Vue Router and vue-i18n for dynamic locale-based routing and localization.
  Stores the selected language in localStorage to persist user preferences.

  Features:
  - Displays the current language with an associated flag.
  - Dropdown menu shows available languages with visual selection indicators.
  - Automatically updates the i18n locale and URL prefix on language change.
  - Reacts to changes in route locale and keeps locale in sync.

  Props: None

  Emits: None

  External dependencies:
  - vue-i18n
  - Vue Router

  Usage:
  <LanguageSelector />

  Accessibility:
  - Buttons are focusable and keyboard-accessible.
  - Uses semantic HTML for button elements.
-->

<template>
  <div class="relative">
    <!-- Trigger button -->
    <button
      @click="toggleDropdown"
      class="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800"
    >
      <span class="text-white text-sm font-medium">
        {{ currentLanguage.code.toUpperCase() }}
      </span>

      <svg
        class="w-4 h-4 text-gray-300 transition-transform duration-200"
        :class="{ 'rotate-180': showDropdown }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <!-- Dropdown content -->
    <div
      v-if="showDropdown"
      class="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
      @click.stop
    >
      <button
        v-for="language in availableLanguages"
        :key="language.code"
        @click="changeLanguage(language.code)"
        class="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors duration-200"
        :class="{
          'bg-blue-50 text-indigo-600': currentLanguage.code === language.code,
          'text-gray-700': currentLanguage.code !== language.code,
        }"
      >
        <div
          class="w-5 h-5 rounded-sm overflow-hidden flex items-center justify-center bg-gray-200"
        >
          <span class="text-xs font-semibold text-gray-700">
            {{ language.flag }}
          </span>
        </div>

        <span class="font-medium">{{ language.name }}</span>

        <svg
          v-if="currentLanguage.code === language.code"
          class="w-4 h-4 text-indigo-600 ml-auto"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <!-- Click-outside overlay -->
    <div
      v-if="showDropdown"
      @click="closeDropdown"
      class="fixed inset-0 z-40"
    ></div>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";

export default {
  name: "LanguageSelector",
  setup() {
    const { locale } = useI18n();
    return { locale };
  },
  data() {
    return {
      showDropdown: false,
      availableLanguages: [
        {
          code: "es",
          name: "Español",
          flag: "🇪🇸",
        },
        {
          code: "en",
          name: "English",
          flag: "🇺🇸",
        },
      ],
    };
  },
  computed: {
    /**
     * Returns the currently selected language object based on the active locale.
     */
    currentLanguage() {
      return (
        this.availableLanguages.find((lang) => lang.code === this.locale) ||
        this.availableLanguages[0]
      );
    },
  },
  computed: {
    currentLanguage() {
      return (
        this.availableLanguages.find((lang) => lang.code === this.locale) ||
        this.availableLanguages[0]
      );
    },
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    closeDropdown() {
      this.showDropdown = false;
    },

    /**
     * Changes the language by updating the route and i18n locale.
     * Also persists the selected language in localStorage.
     *
     * @param {string} languageCode - The new locale code (e.g., 'en', 'es').
     */
    changeLanguage(languageCode) {
      const currentPath = this.$route.path;
      const pathWithoutLocale = currentPath.replace(/^\/(en|es)/, "") || "/";

      const newPath = `/${languageCode}${pathWithoutLocale}`;

      this.$router.push(newPath);

      localStorage.setItem("userLanguage", languageCode);
      this.closeDropdown();
    },
  },
  watch: {
    /**
     * Watches changes in the route locale parameter and updates the i18n locale accordingly.
     */
    "$route.params.locale": {
      handler(newLocale) {
        if (newLocale && this.locale !== newLocale) {
          this.locale = newLocale;
        } else if (!newLocale && this.locale !== "en") {
          this.locale = "en";
        }
      },
      immediate: true,
    },
  },
  mounted() {
    const routeLocale = this.$route.params.locale;
    if (routeLocale) {
      this.locale = routeLocale;
    } else {
      this.locale = "en";
    }
  },
};
</script>

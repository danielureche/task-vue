<!--
  Login.vue

  Description:
  This component renders the login form for user authentication.
  It includes:
  - Logo and localized titles
  - Form fields for email and password with validation
  - Password visibility toggle
  - "Remember me" checkbox
  - Link to registration
  - Integrated loading spinner during login
  - Locale-aware navigation and translations

  Technologies:
  - Vue 3 (Composition API + `<script setup>`)
  - Vee-Validate with Zod schema for form validation
  - vue-i18n for localization
  - Vue Router for redirection
  - Custom toast plugin for feedback
  - AuthService for login API call

  Props: None

  Emits: None

  Usage:
  This component is used in public routes for user authentication.

  Notes:
  - Uses `locale` from vue-i18n to build localized register route
  - Uses `ref()` for reactivity (loading, password toggle)
  - All labels and messages are translated using the `t()` function

  Form validation schema:
  Defined externally in `@/validations/LoginSchema.js` using Zod,
  and passed to Vee-Validate via `toTypedSchema`.

-->

<template>
  <div class="min-h-screen bg-slate-800 flex items-center justify-center p-4">
    <div
      class="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-full max-w-md border border-slate-700/50"
    >
      <!-- Logo and title -->
      <div class="text-center mb-4">
        <div
          class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg"
        >
          <img src="/src/assets/logo.png" alt="" />
        </div>
        <h1 class="text-2xl font-bold text-white mb-2">
          {{ t("auth.login.title") }}
        </h1>
        <p class="text-slate-400 text-sm">{{ t("auth.login.subtitle") }}</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" novalidate class="space-y-6">
        <!-- Email Field -->
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-slate-300 mb-2"
          >
            {{ t("auth.login.form.email.label") }}
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            :class="{ 'border-red-500': emailError }"
            :placeholder="t('auth.login.form.email.placeholder')"
          />
          <p v-if="emailError" class="text-red-400 text-xs mt-1">
            {{ emailError }}
          </p>
        </div>

        <!-- Password Field -->
        <div>
          <label
            for="password"
            class="block text-sm font-medium text-slate-300 mb-2"
          >
            {{ t("auth.login.form.password.label") }}
          </label>
          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 pr-12"
              :class="{ 'border-red-500': passwordError }"
              :placeholder="t('auth.login.form.password.placeholder')"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            >
              <svg
                v-if="!showPassword"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <svg
                v-else
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                />
              </svg>
            </button>
          </div>
          <p v-if="passwordError" class="text-red-400 text-xs mt-1">
            {{ passwordError }}
          </p>
        </div>

        <!-- Remember and Forgot your password? -->
        <div class="flex items-center justify-between">
          <label class="flex items-center">
            <input
              v-model="remember"
              type="checkbox"
              class="w-4 h-4 text-indigo-600 bg-slate-700 border-slate-600 rounded focus:ring-indigo-500 focus:ring-2"
            />
            <span class="ml-2 text-sm text-slate-300">{{
              t("auth.login.form.remember_me")
            }}</span>
          </label>
          <a
            href="#"
            class="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            {{ t("auth.login.form.forgot_password") }}
          </a>
        </div>

        <!--Login Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
        >
          <svg
            v-if="isLoading"
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {{
            isLoading
              ? t("auth.login.form.button.logging_in")
              : t("auth.login.form.button.login")
          }}
        </button>

        <!-- Link to the registry -->
        <div class="text-center">
          <p class="text-slate-400 text-sm">
            {{ t("auth.login.form.no_account") }}
            <router-link
              :to="locale === 'en' ? '/register' : `/${locale}/register`"
              class="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              {{ t("auth.login.form.register_here") }}
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { loginSchema } from "@/validations/LoginSchema";
import { showSuccess, showError } from "@/plugins/toast";
import AuthService from "@/services/AuthService";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

const router = useRouter();
const isLoading = ref(false);
const showPassword = ref(false);

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(loginSchema(t)),
});

const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");
const { value: remember } = useField("remember");

const handleLogin = handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    await AuthService.login({
      email: values.email,
      password: values.password,
    });
    showSuccess(t("messages.success.login"));
    router.push("/");
  } catch (error) {
    showError(error.message || t("messages.errors.login"));
  } finally {
    isLoading.value = false;
  }
});
</script>

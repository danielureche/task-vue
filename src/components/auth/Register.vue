<!--
  Register.vue

  Description:
  This component renders the user registration form in a visually rich and responsive layout.
  It supports full localization and input validation, integrates with the authentication API,
  and provides immediate feedback on success or failure.

  Technologies Used:
  - Vue 3 with `<script setup>`
  - vue-i18n for localization
  - vee-validate and Zod for form validation
  - TailwindCSS for styling
  - Custom toast notifications
  - AuthService for registration API calls

  Features:
  - Fields: name, email, password, confirm password, accept terms
  - Live error messages via Vee-Validate + Zod
  - Password visibility toggle (both password and confirmation)
  - Localized text and placeholders
  - Disabled submit button with loading spinner on submission
  - Redirects to homepage upon successful registration
  - Link to login view, respecting current locale

  Form validation schema:
  The `registerSchema` imported from `@/validations/RegisterSchema` is localized using the `t()` function.
  Fields are bound to the schema using `useField()` from `vee-validate`.

  Props: None

  Emits: None

  Slots: None

  i18n Usage Example:
  t("auth.register.form.name.label")
  t("auth.register.form.button.create_account")

  Routing Behavior:
  - Redirects to `/` after successful registration
  - Uses `locale` from vue-i18n to build the login route path dynamically
-->

<template>
  <div class="min-h-screen bg-slate-800 flex items-center justify-center p-4">
    <div
      class="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-full max-w-md border border-slate-700/50"
    >
      <!-- Logo and subtitle -->
      <div class="text-center mb-8">
        <div
          class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
        >
          <img src="/src/assets/logo.png" alt="" />
        </div>
        <h1 class="text-2xl font-bold text-white mb-2">
          {{ t("auth.register.title") }}
        </h1>
        <p class="text-slate-400 text-sm">{{ t("auth.register.subtitle") }}</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleRegister" novalidate class="space-y-6">
        <!-- Name Field -->
        <div>
          <label
            for="name"
            class="block text-sm font-medium text-slate-300 mb-2"
          >
            {{ t("auth.register.form.name.label") }}
          </label>
          <input
            id="name"
            v-model="name"
            type="text"
            class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            :class="{ 'border-red-500': nameError }"
            :placeholder="t('auth.register.form.name.placeholder')"
          />
          <!-- Only show if there is an error -->
          <p v-if="nameError" class="text-red-400 text-xs mt-1">
            {{ nameError }}
          </p>
        </div>

        <!-- Campo Email -->
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-slate-300 mb-2"
          >
            {{ t("auth.register.form.email.label") }}
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            :class="{ 'border-red-500': emailError }"
            :placeholder="t('auth.register.form.name.placeholder')"
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
            {{ t("auth.register.form.password.label") }}
          </label>
          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pr-12"
              :class="{ 'border-red-500': passwordError }"
              :placeholder="t('auth.register.form.password.placeholder')"
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

        <!-- Confirm Password Field -->
        <div>
          <label
            for="confirmPassword"
            class="block text-sm font-medium text-slate-300 mb-2"
          >
            {{ t("auth.register.form.confirm_password.label") }}
          </label>
          <div class="relative">
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              class="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 pr-12"
              :class="{ 'border-red-500': confirmPasswordError }"
              :placeholder="
                t('auth.register.form.confirm_password.placeholder')
              "
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            >
              <svg
                v-if="!showConfirmPassword"
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
          <p v-if="confirmPasswordError" class="text-red-400 text-xs mt-1">
            {{ confirmPasswordError }}
          </p>
        </div>

        <!-- Terms and Conditions -->
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input
              id="terms"
              v-model="acceptTerms"
              type="checkbox"
              class="w-4 h-4 text-indigo-600 bg-slate-700 border-slate-600 rounded focus:ring-indigo-500 focus:ring-2"
            />
          </div>
          <div class="ml-3 text-sm">
            <label for="terms" class="text-slate-300">
              {{ t("auth.register.form.terms.accept") }}
              <a
                href="#"
                class="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {{ t("auth.register.form.terms.terms_and_conditions") }}</a
              >
              {{ t("auth.register.form.terms.and_the") }}
              <a
                href="#"
                class="text-indigo-400 hover:text-indigo-300 transition-colors"
                >{{ t("auth.register.form.terms.privacy_policy") }}</a
              >
            </label>
            <p v-if="acceptTermsError" class="text-red-400 text-xs mt-1">
              {{ acceptTermsError }}
            </p>
          </div>
        </div>

        <!-- Registration button -->
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
              ? t("auth.register.form.button.creating_account")
              : t("auth.register.form.button.create_account")
          }}
        </button>

        <!-- Link to login -->
        <div class="text-center">
          <p class="text-slate-400 text-sm">
            {{ t("auth.register.form.already_have_account") }}
            <router-link
              :to="`/${locale}/login`"
              class="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              {{ t("auth.register.form.login_here") }}
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
import { registerSchema } from "@/validations/RegisterSchema";
import { showSuccess, showError } from "@/plugins/toast";
import AuthService from "@/services/AuthService";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

const router = useRouter();
const isLoading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(registerSchema(t)),
});

const { value: name, errorMessage: nameError } = useField("name");
const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");
const { value: confirmPassword, errorMessage: confirmPasswordError } =
  useField("confirmPassword");
const { value: acceptTerms, errorMessage: acceptTermsError } =
  useField("acceptTerms");

const handleRegister = handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    await AuthService.register({
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirmation: values.confirmPassword,
    });
    showSuccess(t("messages.success.create_account"));
    router.push("/");
  } catch (error) {
    showError(error.message || t("messages.errors.create_account"));
  } finally {
    isLoading.value = false;
  }
});
</script>

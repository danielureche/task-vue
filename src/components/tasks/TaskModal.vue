<!--
  TaskModal.vue

  Description:
  A modal component used for both adding and editing a task. It utilizes the VeeValidate + Zod schema
  for form validation and integrates with vue-i18n for full i18n text support. The component includes
  fields for task title, description, and status, and conditionally displays form validation errors.

  Features:
  - Modal overlay UI for better focus
  - Reactive form using VeeValidate with Zod
  - Field-level validation with error display
  - Support for editing or creating a task (dynamic based on `props.task`)
  - Emits events for closing the modal, adding a new task, or updating an existing task
  - Accessible controls and form structure
  - Fully translatable with vue-i18n

  Props:
  - task (Object|null): The task to edit. If null, a new task is being created.

  Emits:
  - close: Emitted when the user closes the modal (via cancel or X).
  - add-task (task): Emitted when the user submits the form to create a new task.
  - update-task (task): Emitted when editing an existing task and the user submits changes.

  Usage:
  <TaskModal
    :task="selectedTask"
    @close="handleClose"
    @add-task="createTask"
    @update-task="updateTask"
  />

-->

<template>
  <div
    class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
  >
    <div
      class="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-md"
    >
      <!-- Modal Header -->
      <div class="p-6 border-b border-slate-700">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-white">
            {{
              isEditing ? t("task_modal.title.edit") : t("task_modal.title.add")
            }}
          </h3>
          <button
            @click="$emit('close')"
            class="text-slate-400 hover:text-white transition-colors"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Modal Form -->
      <form @submit.prevent="handleSubmit" novalidate class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">
            {{ t("task_modal.form.title.label") }}
          </label>
          <input
            v-model="title"
            type="text"
            class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            :class="{ 'border-red-500': titleError }"
            :placeholder="t('task_modal.form.title.placeholder')"
          />
          <p v-if="titleError" class="text-red-400 text-xs mt-1">
            {{ titleError }}
          </p>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">
            {{ t("task_modal.form.description.label") }}
          </label>
          <input
            v-model="description"
            type="text"
            class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            :class="{ 'border-red-500': descriptionError }"
            :placeholder="t('task_modal.form.description.placeholder')"
          />
          <p v-if="descriptionError" class="text-red-400 text-xs mt-1">
            {{ descriptionError }}
          </p>
        </div>

        <!-- Status -->
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">
            {{ t("task_modal.form.status.label") }}
          </label>
          <div class="relative">
            <select
              v-model="status"
              class="appearance-none w-full pr-10 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              :class="{ 'border-red-500': statusError }"
            >
              <option value="pending">
                {{ t("task_modal.form.status.options.pending") }}
              </option>
              <option value="in_progress">
                {{ t("task_modal.form.status.options.in_progress") }}
              </option>
              <option value="completed">
                {{ t("task_modal.form.status.options.completed") }}
              </option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-3 flex items-center"
            >
              <svg
                class="w-5 h-5 text-slate-300"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          <p v-if="statusError" class="text-red-400 text-xs mt-1">
            {{ statusError }}
          </p>
        </div>

        <!-- Buttons -->
        <div class="flex space-x-3 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
          >
            {{ t("task_modal.form.buttons.cancel") }}
          </button>
          <button
            type="submit"
            class="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {{
              isEditing
                ? t("task_modal.form.buttons.update")
                : t("task_modal.form.buttons.create")
            }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { taskSchema } from "@/validations/TaskSchema";
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  task: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close", "add-task", "update-task"]);

const isEditing = computed(() => props.task !== null);

// Form setup
const {
  handleSubmit: submitForm,
  resetForm,
  setFieldValue,
} = useForm({
  validationSchema: toTypedSchema(taskSchema(t)),
  initialValues: {
    title: "",
    description: "",
    status: "pending",
  },
});

// Fields and errors
const { value: title, errorMessage: titleError } = useField("title");
const { value: description, errorMessage: descriptionError } =
  useField("description");
const { value: status, errorMessage: statusError } = useField("status");

// Watch task prop to prefill form for editing

watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      setFieldValue("title", newTask.title);
      setFieldValue("description", newTask.description || "");
      setFieldValue("status", newTask.status);
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

// Handle form submission
const handleSubmit = submitForm((values) => {
  if (isEditing.value) {
    emit("update-task", {
      ...props.task,
      ...values,
    });
  } else {
    emit("add-task", { ...values });
  }
  resetForm();
});
</script>

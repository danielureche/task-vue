<!--
  TaskSection.vue

  Description:
  A section component that displays a list of tasks along with an "Add Task" button.
  It supports task management interactions such as toggling completion status, editing, and deleting tasks.
  The component also shows a loading spinner while data is being fetched and integrates i18n text support.

  Features:
  - Displays task list using the TaskItem component
  - Shows a loading spinner when tasks are being loaded
  - Button to trigger task creation
  - Emits events to parent for all task-related actions (add, toggle, edit, delete)
  - Fully translatable using vue-i18n
  - Clean and responsive UI styled with TailwindCSS

  Props:
  - tasks (Array): List of task objects to display. Each task must contain at least `id` and `title`.
  - isLoading (Boolean): Whether the task list is currently loading (used to show spinner).

  Emits:
  - add-task: Triggered when the "Add Task" button is clicked.
  - toggle-task (taskId): Triggered when a task is toggled (complete/incomplete).
  - edit-task (task): Triggered when a task is selected for editing.
  - delete-task (task): Triggered when a task is deleted.

  Dependencies:
  - TaskItem (child component used to render each task)

  Usage:
  <TaskSection
    :tasks="taskList"
    :isLoading="loading"
    @add-task="showAddTaskModal"
    @toggle-task="toggleTaskStatus"
    @edit-task="openEditModal"
    @delete-task="removeTask"
  />
-->

<template>
  <div class="bg-slate-800 rounded-xl border border-slate-700">
    <!-- Header -->
    <div class="p-6 border-b border-slate-700">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-white">
          {{ $t("task_section.title") }}
        </h2>
        <button
          @click="$emit('add-task')"
          class="bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>{{ $t("task_section.create_task") }}</span>
        </button>
      </div>
    </div>

    <!-- Body -->
    <div class="p-6">
      <!-- Loading spinner -->
      <div v-if="isLoading" class="flex justify-center py-8">
        <svg
          class="animate-spin h-8 w-8 text-indigo-500"
          xmlns="http://www.w3.org/2000/svg"
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
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      </div>

      <!-- Task list -->
      <div v-else class="space-y-4">
        <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @toggle="handleToggle"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TaskItem from "./TaskItem.vue";

export default {
  name: "TaskSection",
  components: {
    TaskItem,
  },
  props: {
    /**
     * Array of task objects to display.
     */
    tasks: {
      type: Array,
      required: true,
    },
    /**
     * Whether the task list is in a loading state.
     */
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["toggle-task", "add-task", "edit-task", "delete-task"],
  methods: {
    /**
     * Emit toggle-task with taskId.
     */
    handleToggle(taskId) {
      this.$emit("toggle-task", taskId);
    },

    /**
     * Emit edit-task with task object.
     */
    handleEdit(task) {
      this.$emit("edit-task", task);
    },

    /**
     * Emit delete-task with task object.
     */
    handleDelete(task) {
      this.$emit("delete-task", task);
    },
  },
};
</script>

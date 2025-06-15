vue Copiar código
<!--
  TaskItem.vue

  Description:
  A presentational component that renders a single task item with interactive controls
  to toggle completion status, edit the task, or delete it. It also displays the task's
  title, description, and current status using a priority badge.

  Features:
  - Visual toggle for marking a task as completed.
  - Shows task title and description with dynamic styling.
  - Editable and deletable via action buttons.
  - Integrates with the `PriorityBadge` component (imported as `StatusBadge.vue`).
  - Emits relevant events to be handled by the parent component.

  Props:
  - task (Object, required): Task object containing at least `id`, `title`, `description`, and `status`.

  Emits:
  - toggle (taskId): Emitted when the task is toggled (completed/incomplete).
  - edit (task): Emitted when the task edit button is clicked.
  - delete (task): Emitted when the task delete button is clicked.

  Usage:
  <TaskItem
    :task="task"
    @toggle="toggleTaskStatus"
    @edit="editTask"
    @delete="deleteTask"
  />

  Accessibility:
  - Button elements are accessible and have appropriate hover and focus states.
-->

<template>
  <div
    class="flex items-center space-x-4 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
  >
    <!-- Toggle completion checkbox -->
    <button
      @click="handleToggle"
      :class="[
        'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
        task.status === 'completed'
          ? 'bg-indigo-600 border-indigo-600'
          : 'border-slate-500 hover:border-indigo-500',
      ]"
    >
      <svg
        v-if="task.status === 'completed'"
        class="w-3 h-3 text-white"
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

    <!-- Task title and description -->
    <div class="flex-1">
      <h3
        :class="[
          'font-medium',
          task.status === 'completed'
            ? 'text-slate-400 line-through'
            : 'text-white',
        ]"
      >
        {{ task.title }}
      </h3>
      <p class="text-sm text-slate-400 mt-1">{{ task.description }}</p>
    </div>

    <!-- Actions: status badge, edit, delete -->
    <div class="flex items-center space-x-3">
      <PriorityBadge :status="task.status" />

      <!-- Edit button -->
      <button
        @click="handleEdit"
        class="p-1 text-slate-400 hover:text-indigo-500 transition-colors"
        title="Editar tarea"
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
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </button>

      <!-- Delete button -->
      <button
        @click="handleDelete"
        class="p-1 text-slate-400 hover:text-red-400 transition-colors"
        title="Eliminar tarea"
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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import PriorityBadge from "../ui/StatusBadge.vue";

export default {
  name: "TaskItem",
  components: {
    PriorityBadge,
  },
  props: {
    /**
     * Task object containing:
     * - id: String or Number (required)
     * - title: String
     * - description: String
     * - status: String ('completed' or 'pending')
     */
    task: {
      type: Object,
      required: true,
    },
  },
  emits: [
    /**
     * Emitted when the task completion is toggled.
     * Payload: task.id
     */
    "toggle",

    /**
     * Emitted when the edit button is clicked.
     * Payload: task object
     */
    "edit",

    /**
     * Emitted when the delete button is clicked.
     * Payload: task object
     */
    "delete",
  ],
  methods: {
    handleToggle() {
      this.$emit("toggle", this.task.id);
    },
    handleEdit() {
      this.$emit("edit", this.task);
    },
    handleDelete() {
      this.$emit("delete", this.task);
    },
  },
};
</script>

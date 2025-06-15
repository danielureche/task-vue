<!--
  DeleteConfirmationModal.vue

  Description:
  A modal dialog component used to confirm the deletion of a specific task. 
  It displays the task's title and provides "Cancel" and "Delete" actions.

  Features:
  - Dark semi-transparent background overlay.
  - Accessible confirmation UI with icon and message.
  - Emits `cancel` and `confirm` events to handle user actions.
  - Fully translatable using vue-i18n.

  Props:
  - task (Object, required): The task object being considered for deletion. 
    The task title is shown in the confirmation message.

  Emits:
  - cancel: Emitted when the user clicks the "Cancel" button.
  - confirm: Emitted when the user confirms deletion.

  Usage:
  <DeleteConfirmationModal
    :task="selectedTask"
    @cancel="handleCancel"
    @confirm="handleDelete"
/>

  Accessibility:
  - Keyboard trapping and ARIA roles are recommended if using outside modal libraries.
-->

<template>
  <div
    class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
  >
    <div
      class="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-md"
    >
      <div class="p-6">
        <!-- Icon -->
        <div class="flex justify-center space-x-4 mb-4">
          <div class="">
            <div
              class="w-10 h-10 bg-red-100 rounded-md flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-red-600"
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
            </div>
          </div>
        </div>

        <!-- Message -->
        <div class="mb-6">
          <p class="text-slate-300">
            {{ $t("delete_confirmation_modal.message") }}
            <span class="font-semibold text-white">"{{ task.title }}"</span>?
          </p>
        </div>

        <!-- Action buttons -->
        <div class="flex space-x-3">
          <button
            type="button"
            @click="$emit('cancel')"
            class="flex-1 px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
          >
            {{ $t("delete_confirmation_modal.buttons.cancel") }}
          </button>
          <button
            type="button"
            @click="$emit('confirm')"
            class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            {{ $t("delete_confirmation_modal.buttons.delete") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeleteConfirmationModal",
  props: {
    /**
     * The task object for which deletion is being confirmed.
     * Must contain at least a `title` property.
     */
    task: {
      type: Object,
      required: true,
    },
  },
  emits: [
    /**
     * Emitted when the user cancels the deletion.
     */
    "cancel",

    /**
     * Emitted when the user confirms the deletion.
     */
    "confirm",
  ],
};
</script>

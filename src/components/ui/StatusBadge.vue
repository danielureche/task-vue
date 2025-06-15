<!--
  PriorityBadge.vue

  Description:
  A small badge component that visually indicates the status of a task using a colored label and dot.
  It supports three predefined statuses: "pending", "in_progress", and "completed".

  Features:
  - Colored background and border based on status.
  - Colored dot preceding the label for quick visual reference.
  - Text labels for each status.
  - Easily embeddable inside tables, lists, or cards.
  
  Props:
  - status (String, required): The current status of the item. 
    Must be one of: "pending", "in_progress", "completed".

  Usage:
  <PriorityBadge status="in_progress" />

  Accessibility:
  - Uses visually distinct colors and text labels for clarity.
  - Can be extended to support localization via computed properties or i18n.

-->

<template>
  <span
    :class="[
      'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
      statusClasses[status],
    ]"
  >
    <span
      :class="['w-2 h-2 rounded-full mr-1', statusDotClasses[status]]"
    ></span>
    {{ statusLabel }}
  </span>
</template>

<script>
export default {
  name: "PriorityBadge",
  props: {
    /**
     * Status value of the badge.
     * Accepted values: 'pending', 'in_progress', 'completed'
     */
    status: {
      type: String,
      required: true,
      validator: (value) =>
        ["pending", "in_progress", "completed"].includes(value),
    },
  },
  data() {
    return {
      /** Background and text classes for each status */
      statusClasses: {
        pending: "bg-red-900/50 text-red-300 border border-red-800",
        in_progress:
          "bg-orange-900/50 text-orange-300 border border-orange-800",
        completed: "bg-green-900/50 text-green-300 border border-green-800",
      },
      /** Dot color classes for each status */
      statusDotClasses: {
        pending: "bg-red-500",
        in_progress: "bg-orange-500",
        completed: "bg-green-500",
      },
    };
  },
  computed: {
    statusLabel() {
      return this.$t(`status_badge.${this.status}`);
    },
  },
};
</script>

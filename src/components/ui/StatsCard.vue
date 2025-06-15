<!--
  StatsCard.vue

  Description:
  A reusable and responsive card component that displays a statistical value with a label and an optional icon.
  Designed to provide a quick summary of key performance indicators (KPIs) or metrics in a dashboard layout.

  Features:
  - Dynamic icon selection based on provided string.
  - Styled using Flowbite-Vue's <fwb-card> for consistent design.
  - Custom color themes for different types of metrics.
  - Icon displayed in a rounded colored background for visual emphasis.

  Props:
  - title (String, required): The label or descriptor of the metric.
  - value (String | Number, required): The numeric or textual value to display.
  - color (String, optional): The theme color for the icon container (default: "blue").
  - icon (String, required): Identifier for the icon to use. Supported: "clipboard-document-list", "check-icon", "clock-icon", "chart-pie".

  Usage:
  <StatsCard 
    title="Total Tasks"
    :value="42"
    icon="clipboard-document-list"
    color="indigo"
  />

  Accessibility:
  - Icons are visually distinct with appropriate contrast.
  - Text content is readable with accessible font sizing and color contrast.
-->

<template>
  <fwb-card class="!bg-gray-800 p-4 border-0 rounded">
    <div class="flex justify-between items-center">
      <div>
        <p class="text-gray-400 text-sm">{{ title }}</p>
        <p class="text-2xl font-bold text-white">{{ value }}</p>
      </div>
      <div :class="iconWrapperClass">
        <component :is="iconComponent" class="w-6 h-6" v-if="iconComponent" />
      </div>
    </div>
  </fwb-card>
</template>

<script>
import { FwbCard } from "flowbite-vue";
import {
  ClipboardDocumentListIcon,
  CheckIcon,
  ClockIcon,
  ChartPieIcon,
} from "@heroicons/vue/24/solid";

export default {
  name: "StatsCard",
  components: {
    FwbCard,
    ClipboardDocumentListIcon,
    CheckIcon,
    ClockIcon,
    ChartPieIcon,
  },
  props: {
    /**
     * Label displayed above the metric value.
     */
    title: {
      type: String,
      required: true,
    },

    /**
     * Numeric or string value displayed in the card.
     */
    value: {
      type: [String, Number],
      required: true,
    },

    /**
     * Color theme used for the icon background.
     */
    color: {
      type: String,
      default: "blue",
    },

    /**
     * Icon identifier string. Must match one of the predefined icon keys.
     */
    icon: {
      type: String,
      required: true,
    },
  },
  computed: {
    /**
     * Maps icon prop to corresponding Heroicon component.
     */
    iconComponent() {
      const icons = {
        "clipboard-document-list": ClipboardDocumentListIcon,
        "check-icon": CheckIcon,
        "clock-icon": ClockIcon,
        "chart-pie": ChartPieIcon,
      };
      return icons[this.icon] || null;
    },

    /**
     * Determines the background and text color of the icon wrapper based on the icon type.
     */
    iconWrapperClass() {
      const classes = {
        "clipboard-document-list":
          "bg-indigo-900/50 text-indigo-300 p-1 rounded",
        "check-icon": "bg-green-900/50 text-green-300 p-1 rounded",
        "clock-icon": "bg-red-900/50 text-red-300 p-1 rounded",
        "chart-pie": "bg-orange-900/50 text-orange-300 p-1 rounded",
      };
      return classes[this.icon] || "bg-gray-700 text-white p-2 rounded-full";
    },
  },
};
</script>

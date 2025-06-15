<!--
  Avatar.vue

  Description:
  A simple circular avatar component that displays the user's initials based on the `name` prop.
  Typically used when there is no profile picture available.

  Features:
  - Displays the first two initials of the user's full name.
  - Styled with a circular background, centered text, and a white ring border.
  - Fully customizable through slot or CSS overrides if needed.

  Props:
  - name (String, required): The full name used to generate the initials.

  Usage:
  <Avatar name="John Doe" />

  Accessibility:
  - Includes semantic text representation.
  - Consider adding `aria-label` if used independently for accessibility.
-->
<template>
  <div
    class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-medium ring-2 ring-white"
  >
    {{ initials }}
  </div>
</template>

<script>
export default {
  name: "Avatar",
  props: {
    /**
     * The full name of the user.
     * Used to generate initials displayed in the avatar.
     */
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    /**
     * Computes the initials from the given name.
     * Extracts the first letter of each word, converts to uppercase,
     * and returns up to two characters.
     *
     * Example:
     * "John Doe" => "JD"
     */
    initials() {
      return this.name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase())
        .join("")
        .substring(0, 2);
    },
  },
};
</script>

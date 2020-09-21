<template>
  <v-btn
    :dark="dark"
    :style="cssStyle"
    :color="color"
    :href="href"
    :target="target"
    :disabled="disabled"
    :icon="icon"
    :class="cssClass"
    :fab="fab"
    :small="small"
    @click="onClick"
  >
    <slot />
  </v-btn>
</template>

<script>
export default {
  name: 'AppButtonNav',
  props: {
    dark: {
      type: Boolean,
      required: false,
      default: true,
    },
    color: {
      type: String,
      required: false,
      default: 'primary',
    },
    href: {
      type: String,
      required: false,
      default: '',
    },
    target: {
      type: String,
      required: false,
      default: '',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    icon: {
      type: Boolean,
      required: false,
      default: false,
    },
    fab: {
      type: Boolean,
      required: false,
      default: false,
    },
    small: {
      type: Boolean,
      required: false,
      default: true,
    },
    cssStyle: {
      type: String,
      required: false,
      default: 'opacity: 0.85;',
    },
    cssClass: {
      type: [Array, String],
      required: false,
      default() {
        return [{ 'mr-1': true }]
      },
    },
  },
  methods: {
    onClick(event) {
      this.$emit('click', event)
    },
  },
}
</script>

<style></style>

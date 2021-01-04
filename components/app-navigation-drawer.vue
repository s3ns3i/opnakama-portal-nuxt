<template>
  <v-navigation-drawer :value="value" absolute temporary @input="onInput">
    <v-list>
      <v-list-item link nuxt to="/">Aktualności</v-list-item>
      <v-list-item href="https://forum.onepiecenakama.pl/" link target="_blank"
        >Forum</v-list-item
      >
      <v-list-item
        link
        href="https://discord.com/channels/152793335852040192/152793335852040192"
        target="_blank"
      >
        <v-list-item-title>Discord</v-list-item-title>
        <v-list-item-icon>
          <v-icon>mdi-discord</v-icon>
        </v-list-item-icon>
      </v-list-item>
      <v-list-item @click="onThemeChange">
        <v-list-item-title>
          Zmień motyw
        </v-list-item-title>
        <v-list-item-icon>
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'AppNavigationDrawer',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    onInput(value) {
      this.$emit('input', value)
    },
    onThemeChange() {
      this.$emit('themeChange')
    },
  },
}
</script>

<style></style>

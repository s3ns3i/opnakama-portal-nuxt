<template>
  <v-text-field
    v-model="messageContent"
    solo
    outlined
    hide-details
    color="accent"
    placeholder="Napisz wiadomość"
    style="border-radius: 0;"
    @keyup.enter="onSend"
  ></v-text-field>
</template>

<script>
export default {
  name: 'AppChatSendBox',
  data() {
    return {
      messageContent: '',
    }
  },
  methods: {
    onChatClose() {
      this.$emit('close')
    },
    onSend() {
      this.$emit('message', this.messageContent)
    },
    clearContent() {
      this.messageContent = ''
    },
  },
}
</script>

<style lang="scss">
.app-chat {
  .theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
    > .v-input__control
    > .v-input__slot
    fieldset {
    // border: none;
  }
}
</style>

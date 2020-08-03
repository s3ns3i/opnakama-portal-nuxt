<template>
  <v-card class="app-chat">
    <v-app-bar color="secondary" dense dark>
      ShoutBox
      <v-spacer></v-spacer>
      <v-btn icon @click="onChatClose"><v-icon>mdi-close</v-icon></v-btn>
    </v-app-bar>
    <div
      v-chat-scroll="{ always: false, smooth: true }"
      class="app-chat__messages"
    >
      <app-chat-message
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
      <!-- <li v-for="message in messages" :key="message.id" class="message"> -->
      <!-- {{ message.content }} -->
      <!-- </li> -->
    </div>
    <div class="app-chat__send-box">
      <v-text-field
        v-model="messageContent"
        solo
        hide-details
        placeholder="Napisz wiadomość"
        background-color="accent"
        style="border-radius: 0;"
        @keyup.enter="onSend"
      ></v-text-field>
    </div>
  </v-card>
</template>

<script>
import AppChatMessage from '@/components/app-chat/app-chat-message.vue'

export default {
  name: 'AppChat',
  components: [AppChatMessage],
  props: {
    isChat: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      messageContent: '',
      messages: [],
      unread: 0,
    }
  },
  watch: {
    isChat(value) {
      if (value) {
        this.unread = 0
        this.$emit('clearUnread')
      }
    },
  },
  mounted() {
    this.$socket.on('message_confirm', ({ sender, content, date }) => {
      this.messages.push({
        id: this.messages.length + 1,
        sender,
        content,
        date: new Date(date),
      })
      this.messageContent = ''
      if (!this.isChat) {
        this.unread += 1
        this.$emit('unread', this.unread)
      }
    })
  },
  methods: {
    onChatClose() {
      this.$emit('close')
    },
    onSend() {
      this.$socket.emit('message', {
        sender: 'anon',
        content: this.messageContent,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.app-chat {
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: 400px;
  height: 600px;
  z-index: 999;
  overflow: hidden;
  &__messages {
    height: 505px;
    overflow-y: auto;
  }
}
</style>
<style lang="scss">
.app-chat {
  .theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
    > .v-input__control
    > .v-input__slot
    fieldset {
    border: none;
  }
}
</style>

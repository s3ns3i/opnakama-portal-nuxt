<template>
  <v-card class="app-chat">
    <v-app-bar class="shrink" color="secondary" dense dark>
      ShoutBox
      <v-spacer></v-spacer>
      <v-btn icon @click="onChatClose"><v-icon>mdi-close</v-icon></v-btn>
    </v-app-bar>
    <app-chat-form v-if="!username" class="grow" @submit="onSubmit" />
    <app-chat-content v-if="username" :messages="messages" />
    <app-chat-send-box v-if="username" ref="sendBox" @message="onSend" />
  </v-card>
</template>

<script>
import AppChatContent from '@/components/app-chat/app-chat-content.vue'

export default {
  name: 'AppChat',
  components: [AppChatContent],
  props: {
    isChat: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      unread: 0,
      messages: [],
      username: '',
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
  beforeMount() {
    this.initChat()
  },
  mounted() {
    this.$socket.on('message_confirm', ({ id, sender, content, createdAt }) => {
      this.messages.push({
        id,
        sender,
        content,
        createdAt: new Date(createdAt),
      })
      this.$refs.sendBox.clearContent()
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
    onSend(content) {
      this.$socket.emit('message', {
        sender: this.username,
        content,
      })
    },
    initChat() {
      const username = localStorage.getItem('opnakama_shoutbox_username')
      if (username) {
        this.username = username
        this.fetchMessages()
      }
    },
    onSubmit(username) {
      localStorage.setItem('opnakama_shoutbox_username', username)
      this.username = username
      this.fetchMessages()
    },
    fetchMessages() {
      this.$axios.get('http://localhost:3001/messages').then(
        ({ data }) =>
          (this.messages = data.map((message) => ({
            ...message,
            createdAt: new Date(message.createdAt),
          })))
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.app-chat {
  position: fixed;
  display: flex;
  flex-direction: column;
  bottom: 16px;
  right: 16px;
  width: 400px;
  height: 600px;
  z-index: 999;
  overflow: hidden;
  &__messages {
    height: 505px;
    width: 400px;
    max-width: 400px;
    padding: 0 16px;
    overflow-y: auto;
    &__message-last {
      margin-bottom: 20px;
    }
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

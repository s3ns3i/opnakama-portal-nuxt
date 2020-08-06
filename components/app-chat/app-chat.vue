<template>
  <v-card class="app-chat">
    <v-app-bar class="shrink" color="secondary" dense dark>
      ShoutBox
      <v-spacer></v-spacer>
      <v-btn icon @click="onToggleSound">
        <v-icon>{{ sound ? 'mdi-volume-high' : 'mdi-volume-off' }}</v-icon>
      </v-btn>
      <v-btn icon @click="onChatClose"><v-icon>mdi-close</v-icon></v-btn>
    </v-app-bar>
    <app-chat-form v-if="!username" class="grow" @submit="onSubmit" />
    <app-chat-content v-if="username" :messages="messages" />
    <app-chat-send-box v-if="username" ref="sendBox" @message="onSend" />
    <audio ref="audio">
      <source src="@/static/notification.mp3" type="audio/mpeg" />
    </audio>
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
      messagesLimit: 200,
      sound: false,
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
      if (this.sound) {
        this.$refs.audio.play()
        this.$refs.audio.addEventListener('canplaythrough', () => {
          this.$refs.audio.play()
        })
      }
      this.$refs.sendBox.clearContent()
      this.messages.push({
        id,
        sender,
        content,
        createdAt: new Date(createdAt),
      })
      if (this.messages.length > this.messagesLimit) {
        this.messages.shift()
      }
      if (!this.isChat) {
        this.unread += 1
        this.$emit('unread', this.unread)
      }
    })
  },
  methods: {
    onToggleSound() {
      this.sound = !this.sound
      localStorage.setItem('opnakama_shoutbox_sound', this.sound)
    },
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
      const sound = localStorage.getItem('opnakama_shoutbox_sound')
      if (sound !== null) {
        this.sound = sound === 'true'
      } else {
        localStorage.setItem('opnakama_shoutbox_sound', this.sound)
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
}
@media only screen and (max-width: 600px) {
  .app-chat {
    height: 100vh;
    width: 100vw;
    bottom: 0;
    right: 0;
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

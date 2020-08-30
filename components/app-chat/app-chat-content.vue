<template>
  <div v-chat-scroll="{ always: false, smooth: true }" class="messages">
    <app-chat-message
      v-for="(message, index) in messages"
      :key="message.id"
      :class="{
        'messages__message-last': index + 1 === messages.length,
      }"
      :message="message"
    />
  </div>
</template>

<script>
import AppChatMessage from '@/components/app-chat/app-chat-message.vue'

export default {
  name: 'AppChat',
  components: { AppChatMessage },
  props: {
    messages: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.messages {
  height: 505px;
  width: 400px;
  max-width: 400px;
  padding: 0 16px;
  overflow-y: auto;
  &__message-last {
    margin-bottom: 20px;
  }
}
@media only screen and (max-width: 600px) {
  .messages {
    height: auto;
  }
}
</style>

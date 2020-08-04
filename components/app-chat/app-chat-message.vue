<template>
  <div class="message">
    <div class="message__header text-subtitle-2">
      <div class="message__header__sender">{{ message.sender }}</div>
      <div>{{ getTimestamp(message.createdAt) }}</div>
    </div>
    <div class="message__content primary">{{ message.content }}</div>
  </div>
</template>

<script>
export default {
  name: 'AppChatMessage',
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getTimestamp(date) {
      return `${this.getHours(date)}:${this.getMinutes(date)}
       ${this.getDate(date)}.${this.getMonth(date)}.${date.getFullYear()}`
    },
    getHours(date) {
      const hours = date.getHours()
      return hours < 10 ? `0${hours}` : hours
    },
    getMinutes(date) {
      const minutes = date.getMinutes()
      return minutes < 10 ? `0${minutes}` : minutes
    },
    getDate(date) {
      const day = date.getDate()
      return day < 10 ? `0${day}` : day
    },
    getMonth(date) {
      const month = date.getMonth() + 1
      return month < 10 ? `0${month}` : month
    },
  },
}
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  flex-direction: column;
  &__header {
    margin-top: 8px;
    display: flex;
    &__sender {
      margin-right: 8px;
    }
  }
  &__content {
    width: max-content;
    max-width: 100%;
    padding: 10px;
    border-radius: 4px;
  }
}
</style>

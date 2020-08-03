<template>
  <v-card class="post">
    <v-card-title class="post__title">{{
      post.created_time | date
    }}</v-card-title>
    <v-card-text>
      <div
        v-for="(paragraph, index) in post.message"
        :key="index"
        class="post__paragraph"
      >
        <span>{{ paragraph.line }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.post {
  margin-bottom: 10px;
  &__title {
    font-size: 16px;
  }
  &__paragraph {
    color: black;
    white-space: initial;
  }
}
</style>

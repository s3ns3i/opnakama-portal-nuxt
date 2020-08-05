<template>
  <v-card>
    <v-card-title>Rozdziały One Piece</v-card-title>
    <v-card-text>
      <div class="info__container">
        <div
          v-for="chapter in chapters"
          :key="chapter.id"
          class="info__container__btn"
          block
          text
        >
          <v-row>
            <v-col cols="3">{{ chapter.chapter }}</v-col>
            <v-col class="chapter-name" cols="9">{{ chapter.name }}</v-col>
          </v-row>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AppInfo',
  data() {
    return {
      chapters: [],
    }
  },
  beforeMount() {
    this.fetchChapters()
  },
  methods: {
    fetchChapters() {
      this.$axios
        .get('http://localhost:3002/chapters?stub=piraciop')
        .then(({ data }) => {
          this.chapters = data
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.info {
  &__container {
    display: flex;
    flex-direction: column;
    &__btn {
      font-size: 1rem;
    }
  }
}
.chapter-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

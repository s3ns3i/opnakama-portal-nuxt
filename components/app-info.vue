<template>
  <v-card class="app-info">
    <v-card-title class="primary">{{ title }}</v-card-title>
    <v-list>
      <v-list-item
        v-for="chapter in chapters"
        :key="chapter.id"
        :href="chapter.link"
        target="_blank"
        dense
        @click="onChapter"
      >
        <v-list-item-content>
          <v-row>
            <v-col cols="3">{{ `#${chapter.chapter}` }}</v-col>
            <v-divider vertical></v-divider>
            <v-col class="chapter-name" cols="8">
              {{ chapter.name }}
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-btn color="accent" href="" target="_blank" tile>
            Przejdź do readera →
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-text v-if="!chapters.length">
      Nie ma jeszcze żadnych rozdziałów :(
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AppInfo',
  props: {
    title: {
      type: String,
      required: true,
    },
    stub: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      chapters: [],
    }
  },
  beforeMount() {
    this.fetchChapters()
    setInterval(this.fetchChapters, 600000)
  },
  methods: {
    fetchChapters() {
      const stubQuery = this.stub ? `?stub=${this.stub}` : ''
      this.$axios
        .get(`http://localhost:3002/chapters${stubQuery}`)
        .then(({ data }) => {
          this.chapters = data
        })
    },
    onChapter() {
      // provide a link to the reader
    },
    onReader() {},
  },
}
</script>
<style lang="scss" scoped>
.app-info {
  width: 100%;
}
.chapter-name {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

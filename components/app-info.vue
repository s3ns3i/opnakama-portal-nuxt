<template>
  <v-card class="app-info">
    <v-skeleton-loader
      :loading="loading"
      transition="fade-transition"
      type="card-heading"
    >
      <v-card-title class="primary white--text">
        <span class="mb-2">
          Wanted Team
          <v-btn
            dark
            icon
            href="https://discord.com/channels/545278821897863188/548629653158625292"
            target="_blank"
            style="margin-right: 20px;"
          >
            <v-icon>mdi-discord</v-icon>
          </v-btn>
        </span>
        <v-autocomplete
          v-model="stub"
          :items="comics"
          color="white"
          class="mt-0 pt-0"
          prepend-icon="mdi-magnify"
          dark
          hide-selected
          hide-details
          @change="onComicsChange"
        />
      </v-card-title>
    </v-skeleton-loader>
    <v-list>
      <v-list-item
        v-for="chapter in chapters"
        :key="chapter.id"
        :href="getChapterLink(chapter)"
        target="_blank"
        dense
        link
      >
        <v-list-item-content>
          <v-row>
            <v-col cols="3">{{ `#${chapter.chapter}` }}</v-col>
            <v-divider vertical></v-divider>
            <v-col class="chapter-name" cols="8">
              {{ chapter.name ? chapter.name : 'Brak tytułu' }}
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-btn
            color="accent"
            href="https://reader.onepiecenakama.pl"
            target="_blank"
            class="mt-3"
            tile
          >
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
  data() {
    return {
      stub: 'piraciop',
      comics: [],
      chapters: [],
      loading: true,
    }
  },
  beforeMount() {
    this.fetchComics()
    this.fetchChapters(this.stub)
    setInterval(this.fetchChapters, 600000)
  },
  methods: {
    fetchComics() {
      this.$axios
        .get(`http://${process.env.BACK_END_HOST}:${process.env.PORT}/comics`)
        .then(({ data }) => {
          this.comics = data.map((comic) => ({
            id: comic.id,
            text: comic.name,
            value: comic.stub,
          }))
          this.loading = false
        })
    },
    fetchChapters(stub) {
      const stubQuery = this.stub ? `&stub=${stub}` : ''
      this.$axios
        .get(
          `http://${process.env.BACK_END_HOST}:${process.env.PORT}/chapters?size=8${stubQuery}`
        )
        .then(({ data }) => {
          this.chapters = data
        })
    },
    getChapterLink(chapter) {
      return `https://reader.onepiecenakama.pl/read/${chapter['fs_comic.stub']}/pl/${chapter.volume}/${chapter.chapter}/page/1`
    },
    onComicsChange(stub) {
      this.fetchChapters(stub)
    },
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

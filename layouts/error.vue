<template>
  <v-container style="height: 100%;">
    <v-row justify="center" align="end" style="height: 50%;">
      <h1 v-if="error.statusCode === 404">
        {{ pageNotFound }}
      </h1>
      <h1 v-else class="white--text">
        {{ otherError }}
      </h1>
    </v-row>
    <v-row justify="center" align="start" style="height: 50%;">
      <a href="/">Odśwież</a>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ErrorLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Nie znaleziono strony',
      otherError: 'Wystąpił nieznany błąd',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>

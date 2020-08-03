<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="3" lg="3" xl="3">
      <app-info />
    </v-col>
    <v-col cols="12" sm="6" md="4" lg="4" xl="3"
      ><app-feed
        title="Aktualności OP nakama"
        app-id="902476783583400"
        feed-id="onepiecenakamapl"
    /></v-col>
    <v-col cols="12" sm="6" md="4" lg="4" xl="3"
      ><app-feed
        title="Aktualności Wanted Team"
        app-id="902476783583400"
        feed-id="Wanted-Team-1219982108141916"
    /></v-col>
  </v-row>
</template>

<script>
import AppInfo from '@/components/app-info.vue'
import AppFeed from '@/components/app-feed.vue'

export default {
  name: 'MainPage',
  components: [AppInfo, AppFeed],
}
</script>

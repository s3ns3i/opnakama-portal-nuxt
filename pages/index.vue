<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="5" lg="3" xl="2">
      <app-info />
    </v-col>
    <v-col cols="12" sm="6" md="7" lg="4" xl="3"
      ><app-feed
        title="Aktualności OP nakama"
        app-id="1067347306994131"
        feed-id="onepiecenakamapl"
    /></v-col>
    <v-col cols="12" sm="6" md="7" lg="4" xl="3" offset-md="5" offset-lg="0"
      ><app-feed
        title="Aktualności Wanted Team"
        app-id="1067347306994131"
        feed-id="Wanted-Team-1219982108141916"
    /></v-col>
  </v-row>
</template>

<script>
import AppInfo from '@/components/app-info.vue'
import AppFeed from '@/components/app-feed.vue'

export default {
  name: 'MainPage',
  components: { AppInfo, AppFeed },
}
</script>

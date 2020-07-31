<template>
  <v-row justify="center">
    <v-col sm="4" md="4" lg="3"><app-info /> </v-col>
    <v-col sm="5" md="6" lg="5"><app-content /></v-col>
  </v-row>
</template>

<script>
import AppInfo from '@/components/app-info.vue'
import AppContent from '@/components/app-content.vue'

export default {
  name: 'MainPage',
  components: [AppInfo, AppContent],
}
</script>

<template>
  <v-app>
    <v-container style="padding: 0;">
      <v-row justify="center" no-gutters>
        <v-col lg="12" xl="10">
          <v-app-bar
            hide-on-scroll
            prominent
            src="logo3_big.png"
            fade-img-on-scroll
            color="primary"
          >
            <template v-slot:img="{ props }">
              <v-img v-bind="props" height="128" contain></v-img>
            </template>
            <template v-slot:extension>
              <v-btn dark text>Aktualności</v-btn>
              <v-btn
                dark
                text
                href="http://forum.onepiecenakama.pl/"
                target="_blank"
                >Forum</v-btn
              >
              <v-btn text dark>Anime</v-btn>
              <v-spacer />
              <v-btn
                icon
                dark
                href="https://discord.com/channels/152793335852040192/152793335852040192"
                target="_blank"
                style="margin-right: 20px;"
              >
                <v-icon>mdi-discord</v-icon>
              </v-btn>
            </template>
            <v-btn
              style="position: absolute; right: 24px; top: 12px;"
              icon
              dark
              @click="onThemeChange"
            >
              <v-icon>mdi-theme-light-dark</v-icon>
            </v-btn>
          </v-app-bar>
        </v-col>
      </v-row>
    </v-container>
    <v-main id="content">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-badge
      v-if="!isChat"
      :content="unread"
      :value="unread"
      class="button-fixed"
      top
      left
      overlap
      color="primary"
    >
      <v-btn fab color="accent" @click="onChatClick">
        <v-icon>mdi-chat</v-icon>
      </v-btn>
    </v-badge>
    <v-footer app>
      <span>&copy; Portal One Piece Nakama wykonany przez s3ns3i (2020)</span>
    </v-footer>
    <app-chat
      v-show="isChat"
      :is-chat="isChat"
      @close="onChatClose"
      @unread="onUnread"
      @clearUnread="onClearUnread"
    />
  </v-app>
</template>

<script>
import AppChat from '@/components/app-chat/app-chat.vue'

export default {
  name: 'LayoutDefault',
  components: [AppChat],
  data() {
    return {
      isChat: false,
      unread: 0,
    }
  },
  methods: {
    onChatClick() {
      this.isChat = true
    },
    onChatClose() {
      this.isChat = false
    },
    onThemeChange() {
      const isDarkTheme = !this.$vuetify.theme.dark
      this.$vuetify.theme.dark = isDarkTheme
      localStorage.setItem('opnakama_theme_dark', isDarkTheme)
    },
    onUnread(unread) {
      this.unread = unread
    },
    onClearUnread() {
      this.unread = 0
    },
  },
}
</script>
<style lang="scss" scoped>
.button-fixed {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 900;
}
</style>

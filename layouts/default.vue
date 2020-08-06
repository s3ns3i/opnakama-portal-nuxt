<template>
  <v-app :style="cssVars()">
    <v-container style="padding: 0;">
      <app-navigation-drawer v-model="drawer" @themeChange="onThemeChange" />
      <v-row justify="center" no-gutters>
        <v-col class="hidden-md-and-up">
          <v-app-bar
            hide-on-scroll
            prominent
            src="logo3_big.png"
            fade-img-on-scroll
            color="primary"
          >
            <v-app-bar-nav-icon dark @click="drawer = !drawer" />
            <template v-slot:img="{ props }">
              <v-img v-bind="props" height="128" contain></v-img>
            </template>
          </v-app-bar>
        </v-col>
        <v-col lg="12" xl="10" class="hidden-sm-and-down">
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
              <v-btn text dark disabled>Anime</v-btn>
              <v-btn text dark disabled>Artykuły</v-btn>
              <v-btn text dark disabled>Konkursy</v-btn>
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
    <v-footer :app="$vuetify.breakpoint.sm">
      <span
        >&copy; Portal One Piece Nakama wykonany przez s3ns3i (2020) Tło pobrane
        ze strony www.freepik.com</span
      >
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
import AppNavigationDrawer from '@/components/app-navigation-drawer.vue'

export default {
  name: 'LayoutDefault',
  components: [AppChat, AppNavigationDrawer],
  data() {
    return {
      isChat: false,
      unread: 0,
      drawer: false,
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
    cssVars() {
      // return { backgroundImage: 'url(background.jpg)', backgroundSize: 'cover' }
    },
  },
}
</script>
<style lang="scss" scoped>
.button-fixed {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 6;
}
</style>

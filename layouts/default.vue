<template>
  <v-app :style="cssVars()">
    <v-container style="padding: 0;">
      <app-navigation-drawer v-model="drawer" @themeChange="onThemeChange" />
      <v-row justify="center" no-gutters>
        <v-col class="hidden-md-and-up">
          <v-app-bar
            hide-on-scroll
            prominent
            src="banner_wano.png"
            fade-img-on-scroll
            :style="appBarOpacity"
          >
            <v-app-bar-nav-icon dark @click="drawer = !drawer" />
            <template v-slot:img="{ props }">
              <v-img v-bind="props" height="128" contain></v-img>
            </template>
          </v-app-bar>
        </v-col>
        <v-col lg="11" xl="8" class="hidden-sm-and-down">
          <v-app-bar
            hide-on-scroll
            prominent
            src="banner_wano.png"
            fade-img-on-scroll
            :style="appBarOpacity"
          >
            <template v-slot:img="{ props }">
              <v-img v-bind="props"></v-img>
            </template>
            <template v-slot:extension>
              <app-button-nav>Aktualności</app-button-nav>
              <app-button-nav
                href="http://forum.onepiecenakama.pl/"
                target="_blank"
                >Forum</app-button-nav
              >
              <app-button-nav v-if="false" disabled>
                Anime
              </app-button-nav>
              <app-button-nav v-if="false" disabled>Artykuły</app-button-nav>
              <app-button-nav v-if="false" disabled>Konkursy</app-button-nav>
              <app-button-nav
                href="https://discord.com/channels/152793335852040192/152793335852040192"
                target="_blank"
                style="margin-right: 20px; opacity: 0.85;"
              >
                <span>Discord OP nakama <v-icon>mdi-discord</v-icon></span>
              </app-button-nav>
              <v-spacer />
              <app-button-nav fab @click="onThemeChange">
                <v-icon>mdi-theme-light-dark</v-icon>
              </app-button-nav>
            </template>
          </v-app-bar>
        </v-col>
      </v-row>
    </v-container>
    <v-main id="content">
      <nuxt />
    </v-main>
    <v-badge
      v-if="!isChat"
      :content="unread"
      :value="unread"
      class="button--fixed"
      top
      left
      overlap
      color="primary"
    >
      <v-btn fab x-large color="accent" @click="onChatClick">
        <v-icon>mdi-chat</v-icon>
      </v-btn>
    </v-badge>
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
import AppButtonNav from '@/components/app-button-nav.vue'

export default {
  name: 'LayoutDefault',
  components: { AppChat, AppNavigationDrawer, AppButtonNav },
  data() {
    return {
      isChat: false,
      unread: 0,
      drawer: false,
    }
  },
  computed: {
    appBarOpacity() {
      return this.$vuetify.theme.isDark ? 'opacity: 0.8;' : ''
    },
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
      return {
        backgroundImage: this.$vuetify.theme.dark
          ? 'none'
          : 'url(/background.jpg)',
        backgroundSize: 'cover',
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.button {
  &--gradient {
    background-color: red;
  }
  &--fixed {
    position: fixed;
    bottom: 16px;
    right: 16px;
    z-index: 6;
  }
}
</style>
<style lang="scss">
.v-badge {
  &__badge {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    font-size: 1.2rem;
    padding: 6px;
  }
}
</style>

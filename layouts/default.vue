<template>
  <v-app>
    <v-app-bar
      app
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
        <v-btn dark text href="http://forum.onepiecenakama.pl/" target="_blank"
          >Forum</v-btn
        >
        <v-btn text dark>Anime</v-btn>
        <v-btn text dark>Konkursy</v-btn>
        <v-spacer />
        <v-btn icon dark href="https://discord.gg/wmgXWVR" target="_blank">
          <v-icon>mdi-discord</v-icon>
        </v-btn>
      </template>
    </v-app-bar>
    <v-content id="content">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-btn fixed right bottom fab color="primary">
      <v-icon>mdi-chat</v-icon>
    </v-btn>
    <v-footer app>
      <span>&copy; Portal One Piece Nakama wykonany przez s3ns3i (2020)</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
    }
  },
}
</script>

<template>
  <v-card class="fb-page-container" elevation="24" :style="appFeedOpacity">
    <div>
      <div id="fb-root"></div>
      <script
        async
        defer
        crossorigin="anonymous"
        :src="`https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v7.0&appId=${appId}&autoLogAppEvents=1`"
        nonce="q7ZrMnVq"
      ></script>
      <div
        id="fb-plugin"
        ref="fbPagePlugin"
        class="fb-page"
        :data-href="`https://www.facebook.com/${feedId}/`"
        data-tabs="timeline"
        data-width="500"
        data-height="650"
        data-small-header="true"
        data-adapt-container-width="true"
        data-hide-cover="true"
        data-show-facepile="false"
      >
        <blockquote
          :cite="`https://www.facebook.com/${feedId}/`"
          class="fb-xfbml-parse-ignore"
        >
          <v-skeleton-loader
            type="list-item-avatar-two-line, list-item-avatar-two-line, image, article, actions"
            height="650"
            loading
          />
        </blockquote>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'AppContent',
  props: {
    title: {
      type: String,
      required: true,
    },
    appId: {
      type: String,
      required: true,
    },
    feedId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      fb: null,
      pageId: 'Wanted-Team-1219982108141916',
      token:
        'EAAOGWpxRaUMBAPokxnHIe1v5tKIiOZCmLODh3GV3dWTjKicYwiUiFQiaJ0ZCnRhO2xwvMs8hBdQxZCXGcCBVyIiLWq8DVkmZBLGqn4DIktyZBhNSgDIC3XckYLcT2MEWZBl7fCQttAs5ynZCZCcaXgWl0WQPfI0gGJmkePgjjf6Dc4UDqEXrE36xDBmABjUwdjjL2JLItIylS26KKEm3vzIe',
      posts: [],
      isTimeoutActive: false,
    }
  },
  computed: {
    appFeedOpacity() {
      return this.$vuetify.theme.isDark ? 'opacity: 0.7;' : ''
    },
  },
  mounted() {
    window.onresize = this.resizeFbPagePlugin
  },
  methods: {
    resizeFbPagePlugin() {
      if (!this.isTimeoutActive) {
        this.isTimeoutActive = true
        setTimeout(() => {
          // eslint-disable-next-line no-undef
          FB.XFBML.parse(this.$refs.fbPagePlugin.$el)
          this.isTimeoutActive = false
        }, 500)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.fb-page-container {
  max-width: 494px;
  border: 3px solid #777;
}

.fb-page,
.fb-page span,
.fb-page span iframe[style] {
  width: 100% !important;
}
</style>

<template>
  <v-card class="fb-page-container">
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
    }
  },
  mounted() {
    window.onresize = this.resizeFbPagePlugin
  },
  methods: {
    resizeFbPagePlugin() {
      // eslint-disable-next-line no-undef
      FB.XFBML.parse(this.$refs.fbPagePlugin.$el)
    },
    async getPosts() {
      const page = await this.$axios.$get(
        'https://www.facebook.com/Wanted-Team-1219982108141916/posts',
        {
          crossdomain: true,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
              'Origin, X-Requested-With Content-Type, Accept',
            'User-Agent':
              'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:64.0) Gecko/20100101 Firefox/64.0',
          },
        }
      )
      console.log(page)
    },
    fetchFeed() {
      this.fb.api(
        '/1219982108141916/feed',
        ({ data }) => {
          this.mapData(data)
        },
        {
          access_token: this.token,
        }
      )
    },
    mapData(posts) {
      // parse it - get every line by detecting \n symbol and then detect every url or image
      posts.forEach((post) => {
        const mappedMessage = post.message.split('\n').map((line) => ({ line }))

        console.log(mappedMessage)
        const mappedPost = {
          created_time: post.created_time,
          id: post.id,
          message: mappedMessage,
        }

        this.posts.push(mappedPost)
      })
      console.log(posts)
    },
    initFBSDK() {
      const _this = this
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.fbAsyncInit = function () {
        // eslint-disable-next-line no-undef
        FB.init({
          appId: '992148657891651',
          xfbml: false,
          version: 'v7.0',
        })
        // eslint-disable-next-line no-undef
        _this.fb = FB
        _this.fetchFeed()
      }
      ;(function (d, s, id) {
        const fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) {
          return
        }
        const js = d.createElement(s)
        js.id = id
        js.src = '//connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
      })(document, 'script', 'facebook-jssdk')
    },
  },
}
</script>
<style lang="scss" scoped>
.fb-page-container {
  max-width: 500px;
}

.fb-page,
.fb-page span,
.fb-page span iframe[style] {
  width: 100% !important;
}
</style>

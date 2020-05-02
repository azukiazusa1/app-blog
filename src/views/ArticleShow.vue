<template>
  <v-container>
    <v-overlay v-if="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <template v-else-if="getArticle.published">
      <v-card>
        <v-row>
          <v-col cols=12>
            <v-card-title class="display-2 text-center py-10">{{ getArticle.title }}</v-card-title>
            <p class="text-right ma-2">
              <v-btn icon><v-icon class="text-right" size="small">fas fa-calendar</v-icon></v-btn>{{ createdTime }}
            </p>
            <v-divider></v-divider>
            <preview-markdown :value="getArticle.body"></preview-markdown>
          </v-col>
          <v-col>
            <v-card-actions>
              <v-btn class="ma-2" small color="twitter">
                <v-icon left color="white">fab fa-twitter</v-icon>
                <a
                  :href="`https://twitter.com/share?url=${fullPath}&text=${getArticle.title}`"
                  class="white--text"
                  target="_blank"
                >
                  Tweet
                </a>
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
      <v-row>
        <v-col cols=12>
          <user-card
            :user="getUser"
            :loading="loading"
            :error="error"
          ></user-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title><v-btn icon><v-icon>fas fa-tags</v-icon></v-btn>Tags</v-card-title>
            <v-card-text>
              <tag-list :tags="getArticle.tags"></tag-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols=12>
          <v-card>
            <v-card-title><v-btn icon><v-icon>fas fa-link</v-icon></v-btn>関連記事</v-card-title>
            <v-container>
              <v-row>
                <v-col cols=12 md=3 v-for="relArticle in getRelArticles" :key="relArticle.id">
                  <rel-article-card :article="relArticle"></rel-article-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>この記事は公開されていません。</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import UserCard from '@/components/UserCard'
import TagList from '@/components/TagList.vue'
import RelArticleCard from '@/components/RelArticleCard'
import PreviewMarkdown from '@/components/PreviewMarkdown'
import moment from 'moment'
import fetchBeforeRouting from '@/mixin/fetchBeforeRouting'
import { mapGetters, mapActions } from 'vuex'
import store from '@/store'
import config from '@/config'

export default {
  data () {
    return {
      userLoading: true,
      error: false,
      loading: false
    }
  },
  mixins: [fetchBeforeRouting],
  created () {
    this.initialize()
  },
  methods: {
    ...mapActions('user', ['bindUserById']),
    ...mapActions('relArticles', ['bindRelArticles']),
    initialize () {
      this.setMetaInfo({
        title: this.getArticle.title,
        description: this.getArticle.overview
      })
      this.bindUserById(this.getArticle.author)
        .then(() => {
          this.Userloading = false
        })
        .catch(() => {
          this.error = true
        })

      this.bindRelArticles(this.getArticle.id)
    }
  },
  computed: {
    ...mapGetters(['getArticle']),
    ...mapGetters('user', ['getUser']),
    ...mapGetters('relArticles', ['getRelArticles']),
    createdTime: function () {
      return moment(this.getArticle.created.seconds * 1000).format('Y-MM-DD hh:mm:ss')
    },
    fullPath () {
      return `${location.origin}${this.$route.fullPath}`
    }
  },
  async beforeRouteUpdate (to, from, next) {
    this.loading = true
    this.error = false
    if (store.getters.getArticleById(to.params.id)) {
      const article = store.getters.getArticleById(to.params.id)
      await store.commit('set', article)
    } else {
      try {
        await store.dispatch('bindArticleById', to.params.id)
      } catch (e) {
        if (e.code === config.CODE.PERMISSION_DENIED) {
          next(config.NOTFOUND_PATH)
        }
      }
    }
    this.loading = false
    this.initialize()
    next()
  },
  components: {
    UserCard,
    TagList,
    PreviewMarkdown,
    RelArticleCard
  }
}
</script>

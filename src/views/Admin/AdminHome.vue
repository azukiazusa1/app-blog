<template>
  <v-container>
    <v-row>
      <v-col cols=12>
        <v-card>
          <v-card-title>
            <v-btn icon><v-icon>fa fa-blog</v-icon></v-btn>マイブログ
          </v-card-title>
          <v-card-text>
                <v-container>
                  <v-row>
                      <v-col>
                        <router-link class="title-link text--primary headline" to="/">私のブログ</router-link>
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-col>
                        投稿数
                        <v-btn icon v-if="loading">
                          <v-icon>fa fa-spinner fa-spin</v-icon>
                        </v-btn>
                        <v-avatar
                          size="24"
                          color="primary"
                          v-else
                        >
                          <span class="white--text font-weight-bold">{{ getArticlesCount }}</span>
                        </v-avatar>
                      </v-col>
                  </v-row>
                </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <user-card :uid="user.uid" v-if="user"></user-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="red accent-2" block x-large dark @click="createArticle">
          <v-icon>fas fa-edit</v-icon>
          今すぐ記事を投稿する
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserCard from '@/components/UserCard'
import { mapActions, mapGetters } from 'vuex'
import { auth } from '@/plugins/auth'

export default {
  name: 'admin-home',
  data() {
    return {
      user: '',
      loading: true
    }
  },
  created() {
    this.bindAllArticles()
      .then(() => this.loading = false)
    auth()
      .then((user) => this.user = user)
  },
  methods: {
    ...mapActions(['bindAllArticles', 'createArticle', 'flash/setFlash']),
    createArticle() {
      this.newArticle(this.user.uid)
        .then(docRef => {
          this.$router.push({name: 'article-edit', params: { id: docRef.id }})
        })
        .catch(() => {
          this['flash/setFlash']({
            message: '新規記事の作成に失敗しました。',
            type: 'error'
          })
        })
    }
  },
  computed: {
    ...mapGetters(['getArticlesCount'])
  },
  components: {
    UserCard
  }
}
</script>
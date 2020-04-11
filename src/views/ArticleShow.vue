<template>
  <v-container>
    <v-row>
      <v-col cols=12>
        <div class="display-2 text-center py-10">{{ article.title }}</div>
        <p class="text-right">
          <v-btn icon><v-icon class="text-right" size="small">fas fa-calendar</v-icon></v-btn>{{ createdTime }}
        </p>
        <v-divider></v-divider>
        <mavon-editor 
          v-model="article.body"
          :toolbarsFlag="false"
          :subfield="false"
          defaultOpen="preview"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols=12>
        <user-card :uid="article.author" v-if="article"></user-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title><v-btn icon><v-icon>fas fa-tags</v-icon></v-btn>Tags</v-card-title>
          <v-card-text>
            <tag-list :tags="article.tags" v-if="article"></tag-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserCard from '@/components/UserCard'
import TagList from '@/components/TagList.vue'
import moment from 'moment'
import store from '@/store';

export default {
  data() {
    return {
      article: '',
    }
  },
  beforeRouteEnter (route, redirect, next) {
    if (store.getters.getArticleById(route.params.id)) {
      const article = store.getters.getArticleById(route.params.id)
      next(vm => vm.setData(article))
    } else {
      store.dispatch('bindArticleById', route.params.id)
        .then(() => {
          const article = store.getters.getArticle
          if (!article) {
            next(redirect)
            // TODO redirect 404 page
            // redirect('/')
          }
          next(vm => vm.setData(article))
        })
    }
  },
  methods: {
    setData (article) {
      this.article = article
    }
  },
  computed: {
    createdTime: function () {
      if (!this.article) return
     return moment(this.article.created.seconds * 1000).format('Y-MM-DD hh:mm:ss')
   },
  },
  components: {
    UserCard, TagList
  }
}
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols=12>
        <div class="display-2 text-center">{{ article.title }}</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import store from '@/store';

export default {
  data() {
    return {
      article: ''
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
  created() { console.log(this.article)}
}
</script>
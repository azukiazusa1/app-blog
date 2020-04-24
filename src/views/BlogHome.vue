<template>
  <article-list></article-list>
</template>

<script>
import ArticleList from '@/components/ArticleList'
import { mapMutations } from 'vuex'

export default {
  name: 'blog-home',
  created() {
    this.setMetaInfo()
    this.clearArticles()
  },
  methods: {
    ...mapMutations(['clearArticles']),
  },
  components: {
    ArticleList
  }
}
</script>

import store from '@/store'
import config from '@/config'

export default {
  async beforeRouteEnter (route, from, next) {
    if (store.getters.getArticleById(route.params.id)) {
      const article = store.getters.getArticleById(route.params.id)
      store.commit('set', article)
      next(vm => vm.setData(article))
    } else {
      try {
        await store.dispatch('bindArticleById', route.params.id)
        const article = store.getters.getArticle
        next(vm => vm.setData(article))
      } catch (e) {
        if (e.code === config.CODE.PERMISSION_DENIED) {
          next(config.NOTFOUND_PATH)
        }
      }
    }
  },
  methods: {
    setData (article) {
      this.article = article
      this.loading = false
    }
  }
}

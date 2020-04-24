<template>
  <v-container>
    <v-row v-if="getArticles">
      <v-col cols=12 v-for="article in getArticles" :key="article.id">
        <list-card :article="article"></list-card>
      </v-col>
    </v-row>
    <v-row v-if="!isFinish" justify="center">
      <v-col cols=1>
        <v-progress-circular
          indeterminate
          color="red"
          v-intersect="onIntersect"
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListCard from '@/components/ListCard'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import moment from 'moment'

export default {
  name: 'archive-list',
  data() {
    return {
      loading: false
    }
  },
  created() {
    this.setMetaInfo({
      title: `アーカイブ - ${this.formatedDate}`
    })
    this.clearArticles()
  },
  methods: {
    ...mapActions(['fetchArticles']),
    ...mapMutations(['clearArticles']),
    onIntersect(entries, observer, isIntersecting) {
      if (this.loading || !isIntersecting || this.isFinish) return
      this.loading = true
      this.fetchArticles({
        lastDate: this.getLastDate,
        month: new Date(this.$route.params.date)
      })
        .then(() => this.loading = false)
    }
  },
  computed: {
    ...mapGetters(['getArticles', 'getLastDate', 'isFinish']),
    formatedDate() {
      return moment(this.$route.params.date).format('YYYY年MM月')
    }
  },
  watch: {
    $route() {
      this.loading = false
      this.clearArticles()
      this.setMetaInfo({
        title: `アーカイブ - ${this.formatedDate}`
      })
    }
  },
  components: {
    ListCard
  }
}
</script>

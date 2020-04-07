<template>
  <v-container>
    <v-row v-if="getArticles">
      <v-col cols=12 v-for="article in getArticles" :key="article.id">
          <list-card :article="article"></list-card>
      </v-col>
    </v-row>
    <v-row v-else-if="loading">
      <v-progress-circular
        indeterminate
        color="red"
      ></v-progress-circular>
    </v-row>
  </v-container>
</template>

<script>
import ListCard from '@/components/ListCard'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'blog-home',
  data() {
    return {
      loading: true
    }
  },
  created() {
    this.bindArticles()
    .then(() => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions(['bindArticles']),
  },
  computed: {
    ...mapGetters(['getArticles'])
  },
  components: {
    ListCard
  }
}
</script>

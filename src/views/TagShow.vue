<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="headline">タグ：{{ $route.params.name }}</v-card-title>
            <v-skeleton-loader
              class="mx-auto"
              type="card"
              v-if="tagLoading"
            ></v-skeleton-loader>
            <v-card-text v-else>
              <v-container fluid>
                <v-row>
                  <v-col md=3 sm=12>
                    <v-row>
                      <v-col cols=12>
                        <v-avatar
                          class="profile"
                          size="164"
                          tile
                        >
                          <v-img
                            v-if="getTag.image"
                            :src="getTag.image"
                            :alt="getTag.name"
                          ></v-img>
                          <v-img
                            v-else
                            :src="noImage"
                            alt="no-image"
                          >
                          </v-img>
                        </v-avatar>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col md=9 sm=12>
                    <p>{{ getTag.description }}</p>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
import config from '@/config'

export default {
  name: 'tag-show',
  data() {
    return {
      tagLoading: true,
      loading: false,
      noImage: config.NOIMAGE
    }
  },
  created() {
    this.setMetaInfo({
      title: this.$route.params.name
    })
    this.clearArticles()
    this.bindTagByName(this.$route.params.name).then(() => {
      this.tagLoading = false
    })
  },
  computed: {
    ...mapGetters('tags', ['getTag']),
    ...mapGetters(['getArticles', 'getLastDate', 'isFinish'])
  },
  methods: {
    ...mapActions('tags', ['bindTagByName']),
    ...mapActions(['fetchArticles']),
    ...mapMutations(['clearArticles']),
    onIntersect(entries, observer, isIntersecting) {
      if (this.loading || !isIntersecting || this.isFinish) return
      this.loading = true
      this.fetchArticles({
        lastDate: this.getLastDate,
        tag: this.$route.params.name
      })
        .then(() => this.loading = false)
        .catch(e => console.log(e))
    }
  },
  watch: {
    $route() {
      this.tagLoading = true
      this.clearArticles()
      this.bindTagByName(this.$route.params.name).then(() => {
        this.tagLoading = false
      })
    }
  },
  components: {
    ListCard
  }
}
</script>
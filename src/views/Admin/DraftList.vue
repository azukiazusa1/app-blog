<template>
  <v-container fluid>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>下書き一覧</v-card-title>
            <v-card-text>
              下書き数
              <v-btn icon v-if="loading">
                <v-icon>fa fa-spinner fa-spin</v-icon>
              </v-btn>
              <v-avatar
                size="24"
                color="primary"
                v-else
              >
                <span class="white--text font-weight-bold">{{ getDraftsCount }}</span>
              </v-avatar>
            </v-card-text>
              <v-container fluid>
                <template v-if="loading">
                  <v-skeleton-loader type="list-item-two-line" v-for="n in 5" :key="n"></v-skeleton-loader>
                </template>
                <v-row v-else>
                  <v-expansion-panels
                    v-for="article in getDrafts"
                    :key="article.id"
                  >
                    <list-panel :article="article"></list-panel>
                  </v-expansion-panels>
                </v-row>
              </v-container>
          </v-card>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import ListPanel from '@/components/ListPanel'
import { auth } from '@/plugins/auth'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'draft-list',
  data () {
    return {
      loading: true
    }
  },
  async created () {
    this.setMetaInfo({
      title: '下書き一覧'
    })
    const user = await auth()
    this.bindDrafts(user.uid)
      .then(() => {
        this.loading = false
      })
  },
  methods: {
    ...mapActions(['bindDrafts'])
  },
  computed: {
    ...mapGetters(['getDrafts', 'getDraftsCount'])
  },
  components: {
    ListPanel
  }
}
</script>

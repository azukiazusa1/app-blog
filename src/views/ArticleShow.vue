<template>
  <v-container>
    <template v-if="getArticle.published">
      <v-row>
        <v-col cols=12>
          <div class="display-2 text-center py-10">{{ getArticle.title }}</div>
          <p class="text-right">
            <v-btn icon><v-icon class="text-right" size="small">fas fa-calendar</v-icon></v-btn>{{ createdTime }}
          </p>
          <v-divider></v-divider>
          <preview-markdown :value="getArticle.body"></preview-markdown>
        </v-col>
      </v-row>
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
import PreviewMarkdown from '@/components/PreviewMarkdown'
import moment from 'moment'
import fetchBeforeRouting from '@/mixin/fetchBeforeRouting'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: true,
      error: false
    }
  },
  mixins: [fetchBeforeRouting],
  created() {
    this.bindUserById(this.getArticle.author)
      .then(() => this.loading = false)
      .catch(() => this.error = true)
  },
  methods: {
    ...mapActions('user', ['bindUserById']),
  },
  computed: {
    ...mapGetters(['getArticle']),
    ...mapGetters('user', ['getUser']),
    createdTime: function () {
     return moment(this.getArticle.created.seconds * 1000).format('Y-MM-DD hh:mm:ss')
   },
  },
  components: {
    UserCard, TagList, PreviewMarkdown
  }
}
</script>
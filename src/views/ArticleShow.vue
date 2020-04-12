<template>
  <v-container>
    <v-row>
      <v-col cols=12>
        <div class="display-2 text-center py-10">{{ article.title }}</div>
        <p class="text-right">
          <v-btn icon><v-icon class="text-right" size="small">fas fa-calendar</v-icon></v-btn>{{ createdTime }}
        </p>
        <v-divider></v-divider>
        <preview-markdown :value="article.body"></preview-markdown>
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
import PreviewMarkdown from '@/components/PreviewMarkdown'
import moment from 'moment'
import fetchBeforeRouting from '@/mixin/fetchBeforeRouting'

export default {
  data() {
    return {
      article: '',
    }
  },
  mixins: [fetchBeforeRouting],
  computed: {
    createdTime: function () {
      if (!this.article) return
     return moment(this.article.created.seconds * 1000).format('Y-MM-DD hh:mm:ss')
   },
  },
  components: {
    UserCard, TagList, PreviewMarkdown
  }
}
</script>
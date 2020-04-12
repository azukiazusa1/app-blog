<template>
  <v-expansion-panel>
    <v-expansion-panel-header v-if="article.title">
      {{ article.title }}
      <span class="text-right">
          <v-btn icon><v-icon class="text-right" size="small">fas fa-calendar</v-icon></v-btn>{{ createdTime }}
      </span>
    </v-expansion-panel-header>
    <v-expansion-panel-header v-else>
      <span class="font-weight-thin">タイトル未設定</span>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-container fluid>
        <v-row>
          <v-col>
            <v-btn icon><v-icon size="small">fas fa-tags</v-icon></v-btn>
            <tag-list :tags="article.tags"></tag-list>
          </v-col>
          <v-col align-self="end" cols=1>
            <v-btn class="ma-2" depressed color="primary" 
              :to="{ name: 'article-edit', params: {id: article.id} }"><v-icon left>fas fa-edit</v-icon>編集
            </v-btn>
          </v-col>
          <v-col cols=1>
            <v-btn class="ma-2" depressed color="error"><v-icon delete>fas fa-trash-alt</v-icon>削除</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <preview-markdown :value="article.body"></preview-markdown>
          </v-col>
        </v-row>
      </v-container>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import PreviewMarkdown from '@/components/PreviewMarkdown'
import TagList from '@/components/TagList'
import moment from 'moment'

export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    createdTime: function () {
    return moment(this.article.created.seconds * 1000).format('Y-MM-DD hh:mm:ss')
   },
  },
  components: {
    PreviewMarkdown, TagList
  }
}
</script>
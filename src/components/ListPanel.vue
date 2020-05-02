<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <span v-if="article.title">{{ article.title }}</span>
      <span v-else class="grey--text lighten-2--text">タイトル未設定</span>
      <span class="grey--text lighten-2--text">(ID：{{ article.id }})</span>
      <span class="text-right">
        <formated-date :date="article.created.toMillis()"></formated-date>
      </span>
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
            <v-btn class="ma-2" depressed color="error" @click="onDelete"><v-icon delete>fas fa-trash-alt</v-icon>削除</v-btn>
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
import FormatedDate from '@/components/FormatedDate'
import { mapActions } from 'vuex'

export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions(['deleteArticle', 'flash/setFlash']),
    onDelete () {
      if (confirm(`記事ID: ${this.article.id}を削除します。よろしいですか？(この操作は取り消しません)`)) {
        this.deleteArticle(this.article.id)
          .catch(() => this['flash/setFlash']({
            message: '記事の削除に失敗しました。',
            type: 'error'
          }))
      }
    }
  },
  components: {
    PreviewMarkdown,
    TagList,
    FormatedDate
  }
}
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-form @submit.prevent>
            <v-text-field
              v-model="article.title"
              :counter="255"
              :error-messages="titleErrors"
              label="Title"
              required
            ></v-text-field>
            <v-combobox 
              multiple
              v-model="article.tags" 
              label="Tags" 
              append-icon
              chips
              deletable-chips
              hide-selected
              class="tag-input"
              :hide-no-data="!search"
              :items="items"
              :search-input.sync="search" 
            >
            </v-combobox>
            <mavon-editor
              v-model="article.body"
              language="ja"
              :toolbars="toolbars"
              @imgAdd="imgAdd"
              @change="debounceUpdate"
            ></mavon-editor>
            </v-form>
          </v-card-text>
            <v-card-actions>
              <v-btn text color="success" v-if="save">保存しました。</v-btn>
              <v-spacer />
              <v-switch
                v-model="article.published"
                label="記事を公開する"
              ></v-switch>
              <v-btn color="primary" @click="publish">投稿</v-btn>
            </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import fetchBeforeRouting from '@/mixin/fetchBeforeRouting'
import { debounce } from 'lodash'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'article-edit',
  data() {
    return {
      article: {
        title: '',
        body: '',
        published: false,
        tags: []
      },
      search: '',
      items: ['JavaScript'],
      save: false,
      toolbars: {
        imagelink: true, 
        table: true, 
        preview: true,
      }
    }
  },
  mixins: [fetchBeforeRouting,validationMixin],
  validations: {
    article: {
      title: { required },
      body: { required }
    },
  },
  computed: {
    titleErrors () {
      const errors = []
      if (!this.$v.article.title.$dirty) return errors
      !this.$v.article.title.required && errors.push('記事を公開する場合、タイトルは必須です。')
      return errors
    },
    bodyErrors () {
      const errors = []
      if (!this.$v.article.bosy.$dirty) return errors
      !this.$v.article.body.required && errors.push('記事を公開する場合、本文は必須です。')
      return errors
    },
  },
  methods: {
    publish() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        alert('published!')
      }
    },
    debounceUpdate :debounce(function() {
      this.save = true
      setTimeout(() => {
        this.save = false
      }, 3000)
    }, 1500),
    imgAdd() {
      console.log('imgAdded!')
    }
  },
  watch: {
    'article.tags': function(val) {
        this.search = ''
        console.log(val)
      },
  }
}
</script>
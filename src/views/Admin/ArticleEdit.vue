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
              :loading="tagLoading"
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
            <v-messages class="py-5 error--text" :value="bodyErrors"></v-messages>
            </v-form>
          </v-card-text>
            <v-card-actions>
              <v-btn text color="success" v-if="save">保存しました。</v-btn>
              <v-spacer />
              <v-switch
                @click.stop="publish"
                :value="article.published"
                label="記事を公開する"
              ></v-switch>
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
import { mapGetters, mapActions } from 'vuex'

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
      items: [],
      tagLoading: true,
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
  created() {
    this.fetchTags()
     .then(() => {
      this.tagLoading = false
      this.items = this.getTags
    })
  },
  computed: {
    ...mapGetters('tags', ['getTags']),
    titleErrors () {
      const errors = []
      if (!this.$v.article.title.$dirty) return errors
      !this.$v.article.title.required && errors.push('記事を公開する場合、タイトルは必須です。')
      return errors
    },
    bodyErrors () {
      const errors = []
      if (!this.$v.article.body.$dirty) return errors
      !this.$v.article.body.required && errors.push('記事を公開する場合、本文は必須です。')
      return errors
    },
  },
  methods: {
    ...mapActions('tags', ['fetchTags', 'createOrUpdateTag']),
    ...mapActions(['updateArticle', 'flash/setFlash']),
    publish() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.article.published = false
        return
      }
      this.article.published = !this.article.published
      this.updateArticle(this.article)
        .then(() => {
          if (this.article.published) {
            this['flash/setFlash']({
              message: '記事を公開しました。',
            })
          } else {
            this['flash/setFlash']({
              message: '記事を非公開にしました。',
              type: 'info'
            })
          }
        })
        .catch(() => this.dbError())
    },
    debounceUpdate :debounce(function() {
      this.updateArticle(this.article)
        .then(() => {
          this.save = true
          setTimeout(() => {
            this.save = false
          }, 3000)
        })
        .catch(() => this.dbError())
    }, 1500),
    imgAdd() {
      console.log('imgAdded!')
    },
    dbError() {
      this['flash/setFlash']({
        message: 'データの保存に失敗しました。',
        type: 'error'
      })
    }
  },
  watch: {
    'article.tags': async function(val) {
        if (val.length === 0) return
        this.search = ''
        try {
          await this.createOrUpdateTag(val[val.length - 1])
          await this.updateArticle(this.article)
        } catch(e) {
          this.dbError()
        }
      }
    }
}
</script>
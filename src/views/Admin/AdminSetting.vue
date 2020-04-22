<template>
  <v-card>
    <v-card-title class="headline">設定画面</v-card-title>
    <v-form @submit.prevent="onSubmit">
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col cols=12>
              <v-text-field
                v-model="blogInfo.title"
                :counter="50"
                :error-messages="titleErrors"
                label="タイトル"
                required
                @input="$v.blogInfo.title.$touch()"
                @blur="$v.blogInfo.title.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols=12>
              <v-textarea
                v-model="blogInfo.description"
                :counter="300"
                :error-messages="descriptionErrors"
                label="説明"
                @input="$v.blogInfo.description.$touch()"
                @blur="$v.blogInfo.description.$touch()"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn class="mr-4" @click="onSubmit" color="primary">更新</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'admin-setting',
  data() {
    return {
      blogInfo: null
    }
  },
  mixins: [validationMixin],
  created() { this.blogInfo = this.getBlogInfo},
  validations: {
    blogInfo: {
      title: { required, maxLength: maxLength(50) },
      description: { maxLength: maxLength(300) },
    },
  },
  computed: {
    ...mapGetters('blog', ['getBlogInfo']),
    titleErrors () {
      const errors = []
      if (!this.$v.blogInfo.title.$dirty) return errors
      !this.$v.blogInfo.title.required && errors.push('ブログのタイトルは必須です。')
      !this.$v.blogInfo.title.maxLength && errors.push('タイトルは50文字までです。')
      return errors
    },
    descriptionErrors() {
      const errors = []
      if (!this.$v.blogInfo.description.$dirty) return errors
      !this.$v.blogInfo.description.maxLength && errors.push('ブログの説明は300文字までです。')
      return errors
    },
  },
  methods: {
    ...mapActions('blog', ['updateBlogInfo']),
    ...mapActions(['flash/setFlash']),
    onSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      this.updateBlogInfo(this.blogInfo)
        .then(() => this['flash/setFlash']({
          message: 'ブログ情報の更新に成功しました。',
          mounted: () => console.log('created hook'),
          destroyed: () => console.log('destroyed hook')
        }))
        .catch(() => this['flash/setFlash']({
          message: 'ブログ情報の更新に失敗しました。',
          type: 'error'
        }))
    }
  }
}
</script>
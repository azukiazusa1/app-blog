<template>
  <v-card>
    <v-card-title class="headline">タグ：{{ $route.params.name }}</v-card-title>
    <v-form @submit.prevent="onSubmit">
      <v-skeleton-loader
        class="mx-auto"
        type="card"
        v-if="loading"
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
                      :src="tag.image"
                      :alt="tag.name"
                    ></v-img>
                  </v-avatar>
                </v-col>
              </v-row>
              <v-row>
                <v-col md=10 sm=12>
                  <v-file-input
                    accept="image/*"
                    label="Edit"
                    @change="onFileUpload"
                    dense
                    :clearable=false
                    >
                  </v-file-input>
                </v-col>
                <v-col cols=2>
                  <v-progress-circular
                    :rotate="-90"
                    :value="fileLoading"
                    color="primary"
                  >{{ fileLoading}}</v-progress-circular>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols=9>
              <v-textarea
                v-model="tag.description"
                :counter="300"
                :error-messages="descriptionErrors"
                label="説明"
                @input="$v.tag.description.$touch()"
                @blur="$v.tag.description.$touch()"
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
import { maxLength } from 'vuelidate/lib/validators'
import { storage } from '@/plugins/storage'
import getFileType from '@/mixin/getFileType'

export default {
  name: 'tag-edit',
  data () {
    return {
      tag: null,
      loading: true,
      fileLoading: 0
    }
  },
  mixins: [validationMixin, getFileType],
  validations: {
    tag: {
      description: { maxLength: maxLength(300) }
    }
  },
  created () {
    this.setMetaInfo({
      title: `タグ編集 - ${this.$route.params.name}`
    })
    this.bindTagByName(this.$route.params.name).then(() => {
      this.tag = this.getTag
      this.loading = false
    })
  },
  computed: {
    ...mapGetters('tags', ['getTag']),
    descriptionErrors () {
      const errors = []
      if (!this.$v.tag.description.$dirty) return errors
      !this.$v.tag.description.maxLength && errors.push('タグの説明はは300文字までです。')
      return errors
    }
  },
  methods: {
    ...mapActions('tags', ['updateTag', 'bindTagByName']),
    ...mapActions(['flash/setFlash']),
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) return
      this.updateTag(this.tag)
        .then(() => this['flash/setFlash']({
          message: 'タグ情報の更新に成功しました。'
        }))
        .catch(() => this['flash/setFlash']({
          message: 'タグ情報の更新に失敗しました。',
          type: 'error'
        }))
    },
    onFileUpload (file) {
      const fileType = this.getFileType(file)
      if (!fileType) {
        this['flash/setFlash']({
          message: 'ファイルタイプが不正です。',
          type: 'error'
        })
      }
      const storageRef = storage.ref(`tags/${this.tag.name}.${fileType}`)
      const uploadTask = storageRef.put(file)
      uploadTask.on('state_changed',
        snapshot => {
          const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          this.fileLoading = percentage
        },
        err => {
          console.log(err)
          this['flash/setFlash']({
            message: 'ファイルのアップロードに失敗しました。',
            type: 'error'
          })
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.fileLoading = 0
            this.tag.image = downloadURL
          })
        }
      )
    }
  }
}
</script>

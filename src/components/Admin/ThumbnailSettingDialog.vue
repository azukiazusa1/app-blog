<template>
    <v-dialog v-model="dialog" scrollable max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" class="ma-5" v-on="on">
          <v-icon>fas fa-image</v-icon>
          サムネイルの設定
        </v-btn>
      </template>
      <v-card>
        <v-card-title>サムネイルの設定</v-card-title>
        <v-divider></v-divider>
        <v-progress-linear
          v-model="fileLoading"
          stream
        ></v-progress-linear>
        <v-card-text style="height: 600px;">
          <v-card-subtitle>現在のサムネイル</v-card-subtitle>
          <v-row>
            <v-col cols=4>
              <v-img
                :src="thumbnail"
                alr="サムネイル"
                width=200
                height=200
              ></v-img>
            </v-col>
            <v-col cols=8>
              <v-file-input accept="image/*" label="画像をアップロードして設定する。" @change="onFileUpload"></v-file-input>
              <v-btn color="error" @click="deleteThumbnail">サムネイルを削除する</v-btn>
            </v-col>
          </v-row>
          <v-text-field v-model="thumbnail" readonly></v-text-field>
          <v-card-subtitle>記事内の画像から設定する。</v-card-subtitle>
          <v-row>
            <v-col cols=12>
              <v-card>
                <div v-if="loading">
                  画像データの取得中...
                  <v-progress-circular indeterminate color="red"></v-progress-circular>
                </div>
                <div v-else-if="images.length === 0">
                  この記事に画像は使われていません。
                </div>
                <v-container fluid v-else>
                  <v-row>
                    <v-col
                      v-for="(image, index) in images"
                      :key="index"
                      :index="index"
                      class="d-flex child-flex"
                      cols="4"
                    >
                      <v-card flat tile class="d-flex">
                        <v-img
                          :id="index"
                          :src="image"
                          aspect-ratio="1"
                          :class="{ selected: isSelected(index) }"
                          @click="onClick"
                        >
                          <template v-slot:placeholder>
                            <v-row
                              class="fill-height ma-0"
                              align="center"
                              justify="center"
                            >
                              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-row>
                          </template>
                        </v-img>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { storage } from '@/plugins/storage'
import getFileType from '@/mixin/getFileType'
import { mapActions } from 'vuex'

export default {
  name: 'thumbnail-setting-dialog',
  props: {
    article: {
      type: Object,
      required: true
    },
    addedImages: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      thumbnail: this.article.thumbnail,
      loading: true,
      error: false,
      dialog: false,
      images: [],
      selectedImage: '',
      fileLoading: 0
    }
  },
  mixins: [getFileType],
  async created () {
    try {
      const storageRef = await storage.ref(`articles/${this.article.id}`)
      const res = await storageRef.listAll()
      res.items.forEach(itemRef => {
        itemRef.getDownloadURL().then(url => {
          this.images.push(url)
        })
      })
    } catch (e) {
      this.error = true
      console.log(e)
    } finally {
      this.loading = false
    }
  },
  methods: {
    ...mapActions(['flash/setFlash']),
    onFileUpload (file) {
      const fileType = this.getFileType(file)
      if (!fileType) {
        this['flash/setFlash']({
          message: 'ファイルタイプが不正です。',
          type: 'error'
        })
      }
      const storageRef = storage.ref(`articles/${this.article.id}/thumbnail}.${fileType}`)
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
            this.thumbnail = downloadURL
          })
        }
      )
    },
    deleteThumbnail () {
      this.thumbnail = ''
    },
    onClick (e) {
      this.selectedImage = +e.target.parentElement.id
      this.thumbnail = this.images[e.target.parentElement.id]
    }
  },
  computed: {
    isSelected () {
      return index => this.selectedImage === index
    }
  },
  watch: {
    addedImages (newval) {
      this.images.push(newval[newval.length - 1])
    },
    thumbnail (newval) {
      this.$emit('onThubnailChanged', newval)
    }
  }
}
</script>

<style scoped>
.selected {
  border: medium solid #FFEB3B
}
</style>

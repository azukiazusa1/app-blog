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
        <v-card-text style="height: 600px;">
          <v-card-subtitle>現在のサムネイル</v-card-subtitle>
          <v-row>
            <v-col cols=4>
              <v-img
                :src="article.thumbnail"
                alr="サムネイル"
                width=200
                height=200
              ></v-img>
            </v-col>
            <v-col cols=8>
              <v-file-input accept="image/*" label="画像をアップロードして設定する。"></v-file-input>
            </v-col>
          </v-row>
          <v-text-field v-model="article.thumbnail" readonly></v-text-field>
          <v-card-subtitle>記事内の画像から設定する。</v-card-subtitle>
          <v-row>
            <v-col cols=12>
              <v-card v-if="!loading">
                <v-container fluid>
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
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { storage } from '@/plugins/storage'

export default {
  name: 'thumbnail-setting-dialog',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: true,
      dialog: false,
      images: [],
      selectedImage: ''
    }
  },
  async created() {
    try {
      const storageRef = await storage.ref(`articles/${this.article.id}`)
      const res = await storageRef.listAll()
      res.items.forEach(itemRef => {
        itemRef.getDownloadURL().then(url => {
          this.images.push(url)
        })
        .catch(e => console.error(e))
      })
    } catch(e) {
      console.log(e)
    } finally {
      this.loading = false
    }
  },
  methods: {
    onClick(e) {
      this.selectedImage = +e.target.parentElement.id
      this.article.thumbnail = this.images[e.target.parentElement.id]
    },
  },
  computed: {
     isSelected() {
      return index => this.selectedImage === index
      
    }
  }
}
</script>

<style scoped>
.selected {
  border: medium solid #FFEB3B
}
</style>
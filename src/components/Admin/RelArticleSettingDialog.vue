<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" class="ma-5" v-on="on">
        <v-icon>fas fa-link</v-icon>
        関連記事の設定
      </v-btn>
    </template>
    <v-card>
      <v-card-title>関連記事の設定</v-card-title>
      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col cols=6>
            <v-card-subtitle>記事一覧</v-card-subtitle>
            <v-list
              max-height="600px"
              class="overflow-y-auto"
            >
              <draggable :list="itemsB" group="list">
                <v-list-item v-for="(item, i) in itemsB" :key="i">
                  <small-list-card :article="item"></small-list-card>
                </v-list-item>
              </draggable>
            </v-list>
          </v-col>
          <v-col cols=6>
            <v-card-subtitle>関連記事</v-card-subtitle>
            <v-list>
              <draggable :list="items" group="list">
                <v-list-item v-for="(item, i) in items" :key="i">
                  <small-list-card :article="item"></small-list-card>
                </v-list-item>
              </draggable>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import Draggable from 'vuedraggable'
import SmallListCard from '@/components/SmallListCard'

export default {
  name: 'rel-article-setting-dialog',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dialog: false,
      items: [],
      itemsB: [],
      snackbar: false,
      snackbar_msg: ''
    }
  },
  created () {
    for (let index = 0; index < 4; index++) {
      this.items.push(this.article)
    }
    for (let index = 0; index < 10; index++) {
      this.itemsB.push(this.article)
    }
  },
  components: {
    Draggable,
    SmallListCard
  }
}
</script>

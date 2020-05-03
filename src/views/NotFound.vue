<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <h1
            class="display-4 font-italic"
            :class="randomTextColor"
            >404 Not Found!!</h1>
          <p>お探しのページが見つかりませんでした。</p>
          <p>あなたがアクセスしようとしたページは移動または削除された可能性があります。</p>
        </v-col>
      </v-row>
      <v-row justify="center">
        <router-link to='/'>トップへ戻る</router-link>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      colors: [
        'red--text',
        'pink--text',
        'purple--text',
        'deep-purple--text',
        'indigo--text',
        'blue--text',
        'light-blue--text',
        'cyan--text',
        'teal--text',
        'green--text',
        'light-green--text',
        'lime--text',
        'yellow--text',
        'amber--text',
        'orange--text',
        'deep-orange--text',
        'brown--text',
        'blue-grey--text',
        'grey--text',
        'black--text'
      ]
    }
  },
  created () {
    this.setMetaInfo({
      title: 'ページが見つかりませんでした。',
      robots: 'noindex'
    })
  },
  computed: {
    randomTextColor () {
      return this.colors[Math.floor(Math.random() * this.colors.length)]
    }
  }
}
</script>

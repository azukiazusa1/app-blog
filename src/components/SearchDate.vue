<template>
    <v-menu :offset-y=true>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>fas fa-calendar-alt</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-date-picker
            :allowed-dates="allowedMonths"
            v-model="picker"
            type="month"
            locale="zh-ja"
            @change="onChange"
            :show-current=false
          ></v-date-picker>
        </v-list-item>
      </v-list>
    </v-menu>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'search-date',
  data() {
    return {
      picker: '',
    }
  },
  created() {
    this.fetchArchives()
  },
  methods: {
    ...mapActions('archives', ['fetchArchives']),
    allowedMonths(val) {
      return this.getAllowedMonths.includes(val)
    },
    onChange() {
      // 同じページへ遷移するためにエラーを握りつぶします。
      this.$router.push(`/archive/${this.picker}`).catch(() => {})
    }
  },
  computed: {
    ...mapGetters('archives', ['getAllowedMonths'])
  }
}
</script>
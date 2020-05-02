<template>
  <span>
    <v-btn icon v-if="icon"><v-icon size="small">{{ icon }}</v-icon></v-btn>{{ createdTime }}
  </span>
</template>

<script>
import moment from 'moment'

export default {
  name: 'formated-date',
  props: {
    date: {
      type: [String, Number],
      required: true
    },
    format: {
      type: String,
      default: 'Y-MM-DD hh:mm:ss'
    },
    icon: {
      type: [String, Boolean],
      default: 'fas fa-calendar'
    }
  },
  computed: {
    createdTime () {
      return moment(this.date).format(this.format)
    }
  }
}
</script>

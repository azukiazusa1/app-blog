<template>
  <span>
    <v-btn icon><v-icon size="small">{{ icon }}</v-icon></v-btn>{{ createdTime }}
  </span>
</template>

<script>
import moment from 'moment'

export default {
  name: 'formatedDate',
  props: {
    date: {
      type: String,
      required: true
    },
    format: {
      type: String,
      default: 'Y-MM-DD hh:mm:ss'
    },
    icon: {
      type: String,
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

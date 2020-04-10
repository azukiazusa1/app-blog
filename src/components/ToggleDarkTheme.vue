<template>
  <v-btn icon
    @click="toggleDark"
    :color="getColor">
    <v-icon>fas fa-moon</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'ToggleDarkTheme',
  data() {
    return {
      strageKey: 'theme-mode'
    }
  },
  methods: {
    toggleDark() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      if (this.$vuetify.theme.dark) {
        localStorage.setItem(this.strageKey,'dark')
      } else {
        localStorage.setItem(this.strageKey,'light')
      }
    }
  },
  created() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const localTheme = localStorage.getItem(this.strageKey)
    if  (localTheme === 'light') {
      this.$vuetify.theme.dark = false
    } else if (localTheme === 'dark'){
      this.$vuetify.theme.dark = true
    } else {
      this.$vuetify.theme.dark = isDark
    }
  },
  computed: {
    getColor() {
      return this.$vuetify.theme.dark ? 'yellow' : ''
    }
  }
}
</script>
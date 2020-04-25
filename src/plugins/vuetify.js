import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free-brands'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const brands = {
  github: '#211F1F',
  facebook: '#3B5998',
  twitter: '#1DA1F2',
  qiita: '#4cb10d'
}

export default new Vuetify({
  theme: {
    themes: {
      light: brands,
      dark: {
        ...brands,
        github: '#fff'
      }
    }
  }
})
import { mapGetters } from 'vuex'

const SEPALATER = '|'

export default {
  methods: {
    setMetaInfo({ title = '', description = '' } = {}) {
      const defaultTitle = this.getBlogInfo.title
      document.title = title ? `${title} ${SEPALATER} ${defaultTitle}` : defaultTitle
      document.querySelector('meta[name="description"]').setAttribute('content', description)
    }
  },
  computed: {
    ...mapGetters('blog', ['getBlogInfo'])
  }
}
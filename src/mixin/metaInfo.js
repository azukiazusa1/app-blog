import { mapGetters } from 'vuex'

const SEPALATER = '|'

export default {
  methods: {
    setMetaInfo ({ title = '', description = '', robots = 'index, follow' } = {}) {
      const defaultTitle = this.getBlogInfo.title
      document.title = title ? `${title} ${SEPALATER} ${defaultTitle}` : defaultTitle
      document.querySelector('meta[name="description"]').setAttribute('content', description)
      document.querySelector('meta[name="robots"]').setAttribute('content', robots)
    }
  },
  computed: {
    ...mapGetters('blog', ['getBlogInfo'])
  }
}

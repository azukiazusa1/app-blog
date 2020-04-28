export default {
  methods: {
    getFileType ($file) {
      switch ($file.type) {
        case 'image/gif':
          return 'gif'
        case 'image/jpeg':
          return 'jpg'
        case 'image/png':
          return 'png'
        default:
          return false
      }
    }
  }
}

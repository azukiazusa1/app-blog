<template>
  <mavon-editor
    :value="value"
    :toolbarsFlag="false"
    :subfield="false"
    codeStyle="vs2015"
    defaultOpen="preview"
  />
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  components: {
    mavonEditor
  }
}
</script>

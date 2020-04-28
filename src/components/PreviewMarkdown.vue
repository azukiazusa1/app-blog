<template>
  <mavon-editor
    :value="value"
    :toolbarsFlag="false"
    :subfield="false"
    codeStyle="atom-one-dark"
    defaultOpen="preview"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  }
}
</script>

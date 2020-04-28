<template>
  <v-text-field
    :label="label"
    :prepend-icon="icon"
    v-model="_email"
    :error-messages="emailErrors"
    required
    @input="$v._email.$touch()"
    @blur="$v._email.$touch()"
  />
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'email-input-field',
  props: {
    email: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: ''
    },
    touch: {
      type: Boolean,
      default: false
    }
  },
  mixins: [validationMixin],
  validations: {
    _email: { required, email }
  },
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v._email.$dirty) return errors
      !this.$v._email.email && errors.push('メールアドレスの形式が正しくありません。')
      !this.$v._email.required && errors.push('メールアドレスが入力されていません。')
      return errors
    },
    _email: {
      get () {
        return this.email
      },
      set (email) {
        this.$emit('update:email', email)
      }
    }
  },
  watch: {
    touch (newval) {
      if (newval) this.$v.$touch()
    }
  }
}
</script>

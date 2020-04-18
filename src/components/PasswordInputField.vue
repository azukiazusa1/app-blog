<template>
  <v-text-field
    :label="label"
    :prepend-icon="icon"
    v-model="_password"
    type="password"
    :error-messages="passwordErrors"
    required
    :hint="hint"
    :persistent-hint="!!hint"
    @input="$v._password.$touch()"
    @blur="$v._password.$touch()"
  />
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'password-input-field',
  props: {
    password: {
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
    hint: {
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
    _password: { required },
  },
  computed: {
    passwordErrors () {
      const errors = []
      if (!this.$v._password.$dirty) return errors
      !this.$v._password.required && errors.push('パスワードが入力されていません。')
      return errors
    },
    _password: {
      get() {
        return this.password
      },
      set(password) {
        this.$emit('update:password', password)
      }
    }
  },
  watch: {
    touch(newval) {
      if (newval) this.$v.$touch()
    }
  }
}
</script>
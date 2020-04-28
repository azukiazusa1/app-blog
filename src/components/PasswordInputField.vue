<template>
  <div>
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
    <v-text-field
      v-if="confirm"
      label="確認用パスワード"
      :prepend-icon="icon"
      v-model="_confirmPassword"
      type="password"
      :error-messages="confirmPasswordErrors"
      required
      hint="確認のため、もう一度入力してください。"
      persistent-hint
      @input="$v._confirmPassword.$touch()"
      @blur="$v._confirmPassword.$touch()"
    />
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, sameAs, minLength } from 'vuelidate/lib/validators'

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
    confirm: {
      type: Boolean,
      default: false
    },
    confirmPassword: {
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
    _password: { required, minLength: minLength(6) },
    _confirmPassword: {
      required,
      samaAs: sameAs(function () {
        return this._password
      })
    }
  },
  computed: {
    passwordErrors () {
      const errors = []
      if (!this.$v._password.$dirty) return errors
      !this.$v._password.required && errors.push('パスワードが入力されていません。')
      !this.$v._password.minLength && errors.push('パスワードは6文字以上入力してください。')
      return errors
    },
    confirmPasswordErrors () {
      const errors = []
      if (!this.$v._confirmPassword.$dirty) return errors
      !this.$v._confirmPassword.required && errors.push('確認用のパスワードが入力されていません。')
      !this.$v._confirmPassword.samaAs && errors.push('確認用のパスワードが一致しません。')
      return errors
    },
    _password: {
      get () {
        return this.password
      },
      set (password) {
        this.$emit('update:password', password)
      }
    },
    _confirmPassword: {
      get () {
        return this.confirmPassword
      },
      set (confirmPassword) {
        this.$emit('update:confirmPassword', confirmPassword)
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

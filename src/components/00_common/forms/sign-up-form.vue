<template>
  <div class="c-login-form">

    <x-input-email pPlaceHolder="Email"
             v-model="email"  />

    <x-input-password pPlaceHolder="Password"
             v-model="password" />

    <x-input-password pPlaceHolder="Repeat password"
             v-model="repassaword"
             v-on:enter="signUp" />

    <button  class="button button--large button--color"
             v-on:click="signUp" >
      Sign up
    </button>
  </div>
</template>

<script>
export default {
  name: 'x-signup',
  data: () => {
    return {
      email: "",
      password: "",
      repassaword: ""
    }
  },
  methods: {
    signUp: function() {

      if (this.email.length <= 0) {
        this.$emit('setMessages', ["Email cannot be null"])
        return false
      }

      if (this.password.length <= 0) {
        this.$emit('setMessages', ["Password cannot be null"])
        return false
      }

      if (this.repassword != this.password) {
        this.$emit('setMessages', ["Passwords are not the same"])
        return false
      }

      this.$emit('signUp', this.email, this.password)
    }
  }
}
</script>

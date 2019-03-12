<template>
  <div class="c-login-form">
    <div class="c-login-form__title">
      {{ welcomeMsg }}
    </div>
    <x-input placeholder="Email"
             :value="email"  />
    <x-input placeholder="password"
             type="password"
             :value="password" />
    <x-input placeholder="repeat password"
             type="password"
             :value="repassaword"
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
  props: {
    welcomeMsg: {
      type: String,
      default: "Welcome"
    }
  },
  data: () => {
    return {
      email: "",
      password: "",
      repassaword: ""
    }
  },
  methods: {
    signUp: function() {
      this.$emit('signUp', this.email, this.password)
    }
  }
}
</script>

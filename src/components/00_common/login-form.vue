<template>
  <div class="c-login-form">
    <div class="c-login-form__title">
      {{ welcomeMsg }}
    </div>
    <x-input placeholder="Email"
             :value="email"  />
    <x-input placeholder="password"
             type="password"
             :value="password"
             v-on:enter="login" />
    <button v-on:click="login" >
      Log in
    </button>
  </div>
</template>

<script>
export default {
  name: 'x-login',
  props: {
    welcomeMsg: {
      type: String,
      default: "Welcome"
    }
  },
  data: () => {
    return {
      email: "ricardo9300@gmail.com",
      password: "abc123"
    }
  },
  methods: {
    login: function() {
      this.$emit('login', this.email, this.password)
    }
  }
}
</script>

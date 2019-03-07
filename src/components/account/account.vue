<template>
  <div>

    <h1> Account </h1>
    <div>
        <span>Welcome</span>
    </div>
    <div v-if="message.length > 0">
      {{ message }}
    </div>

    <x-login v-if="!this.$store.state.user.logged"
            v-on:login="login"
            :pEmail="username"
            :pPassword="password" />
    <button v-else
            v-on:click="logOut">
      Log out
    </button>

  </div>
</template>

<script>
export default {
  name: 'x-account',
  data: () => {
    return {
      username: "ricardo9300@gmail.com",
      password: "abc123",
      message: ""
    }
  },
  methods: {
    login: function() {
      const self = this

      if (this.username.length <= 0) {
        this.message = "Name cannot be empty"
        return false
      }

      if (this.password.length <= 0) {
        this.message = "Password cannot be empty"
        return false
      }

      const fetchPost = require('../../util/fetchPost')

      fetchPost.postData("api/Auth/Login", {
            email: this.username,
            password: this.password
        })
      .then(res => res.json()) // parses response to JSON
      .then(res => console.log(res))
      .then(self.$store.commit('logInUser'))
      .catch(error => console.error('Error:', error));
    },
    logOut: function() {
      this.$store.commit('logOutUser')
    }
  }
}
</script>

<template>
  <div>
    <h1> Account </h1>
    <div>
        <span>Welcome</span>
    </div>
    <div v-if="message.length > 0">
      {{ message }}
    </div>

    <x-login v-on:login="login"
            :pEmail="username"
            :pPassword="password" />

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

      if (this.username.length <= 0) {
        this.message = "Name cannot be empty"
        return false
      }

      if (this.password.length <= 0) {
        this.message = "Password cannot be empty"
        return false
      }

      const fetchPost = require('../../util/fetchPost')

      fetchPost.postData("https://localhost:5001/api/Auth/Login", {
            email: this.username,
            password: this.password
        })
      .then(res => res.json()) // parses response to JSON
      .then(res => console.log(res))
      .catch(error => console.error('Error:', error));


    }
  }
}
</script>

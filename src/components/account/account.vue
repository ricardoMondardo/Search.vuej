<template>
  <div>

    <h1> Account </h1>
    <div v-if="message.length > 0">
      {{ message }}
    </div>

    <x-login v-if="!this.$store.state.user.logged"
            v-on:login="login" />

  </div>
</template>

<script>
export default {
  name: 'x-account',
  data: () => {
    return {
      message: " "
    }
  },
  methods: {
    login: function(email, password) {
      const self = this

      if (email.length <= 0) {
        this.message = "Name cannot be empty"
        return false
      }

      if (password.length <= 0) {
        this.message = "Password cannot be empty"
        return false
      }

      const fetchPost = require('../../util/fetchPost')

      fetchPost.postData("api/Auth/Login", {
            email: email,
            password: password
        })
      .then((res) => {
        if(res.code == 401) {
          self.message = "email or password incorect"
        } else {
          self.message = ""
          self.$store.commit('logInUser')
        }
      })
      .catch((error) => {
        console.log(error)
        self.message = "sorry, something goes wrong, try again later"
      });

    }
  }
}
</script>

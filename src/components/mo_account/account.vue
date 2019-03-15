<template>
  <div class="site-content c-account">

    <x-buttonhamburger />

    <x-main-nav class="c-account__main-nav">
      <template slot="menu-items">
        <slot name="menu-items" />
      </template>
    </x-main-nav>

    <x-auth-nav class="c-account__auth_nav"
                :pHideLogin="false"/>

    <div class="c-account__tabs"
        v-if="!isLogged">
      <button class="button--link"
              v-bind:class="[ isLogInAct ? 'button--link__on' : ''  ]"
              v-on:click="showLogIn">
        {{ pLogInLabel }}
      </button>

      <button class="button--link"
              v-bind:class="[ isSignUpAct ? 'button--link__on' : ''  ]"
              v-on:click="showSignUp">
        {{ pCreateAccountLabel }}
      </button>
    </div>

    <x-login :welcomeMsg="pWelcomemsg"
             v-if="!isLogged && !isLoading && isLogInAct"
             v-on:login="login"
             v-on:sendActiveLink="sendActiveLink" />

    <x-signup :welcomeMsg="pWelcomemsg"
             v-if="!isLogged && !isLoading && isSignUpAct"
             v-on:signUp="signUp" />

    <div class="c-account__welcome-msg"
         v-if="isLogged && !isLoading">
      Welcome!
    </div>

    <ul class="c-account__forms-msg"
          v-if="messages.length > 0">
      <li v-for="item in messages" :key="item">
        {{ item }}
      </li>
    </ul>



    <div class="c-account__spinner">
      <x-spiner v-if="isLoading" />
    </div>
  </div>
</template>

<script>

const fetchPost = require('../../util/fetchPost')

export default {
  name: 'x-account',
  props: {
    pWelcomemsg: {
      type: String,
      default: ''
    },
    pCreateAccountLabel: {
      type: String,
      default: "Sign in"
    },
    pLogInLabel: {
      type: String,
      default: "Log in"
    },
    pComefromactivelink: {
      type: Boolean,
      default: false
    },
    pUseractivecode: {
      type: String,
      default: ""
    },
    pEmail: {
      type: String,
      default: ""
    }
  },
  mounted() {
    if(this.pComefromactivelink) {
      window.history.pushState("", "", '/account');

      if(this.pUseractivecode.length > 0) {
        this.logInUserWithCode()
      }
    }
  },
  computed: {
    isLogged: function() {
      return this.$store.state.user.logged;
    },
    isLoading: function() {
      return this.status == this.$constants.LOADING
    },
    isError: function() {
      return this.status == this.$constants.ERROR
    }
  },
  data: () => {
    return {
      status: "LOGIN",
      isLogInAct: true,
      isSignUpAct: false,
      email: "",
      password: "",
      messages: []
    }
  },
  methods: {
    showSignUp: function() {
      this.isLogInAct = false
      this.isSignUpAct = true
    },
    showLogIn: function() {
      this.isLogInAct = true
      this.isSignUpAct = false
    },
    logInUserWithCode: function() {
      const self = this
      this.messages = []

      console.log('Log in with active code for:' + this.pEmail)
      console.log("api/auth/loginWithActiveCode")

      this.status = this.$constants.LOADING
      fetchPost.postData("api/Auth/loginWithActiveCode", {
            email: this.pEmail,
            password: this.pUseractivecode
        })
      .then((res) => {
        this.status = this.$constants.LOGGED
        self.$store.commit('logInUser', {
          id: res.id,
          token: res.token,
          tokenExpirationTime: res.tokenExpirationTime
        })
      })
      .catch((error) => {
        this.status = this.$constants.ERROR
        this.handleErrorPost(error)
      });
    },
    sendActiveLink: function(email) {
      const self = this
      this.messages = []

      if (email.length <= 0) {
        this.messages.push("Email cannot be empty")
        return false
      }

      this.status = this.$constants.LOADING
      fetchPost.postData(`api/Auth/sendlinkactive?email=${email}`)
      .then((res) => {
        this.status = this.$constants.LOGGED
        this.messages.push("Please, check your email")
      })
      .catch((error) => {
        this.status = this.$constants.ERROR
        this.handleErrorPost(error)
      });

    },
    signUp: function(email, password, repassword) {
      const self = this
      this.messages = []
      this.email = email

      if (email.length <= 0) {
        this.messages.push("Email cannot be empty")
        return false
      }

      if (password.length <= 0) {
        this.messages.push("Password cannot be empty")
        return false
      }

      if (repassword != password) {
        this.messages.push("Repeat Password incorrect")
        return false
      }

      this.status = this.$constants.LOADING
      fetchPost.postData("api/Auth/Register", {
            username: email,
            email: email,
            password: password
        })
      .then((res) => {
        this.status = this.$constants.LOGGED
        self.$store.commit('logInUser', {
          id: res.id,
          token: res.token,
          tokenExpirationTime: res.tokenExpirationTime
        })
      })
      .catch((error) => {
        this.status = this.$constants.ERROR
        this.handleErrorPost(error)
      });
    },
    login: function(email, password) {
      const self = this
      this.messages = []

      if (email.length <= 0) {
        this.messages.push("Email cannot be empty")
        return false
      }

      if (password.length <= 0) {
        this.messages.push("Password cannot be empty")
        return false
      }

      this.status = this.$constants.LOADING
      fetchPost.postData("api/Auth/Login", {
            email: email,
            password: password
        })
      .then((res) => {
        this.status = this.$constants.LOGGED
        self.$store.commit('logInUser', {
          id: res.id,
          token: res.token,
          tokenExpirationTime: res.tokenExpirationTime
        })
      })
      .catch((error) => {
        this.status = this.$constants.ERROR
        this.handleErrorPost(error)
      });
    },
    handleErrorPost: function(error) {

      if(error.code != undefined) {
        if(error.code == '400') {

          error.data.then((data) => {

            if(data.title != undefined) {
              this.messages.push(data.title)
            }

            if(data.errors.email != undefined && data.errors.email.length > 0) {
              this.messages = this.messages.concat(data.errors.email)
            }

            if(data.errors.email != undefined && data.errors.email.length > 0) {
              this.messages = this.messages.concat(data.errors.password)
            }
          }).catch(() => {
            this.messages.push("Please, try again later")
          })

        } else if(error.code == '401') {
           this.messages.push("Email or Password invalid")
        } else {
          this.messages.push("Please, try again later")
        }
      }
    }
  }
}
</script>

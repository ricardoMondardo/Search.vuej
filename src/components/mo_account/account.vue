<template>
  <div class="site-content c-account">

    <x-buttonhamburger />

    <x-main-nav class="c-account__main-nav">
      <template slot="menu-items">
        <slot name="menu-items" />
      </template>
    </x-main-nav>

    <x-auth-nav
      class="c-account__auth_nav"
      :pHideLogin="false"/>

    <div
      class="c-account__tabs"
      v-if="!isStatusLogged">
      <button
        class="button--link"
        v-bind:class="[ isModeLogin ? 'button--link__on' : ''  ]"
        v-on:click="showLogIn">
        {{ pLogInLabel }}
      </button>

      <button
        class="button--link"
        v-bind:class="[ isModeSign ? 'button--link__on' : ''  ]"
        v-on:click="showSignUp">
        {{ pCreateAccountLabel }}
      </button>
    </div>

    <div v-if="!isStatusLoading">
      <x-login
        v-if="!isStatusLogged && isModeLogin"
        v-on:setMessages="setMessages"
        v-on:login="login" />

      <x-signup
        v-if="!isStatusLogged && isModeSign"
        v-on:setMessages="setMessages"
        v-on:signUp="signUp" />

      <x-send-active-link-form
        v-if="isModeSendLink"
        v-on:setMessages="setMessages"
        v-on:sendActiveLink="sendActiveLink"/>
    </div>
    <div
      class="c-account__spinner"
      v-else>
      <x-spiner />
    </div>

    <div
      class="c-account__welcome-msg"
      v-if="shouldShowWelcomeMsg">
      Welcome!
    </div>

    <button
      class="button"
      v-if="!isModeSendLink"
      v-on:click="showSendLink">
      Send link active account
    </button>

    <ul
      class="c-account__forms-msg"
      v-if="messages.length > 0">
      <li
        v-for="item in messages"
        :key="item">
        {{ item }}
      </li>
    </ul>
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
    pComeFromActiveLink: {
      type: Boolean,
      default: false
    },
    pUserActiveCode: {
      type: String,
      default: ""
    },
    pEmail: {
      type: String,
      default: ""
    }
  },
  mounted() {
    this.showLogIn()

    if(this.pComefromactivelink) {
      window.history.pushState("", "", '/account');

      if(this.pUseractivecode.length > 0) {
        this.logInUserWithCode()
      }
    }
  },
  data: () => {
    return {
      status: "",
      mode: '',
      email: "",
      password: "",
      messages: []
    }
  },
  computed: {
    isModeLogin: function() {
      return this.mode == this.$constants.AccountPageMode.LOGIN
    },
    isModeSign: function() {
      return this.mode == this.$constants.AccountPageMode.SIGNIN
    },
    isModeSendLink: function() {
      return this.mode == this.$constants.AccountPageMode.SENDLINK
    },
    isStatusLogged: function() {
      return this.status == this.$constants.AccountPageStatusControl.LOGGED
    },
    isStatusLoading: function() {
      return this.status == this.$constants.AccountPageStatusControl.LOADING
    },
    isStatusError: function() {
      return this.status == this.$constants.AccountPageStatusControl.ERROR
    },
    shouldShowWelcomeMsg: function() {
      return this.isStatusLogged && !this.isStatusLoading
    }
  },
  methods: {
    showSignUp: function() {
      this.changeMode(this.$constants.AccountPageMode.SIGNIN)
    },
    showLogIn: function() {
      this.changeMode(this.$constants.AccountPageMode.LOGIN)
    },
    showSendLink: function() {
      this.changeMode(this.$constants.AccountPageMode.SENDLINK)
    },
    changeMode: function(mode) {
      this.status = this.$constants.AccountPageStatusControl.INITIAL
      this.messages = []
      this.mode = mode
    },
    login: function(email, password) {
      const self = this
      this.messages = []

      this.status = this.$constants.AccountPageStatusControl.LOADING
      fetchPost.postData("api/Auth/Login", {
            email: email,
            password: password
        })
      .then((res) => {
        this.status = this.$constants.AccountPageStatusControl.LOGGED
        self.$store.commit('logInUser', {
          id: res.id,
          token: res.token,
          tokenExpirationTime: res.tokenExpirationTime
        })
      })
      .catch((error) => {
        this.handleErrorPost(error)
      });
    },
    logInUserWithCode: function() {
      const self = this
      this.messages = []

      this.status = this.$constants.AccountPageStatusControl.LOADING
      fetchPost.postData("api/Auth/loginWithActiveCode", {
            email: this.pEmail,
            password: this.pUseractivecode
        })
      .then((res) => {
        this.status = this.$constants.AccountPageStatusControl.LOGGED
        self.$store.commit('logInUser', {
          id: res.id,
          token: res.token,
          tokenExpirationTime: res.tokenExpirationTime
        })
      })
      .catch((error) => {
        this.handleErrorPost(error)
      });
    },
    signUp: function(email, password) {
      const self = this
      this.messages = []
      this.email = email

      this.status = this.$constants.AccountPageStatusControl.LOADING
      fetchPost.postData("api/Auth/Register", {
            username: email,
            email: email,
            password: password
        })
      .then((res) => {
        this.status = this.$constants.AccountPageStatusControl.LOGGED
        self.$store.commit('logInUser', {
          id: res.id,
          token: res.token,
          tokenExpirationTime: res.tokenExpirationTime
        })
      })
      .catch((error) => {
        this.handleErrorPost(error)
      });
    },
    sendActiveLink: function(email) {
      const self = this
      this.messages = []

      this.status = this.$constants.AccountPageStatusControl.LOADING
      fetchPost.postData(`api/Auth/sendlinkactive?email=${email}`)
      .then((res) => {
        this.showLogIn()
        this.messages.push("Please, check your email")
      })
      .catch((error) => {
        this.handleErrorPost(error)
      });

    },
    handleErrorPost: function(error) {
      this.status = this.$constants.AccountPageStatusControl.ERROR
      this.messages = []

      if(error.code != undefined) {
        if(error.code == '404') {
          this.messages.push("Email not found")
        } else if(error.code == '401') {
           this.messages.push("Email or Password invalid")
        } else if(error.code == '400') {
          error.data.then((data) => {
            if(data.title != undefined) this.messages.push(data.title)

            if(data.errors.email != undefined
                && data.errors.email.length > 0) this.messages = this.messages.concat(data.errors.email)

            if(data.errors.email != undefined
              && data.errors.email.length > 0) this.messages = this.messages.concat(data.errors.password)
          }).catch(() => {
            this.messages.push("Please, try again later")
          })
        } else {
          this.messages.push("Please, try again later")
        }
      } else {
        this.messages.push("Sorry, something wrong happen!")
      }
    },
    setMessages: function(messages) {
      console.log('messages')
      this.messages = messages
    }
  }
}
</script>

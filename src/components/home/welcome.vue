<template>
  <div>

    <x-login-form
      place-holder-email="Email *"
      place-holder-password="Pass *"
      text-button="Log in *"
      v-on:login="dologin"
      v-on:error="doerror">
    </x-login-form>

  </div>
</template>


<script>

import fetchManager from '../../utils/fetchGet'

export default {
  name:"x-welcome",
  methods: {
    dologin: function() {

      fetchManager.getData("/api/users/getsomedata")
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          console.log(error)
        })

    },
    doerror: function() {
      console.log('Error')
    }
  }
}
</script>


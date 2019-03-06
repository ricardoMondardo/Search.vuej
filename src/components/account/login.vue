<template>
  <div>
    <input v-model="pEmail"
            placeholder="Email">
    <input v-model="pPassword"
          placeholder="password"
          @keyup.enter="login">
    <button v-on:click="$emit('login')">
      Log in
    </button>
  </div>
</template>

<script>
export default {
  name: 'x-login',
  props: {
    pEmail: {
      type: String,
      defaul: ""
    },
    pPassword: {
      type: String,
      defaul: ""
    }
  }
}
</script>

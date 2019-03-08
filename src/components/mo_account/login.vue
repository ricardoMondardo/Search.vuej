<template>
  <div>
    <input v-model="email"
            placeholder="Email">
    <input v-model="password"
          placeholder="password"
          @keyup.enter="$emit('login', email, password)">
    <button v-on:click="$emit('login', email, password)">
      Log in
    </button>
  </div>
</template>

<script>
export default {
  name: 'x-login',
  data: () => {
    return {
      email: "ricardo9300@gmail.com",
      password: "abc123"
    }
  }
}
</script>

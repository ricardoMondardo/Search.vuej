<template>
  <div>{{pTitle}}</div>
</template>

<script>
  export default {
    name: 'x-search',

    props: {
      pTitle: {
        type: String,
        default: "No Text"
      }
    }
  }
</script>

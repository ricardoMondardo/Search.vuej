<template>
  <div>
    Hi, form welcome component
    <button @click="fetchContext"> Click </button>
  </div>
</template>


<script>

import fetchManager from '../../utils/fetchGet'

export default {
  name:"x-welcome",
  methods: {
    fetchContext: function() {

      fetchManager.getData("/api/users/getsomedata")
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          console.log(error)
        })

    }
  }
}
</script>


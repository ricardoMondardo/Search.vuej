<template>
  <div class="c-user-card">
    <div class="c-user-card__field">
      <span> User Name: </span>
      {{ pName }}
    </div>
    <div class="c-user-card__field">
      <span> Email: </span>
      {{ pEmail }}
    </div>
    <div class="c-user-card__field">
      <span> Active: </span>
      <div v-if="pActive">
        True
      </div>
      <div v-else>
        <button
          class="c-button"
          v-on:click="active"
          >
          Active
        </button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "x-user-card",
  props: {
    pName: {
      type: String,
      default: "username"
    },
    pEmail: {
      type: String,
      default: "email@nodata.com"
    },
    pActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    active: function() {
      this.$emit("active")
    }
  }
}
</script>


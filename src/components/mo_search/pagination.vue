<template>
  <div class="pagination">
    <button v-on:click="$emit('previous')"
            :disabled="(pPage - 1) <= 0"
            class="button" > Previous </button>
    <button v-on:click="$emit('goToPage', pPagesFastAccess[0])"
            :disabled="pPage == pPagesFastAccess[0] || pPagesFastAccess[0] == null "
            class="pagination__fast-button-page button" > {{pPagesFastAccess[0] || '...'}} </button>
    <button v-on:click="$emit('goToPage', pPagesFastAccess[1])"
            :disabled="pPage == pPagesFastAccess[1] || pPagesFastAccess[1] == null "
            class="pagination__fast-button-page button" > {{pPagesFastAccess[1] || '...'}} </button>
    <button v-on:click="$emit('goToPage', pPagesFastAccess[2])"
            :disabled="pPage == pPagesFastAccess[2] || pPagesFastAccess[2] == null "
            class="pagination__fast-button-page button" > {{pPagesFastAccess[2] || '...' }} </button>
    <button v-on:click="$emit('next')"
            :disabled="(pPage + 1) > pTotalPages "
            class="button"  > Next </button>
    <!-- <span> {{ pPageOf }} </span> -->
  </div>
</template>


<script>
export default {
  name: 'x-paggination',
  props: {
    pPagesFastAccess: {
      type: [Array, Number]
    },
    pPage: {
      type: Number,
      default: 0
    },
    pTotalPages: {
      type: Number,
      default: 0
    },
    pPageOf: {
      type: String,
      default: "0 of 0"
    }
  }
}
</script>


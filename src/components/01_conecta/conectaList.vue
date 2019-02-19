<template>
    <ul v-if="pCollection.length > 0" class="c-conecta__list">
      <li class="c-conecta__list--item" v-for="item in pCollection">
        <x-conectaCard
          v-bind:pId="item.Id"
          v-bind:pTitle="item.Title"
          v-bind:pImageSrc="item.Image" />
      </li>
    </ul>
    <div class="c-conecta__no_data_msg" v-else>
      No data Found
    </div>
</template>

<script>
  export default {
    name: 'x-conectaList',
    props: {
      pCollection: {
        type: [Array, Object],
        required: true
      }
    }
  }
</script>

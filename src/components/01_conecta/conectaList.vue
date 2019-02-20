<template>
  <div class="conectaList">
    <ul v-if="pCollection.length > 0">
      <li v-for="item in pCollection">
          <x-conectaCard
            v-bind:pId="item.Id"
            v-bind:pTitle="item.Title"
            v-bind:pImageSrc="item.Image">

            <template v-slot:LabelTitle>
              <slot name="CardLaLabelTitle" />
            </template>

            <template v-slot:LabelCategory>
              <slot name="CardLabelCategory" />
            </template>

          </x-conectaCard>
      </li>
    </ul>
    <div class="conectaList__msg" v-else>
      ...
    </div>
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

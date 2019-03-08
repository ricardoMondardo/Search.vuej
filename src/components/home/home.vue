<template>
  <div class="c-home">

    <x-buttonhamburger />

    <x-menu>
      <template slot="menu-items">
        <slot name="menu-items" />
      </template>
    </x-menu>

    <h1> Home - Welcome! </h1>
  </div>
</template>

<script>
  export default {
    name: 'x-home'
  }
</script>

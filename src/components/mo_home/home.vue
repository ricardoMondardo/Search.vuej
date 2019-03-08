<template>
  <div class="site-content c-home">

    <x-buttonhamburger />

    <x-main-nav>
      <template slot="menu-items">
        <slot name="menu-items" />
      </template>
    </x-main-nav>

    <x-auth-op />

    <h1> Home - Welcome! </h1>
  </div>
</template>

<script>
  export default {
    name: 'x-home'
  }
</script>

<template>
  <div class="site-content">

    <x-buttonhamburger />

    <x-main-nav>
      <template slot="menu-items">
        <slot name="menu-items" />
      </template>
    </x-main-nav>

    <x-auth-nav />

    <h1> Home - Welcome! </h1>
  </div>
</template>

<script>
  export default {
    name: 'x-home'
  }
</script>

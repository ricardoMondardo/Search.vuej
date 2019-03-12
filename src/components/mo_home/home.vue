<template>
  <div class="site-content c-home">

    <x-buttonhamburger />

    <x-main-nav class="c-home__main-nav">
      <template slot="menu-items">
        <slot name="menu-items" />
      </template>
    </x-main-nav>

    <x-auth-nav class="c-home__auth-nav" />

  </div>
</template>

<script>
  export default {
    name: 'x-home'
  }
</script>

<template>
  <div>
    <div class="hero is-black is-bold">
    <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1">CITIZENS FOR CLIMATE</h1>
          <div class="subtitle">Belgiëk</div>
        </div>
    </div>
    </div>
    <nuxt/>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
export default {
  components: {
      Navbar
  }
}
</script>

<style>
.hero .title{
  font-family: 'Fjalla One', sans-serif;
  letter-spacing: 5px;
}

.hero .subtitle{
  color: #67de97 !important;
  letter-spacing: 2px;

}
</style>


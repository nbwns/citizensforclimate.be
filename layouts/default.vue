<template>
  <div>
    <div class="hero is-dark is-bold">
    <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">CITIZENS FOR CLIMATE</h1>
          <div class="subtitle">- BELGIËK -</div>
        </div>
    </div>
    </div>
    <nuxt/>
    <Footer />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'
export default {
  components: {
      Navbar,
      Footer
  }
}
</script>

<style>

</style>


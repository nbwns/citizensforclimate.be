<template>
  <div>
    <Navbar />
     <section class="hero is-medium is-bold">
      <div class="hero-body">
          <div class="container has-text-centered">
            <img src="~/assets/images/crowd.jpg">
            <h1 class="title">CITIZENS FOR CLIMATE</h1>
            <div class="subtitle">- BELGIËK -</div>
          </div>
      </div>
    </section>
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


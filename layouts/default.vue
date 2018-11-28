<template>
  <div>
    <div class="hero is-black is-bold">
    <div class="hero-body">
        <div class="container has-text-centered">
          <nuxt-link :to="'/' + $route.params.locale">
            <h1 class="title is-1 is-uppercase">Citizens for climate</h1>
          </nuxt-link>
          <div class="subtitle">Belgiëk</div>
        </div>
    </div>
    </div>
    <nuxt/>
    <CallToActions/>
    <Footer />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'
import CallToActions from '~/components/CallToActions'

export default {
  components: {
      Navbar,
      Footer,
      CallToActions
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

.citizen-message{
    padding: 40px 0 40px 0;
}

.has-top-padding{
    padding: 20px 0 0 0;
}

#mc_embed_signup_scroll .input {
    border-radius: 0;
    border: 2px #67de97 solid;
    font-family: 'Niramit', sans-serif;
    font-size: 1.2rem;
}

#mc_embed_signup_scroll .button{
    font-size: 1.2rem;

}

.contribute{
    background-color: #67de97;
}

.contribute .button{
    font-size: 1.2rem;
    border: 2px black solid;
    text-transform: none;    
}
</style>


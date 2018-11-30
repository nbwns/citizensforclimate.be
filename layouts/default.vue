<template>
  <div>
    <Header/>
    <nuxt/>
    <CallToActions/>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import CallToActions from '~/components/CallToActions'

export default {
  components: {
      Header,
      Footer,
      CallToActions
  }
}
</script>

<style>
.hero{
    background-color: white;
}

.hero .title{
  font-family: 'Fjalla One', sans-serif;
  letter-spacing: 5px;
}

.hero .subtitle{
  color: #67de97 !important;
  letter-spacing: 2px;

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


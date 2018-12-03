<template>
  <div></div>
</template>

<script>
export default {
  middleware: 'redirect',
  asyncData({params,error, store, payload}){
    return null;
  },
  head() {
    return {
      meta: [
        
        {
          hid: `og:url`,
          property: 'og:url',
          content: 'http://www.citizensforclimate.be/fr'
        }
      ]
    }
  }
}
</script>

<style>

</style>


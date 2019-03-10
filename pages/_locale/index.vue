<template>
  <div>
    <!-- <div class="content" v-html="$md.render(page.fields.body)"></div> -->
    
    <HomePage :page="page" />
  </div>
</template>

<script>
import client from '~/plugins/contentful'
import HomePage from '~/components/HomePage'

export default {
  layout: 'default',
  components: {
    HomePage
  },
  asyncData({params,error, store, payload}){
    if(payload){ 
      return {
        page: payload
      }
    }
    return client.getEntries({
      content_type: 'simplePage',
      'fields.slug': 'home',
      'locale': params.locale + "-BE"
    }).then(entries => {
      
      if(entries.items[0]){
        store.dispatch('setActivePage', entries.items[0].fields.slug)
        return {
          page : entries.items[0],
          pageRef: entries.items[0].fields.pageRef ? entries.items[0].fields.pageRef.sys.contentType.sys.id : null

        }
      }
      else{
        throw "page not found"
      }
    })
    .catch((e)=> {
      throw({ statusCode: 404, message: 'page not found' });
    })
  },
  head() {
    return {
      title: this.page.fields.title,
      meta: [
        {
          hid: `description`,
          name: 'description',
          content: 'Citizens for climate est une plateforme issue d’un mouvement citoyen spontané, né dans la foulée des récentes mobilisations massives dans le monde. Son objectif est de référencer les actions et événements qui vous permettent de vous mobiliser en masse pour le climat ! / Citizens for Climate is een platform dat is ontstaan uit een spontane burgerbeweging, geboren in de nasleep van recente massale mobilisaties overal ter wereld. Ons doel is te verwijzen naar acties en evenementen die burgers in staat stellen massaal te mobiliseren voor het klimaat!'
        },
        {
          hid: `og:title`,
          property: 'og:title',
          content: this.page.fields.title
        },
        {
          hid: `og:url`,
          property: 'og:url',
          content: 'http://www.citizensforclimate.be' + this.$route.fullPath
        },
        {
          hid: `og:image`,
          property: 'og:image',
          content: `http://www.citizensforclimate.be/facebookcover.jpg`
        },
        {
          hid: `og:description`,
          property: 'og:description',
          content: 'Citizens for climate est une plateforme issue d’un mouvement citoyen spontané, né dans la foulée des récentes mobilisations massives dans le monde. Son objectif est de référencer les actions et événements qui vous permettent de vous mobiliser en masse pour le climat ! / Citizens for Climate is een platform dat is ontstaan uit een spontane burgerbeweging, geboren in de nasleep van recente massale mobilisaties overal ter wereld. Ons doel is te verwijzen naar acties en evenementen die burgers in staat stellen massaal te mobiliseren voor het klimaat!'
        }
      ]
    }
  }
}
</script>

<style>

</style>


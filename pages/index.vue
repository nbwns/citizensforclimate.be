<template>
  <div class="container is-fluid">
       <div class="lang-chooser contribute">            
            <div class="container is-fluid has-text-centered">
                <div class="text-container">
                    <p>
                        Citizens for climate est une plateforme issue d’un mouvement citoyen spontané, né dans la foulée des récentes mobilisations massives dans le monde. Son objectif est de référencer les actions et événements qui vous permettent de vous mobiliser en masse pour le climat !
                    </p>
                    <br/>
                    <nuxt-link class="button" to="fr">Français</nuxt-link>
                    
                    <hr/>
                    <p>Citizens for Climate is een platform dat is ontstaan uit een spontane burgerbeweging, geboren in de nasleep van recente massale mobilisaties overal ter wereld. Ons doel is te verwijzen naar acties en evenementen die burgers in staat stellen massaal te mobiliseren voor het klimaat!</p>
                    <br/>
                    
                    <nuxt-link class="button" to="nl">Nederlands</nuxt-link>
                </div>                
            </div>
        </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  asyncData({params,error, store, payload}){
    return {
        page: {
            title: "Citizens for climate"
        }
    }
  },
  head() {
    return {
      title: this.page.title,
      meta: [
        {
          hid: `description`,
          name: 'description',
          content: 'Citizens for climate est une plateforme issue d’un mouvement citoyen spontané, né dans la foulée des récentes mobilisations massives dans le monde. Son objectif est de référencer les actions et événements qui vous permettent de vous mobiliser en masse pour le climat ! / Citizens for Climate is een platform dat is ontstaan uit een spontane burgerbeweging, geboren in de nasleep van recente massale mobilisaties overal ter wereld. Ons doel is te verwijzen naar acties en evenementen die burgers in staat stellen massaal te mobiliseren voor het klimaat!'
        },
        {
          hid: `og:title`,
          property: 'og:title',
          content: this.page.title
        },
        {
          hid: `og:url`,
          property: 'og:url',
          content: 'http://www.citizensforclimate.be'
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
.lang-chooser{
    padding: 40px 0 30px 0;
}
</style>


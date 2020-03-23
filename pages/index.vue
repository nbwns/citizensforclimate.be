<template>
  <div class="container is-fluid">
    <div class="loader">Loading...</div>
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
  },
  mounted() {
    const lang = localStorage.getItem('language') || 'fr';
    window.location = `/${lang}`;
  }
}
</script>

<style>
  .loader {
    position: relative;
    width: 60px;
    height: 60px;
    margin: 50px auto;
    font-size: 10px;
    text-indent: -9999em;
    border-radius: 50%;
    background: #67de97;
    background: linear-gradient(to right, #67de97 10%, rgba(255, 255, 255, 0) 42%);
    border: none;
    animation: load 1.4s infinite linear;
    transform: translateZ(0);
  }

  .loader:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 50%;
    background: #67de97;
    border-radius: 100% 0 0 0;
    content: '';
  }

  .loader:after {
    background: #ffffff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  @keyframes load {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>


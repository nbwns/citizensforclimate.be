<template>
    <footer class="footer has-background-link">
        <div class="container is-fluid">
            <div class="columns">
                <div class="column is-one-third">
                    <h3 class="is-uppercase has-text-white has-text-weight-bold">Catégories</h3>  
                    
                </div>

                <div class="column is-one-third">
                    <h3 class="is-uppercase has-text-white has-text-weight-bold">Infos</h3>  
                    <ul v-if="$route.params.locale === 'fr'">
                        <li><a class="has-text-white" href="/fr/a-propos">À propos</a></li>
                        <li><a class="has-text-white" href="/fr/mentions-legales">Mentions légales</a></li>
                    </ul>
                    <ul v-if="$route.params.locale === 'nl'">
                        <li><a class="has-text-white" href="/nl/over-ons">Over ons</a></li>
                        <li><a class="has-text-white" href="/nl/disclaimer">Disclaimer</a></li>
                    </ul>
                    
                </div>

                <div class="column is-one-third">
                    <h3 class="is-uppercase has-text-white has-text-weight-bold">Nous suivre</h3>  
                    <ul>
                      <li>
                        <a href="mailto:hello@citizensforclimate.be" target="_blank" class="has-text-white">
                          hello@citizensforclimate.be
                        </a>
                      </li>
                      <li>
                        <a href="https://www.facebook.com/citizensforclimate.be" target="_blank" class="has-text-white">
                          Facebook
                        </a>
                      </li>
                      <li>
                        <a v-if="$route.params.locale === 'fr'" href="https://www.citizensforclimate.be/fr/feed.xml" class="has-text-white">
                          RSS
                        </a>
                        <a v-if="$route.params.locale === 'nl'" href="https://www.citizensforclimate.be/nl/feed.xml" class="has-text-white">
                          RSS
                        </a>
                      </li>
                    </ul>
                    <p class="credits">
                        <a href="https://www.contentful.com/" rel="nofollow" target="_blank"><img src="//images.ctfassets.net/fo9twyrwpveg/7F5pMEOhJ6Y2WukCa2cYws/398e290725ef2d3b3f0f5a73ae8401d6/PoweredByContentful_DarkBackground.svg" style="max-width:100px;width:100%;" alt="Powered by Contentful" /></a>
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import translate from '~/plugins/translations'

export default{
    methods: {
        t(key){
            return translate(this.$route.params.locale, key)
        }
  }
}
</script>

<style scoped>
    a {
        transition: all 0.1s;
    }

    a:hover {
        transition: all 0.2s;
    }

    .links{
        display:flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .credits{
      margin-top: auto;
    }

</style>

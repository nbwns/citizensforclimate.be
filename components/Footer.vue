<template>
    <footer class="footer has-background-black has-text-white">
        <div class="container is-fluid">
            <div class="columns">
                <div class="column is-half links">
                    <ul v-if="$route.params.locale === 'fr'">
                        <li class="is-size-4 is-uppercase"><a href="/fr/a-propos">À propos</a></li>
                        <li class="is-size-4 is-uppercase"><a href="/fr/mentions-legales">Mentions légales</a></li>
                    </ul>
                    <ul v-if="$route.params.locale === 'nl'">
                        <li class="is-size-4 is-uppercase"><a href="/nl/over-ons">Over ons</a></li>
                        <li class="is-size-4 is-uppercase"><a href="/nl/disclaimer">Disclaimer</a></li>
                    </ul>
                    <ul class="social-links">
                      <li>
                        <a href="https://www.facebook.com/citizensforclimate.be" target="_blank" class="social-link">
                          <img src="~/assets/images/facebook.png" class="social-icon"/>
                        </a>
                      </li>
                      <li>
                        <a v-if="$route.params.locale === 'fr'" href="https://www.citizensforclimate.be/fr/feed.xml" class="social-link">
                          <img src="~/assets/images/rss.svg" class="social-icon"/>
                        </a>
                        <a v-if="$route.params.locale === 'nl'" href="https://www.citizensforclimate.be/nl/feed.xml" class="social-link">
                          <img src="~/assets/images/rss.svg" class="social-icon"/>
                        </a>
                      </li>
                    </ul>
                    <p class="credits">
                        <a href="https://www.contentful.com/" rel="nofollow" target="_blank"><img src="//images.ctfassets.net/fo9twyrwpveg/7F5pMEOhJ6Y2WukCa2cYws/398e290725ef2d3b3f0f5a73ae8401d6/PoweredByContentful_DarkBackground.svg" style="max-width:100px;width:100%;" alt="Powered by Contentful" /></a>
                    </p>
                </div>

                <div class="column">
                    <div class="content is-size-4">
                        <p>{{t("footer-text")}}</p>
                        <p>
                            <a class="has-text-weight-bold" href="mailto:hello@citizensforclimate.be">hello@citizensforclimate.be</a>
                        </p>
                    </div>
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
        color: white;
        transition: all 0.1s;
    }

    a:hover {
        color: #67de97 ;
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

    .social-links {
      display: flex;
    }

    .social-link {
      margin-right: 10px;
    }

    .social-icon {
      width: 40px;
    }
</style>

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
                    <p>
                        <a href="https://www.facebook.com/citizensforclimate.be" target="_blank">
                            <img src="~/assets/images/facebook.png"/>
                        </a>
                    </p>
                    <p class="credits">
                        Graphics: <a href="http://www.emisakurai.com/" target="_blank">Emi Sakurai</a><br/>
                        Website: <a href="https://www.linkedin.com/in/nicolasbauwens" target="_blank">Nicolas Bauwens</a>
                    </p>
                </div>
                
                <div class="column">
                    <div class="content is-size-4">
                        <p>{{t("footer-text")}}</p>
                        <p>
                            <a class="has-text-weight-bold" href="mailto:rise@citizensforclimate.be">hello@citizensforclimate.be</a>
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
</style>
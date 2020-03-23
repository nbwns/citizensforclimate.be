<template>
    <div class="hero">
        <div class="lang-selector">
            <nuxt-link v-if="$route.params.locale" :to="'/' + (newLang)" :class="{'is-white': $route.params.slug}" @click.native='changeLanguage(newLang)'>
                {{newLang.toUpperCase()}}
            </nuxt-link>
        </div>
        <div class="hero-body" :class="{'bg-black': $route.params.slug, 'bg-blue': $route.params.locale}">
            <div class="container has-text-centered">
            <nuxt-link :to="($route.params.locale ? '/' + $route.params.locale : '')">
                <div class="logo" :class="{'is-white': $route.params.slug}">
                    <div class="logo-title">Citizens for Climate</div>
                    <div class="logo-sub">Belgium</div>
                </div>
                <!-- <img src="~/assets/images/Citizens_for_climate_logo_300px.png" alt="Citizens for climate"/> -->
            </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
      changeLanguage (newLang) {
        localStorage.setItem('language', newLang);
      }
    },
    computed: {
      newLang: function () {
        return this.$route.params.locale == 'fr' ? 'nl' : 'fr'
      }
    }
}
</script>

<style lang='scss'>
    .lang-selector a, .lang-selector a:hover{
        color: black;
    }
    .hero{
        position: relative;
        background-color: white;
        color: black;
        height: 250px;
        .bg-blue{
            background-color: #64D7DE;
        }
        .bg-black{
            background-color: black;
        }
        .lang-selector {
            position: absolute;
            top: 20px;
            right: 30px;
            color: black;
            font-size: 18px;
            font-weight: bold;
        }
        .hero-body {
            display: flex;
            align-items: center;
        }
    }
    .logo {
        font-family: 'Fjalla One', sans-serif;
        font-size: 48px;
        color: black;
        text-transform: uppercase;
        .logo-sub {
            font-family: 'Niramit', sans-serif;
            font-size: 20px;
            letter-spacing: 4px;
        }
    }
    .is-white {
        color: white !important;
    }
</style>

<template>
    <div class="hero">
        <div class="lang-selector" v-if="$route.path !== '/'">
            <nuxt-link v-if="$route.params.locale" :to="'/' + (newLang)" @click.native='changeLanguage(newLang)'>
                {{newLang.toUpperCase()}}
            </nuxt-link>
        </div>
        <div class="hero-body">
            <div class="container has-text-centered">
            <nuxt-link :to="($route.params.locale ? '/' + $route.params.locale : '')">
                <div class="logo">
                    <div class="logo-title">Mon Agenda Climat</div>
                    <div class="logo-sub">Actions et ressources pour te permettre de participer à la transition climatique. Ce qui se fait en Belgique pour agir contre le changement climatique</div>
                </div>
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

        height: 250px;

        .lang-selector {
            position: absolute;
            top: 20px;
            right: 30px;
            padding: 10px;

        }
        .hero-body {
            display: flex;
            align-items: center;
        }
    }
    .logo {
        
        .logo-sub {
            font-size: 20px;
            letter-spacing: 4px;
        }
    }

</style>

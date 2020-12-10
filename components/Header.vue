<template>
    
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="container is-widescreen">
            <div class="navbar-brand">
                <nuxt-link :to="($route.params.locale ? '/' + $route.params.locale : '')" class="navbar-brand">
                    Climagenda
                </nuxt-link>
                <span class="navbar-item">
                    <div class="control">
                        <input class="input is-hovered" type="text" placeholder="Recherche un truc">
                        <span class="icon is-small is-right">
                            <i class="fas fa-check"></i>
                        </span>
                    </div>
                </span>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-end">
                    <a class="navbar-item">
                        Ressources
                    </a>

                    <a class="navbar-item">
                        Ajoute ton action
                    </a>

                    <div class="navbar-item" v-if="$route.path !== '/'">
                        <nuxt-link v-if="$route.params.locale" :to="'/' + (newLang)" @click.native='changeLanguage(newLang)'>
                            {{newLang.toUpperCase()}}
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </nav>
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

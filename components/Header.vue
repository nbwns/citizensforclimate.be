<template>
    <div class="hero">
        <div class="lang-selector">
            <nuxt-link :to="'/' + ($route.params.locale == 'fr' ? 'nl' : 'fr' )">
                {{$route.params.locale == 'fr' ? 'NL' : 'FR'}}
            </nuxt-link>
        </div>
        <div class="hero-body">
            <div class="container has-text-centered">
            <nuxt-link :to="'/' + $route.params.locale">
                <img src="~/assets/images/Citizens_for_climate_logo_300px.png" alt="Citizens for climate"/>
            </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    .lang-selector{
        display: flex;
        align-self: flex-end;
        padding: 5px 5px 0 0;
        color: black;
    }

    .lang-selector a, .lang-selector a:hover{
        color: black;
    }
</style>

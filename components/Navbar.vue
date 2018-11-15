<template>
    <nav class="navbar is-primary">
        <div class="container">
        <div class="navbar-brand">
            <a class="navbar-item" href="#" style="font-weight:bold;">
                Citizens for climate
            </a>
            <span class="navbar-burger burger" data-target="navMenu">
                <span></span>
                <span></span>
                <span></span>
            </span>
            </div>
            <div id="navMenu" class="navbar-menu">
                <div class="navbar-end">
                    <nuxt-link to="/fr/accueil" class="navbar-item">Accueil</nuxt-link>
                    <nuxt-link to="/fr/a-propos" class="navbar-item">À propos</nuxt-link>
                    <nuxt-link to="/fr/actions" class="navbar-item">Actions</nuxt-link>
                    <nuxt-link to="/fr" class="navbar-item">FR</nuxt-link>
                    <nuxt-link to="/fr" class="navbar-item">NL  </nuxt-link>

                    <!-- <a :href="locale + '/' + page.fields.slug" class="navbar-item" 
                        v-for="page in pages" :key="page.fields.slug">
                        {{page.fields.title}}
                    </a> -->
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default{
    props: ['pages']
}
</script>

<style scoped>
</style>
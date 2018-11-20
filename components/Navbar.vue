<template>
    <nav class="navbar">
        <div class="container">
        <div class="navbar-brand">
            <nuxt-link class="navbar-item" :to="'/' + $route.params.locale">
                Citizens for climate
            </nuxt-link>
            <span class="navbar-burger burger" data-target="navMenu">
                <span></span>
                <span></span>
                <span></span>
            </span>
            </div>
            <div id="navMenu" class="navbar-menu">
                <div class="navbar-end">
                    <nuxt-link :to="'/'+$route.params.locale + '/' + navItem.fields.slug[locale]" 
                        :class="{'navbar-item': true, 'is-active': $store.state.activePage === navItem.fields.slug[locale]}" 
                        v-for="navItem in navItems" 
                        :key="navItem.fields.slug[locale]">
                        {{navItem.fields.title[locale]}}
                    </nuxt-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default{
    computed: {
        navItems () {
            return this.$store.state.navigationItems
        },
        locale () {
            return this.$route.params.locale+"-BE"
        }
    }
}
</script>

<style scoped>
</style>
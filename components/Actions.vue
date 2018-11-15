<template>
    <section>
        <div v-for="action in actions" :key="action.id">
            <small class="title is-5">{{action.fields.tag}}</small>
            <h2 class="title is-2">{{action.fields.name}}</h2>
            <p>
                {{action.fields.introductionText}}
            </p>
            <nuxt-link class="button is-primary" :to="{path:'/'+$route.params.locale+'/action/'+action.fields.slug}">{{action.fields.callToAction}}</nuxt-link>
        </div>
    </section>
</template>

<script>
import client from '~/plugins/contentful'

export default{
    data () {
        return {
            actions: [],
            loading: true
        }
    },
    mounted(){
        if(this.$route.params.locale){
            return client.getEntries({
                content_type: 'action',
                'locale':this.$route.params.locale+ "-BE"
            })
            .then(entries => {
                console.log(entries.items)
                this.actions = entries.items
                this.loading = false
            })
            .catch(console.error)
        }
        
    }
}
</script>

<style scoped>
</style>
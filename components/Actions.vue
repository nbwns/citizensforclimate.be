<template>
    <section>
        <div class="columns">
            <div class="column is-one-third action highlight" v-for="action in highlightActions" :key="action.id">
                <small class="action-tag">{{action.fields.tag}}</small>
                <h2 class="title is-4">{{action.fields.name}}</h2>
                <p>
                    {{action.fields.introductionText}}
                </p>
                <nuxt-link class="button" :to="{path:'/'+$route.params.locale+'/action/'+action.fields.slug}">Dites m'en plus</nuxt-link>                
                <a v-if="action.fields.link" class="button is-primary" :href="action.fields.link" target="_blank">{{action.fields.callToAction}}</a>
            </div>
        </div>
        <div class="columns">
            <div class="column is-10 is-offset-4">
                 <div class="columns is-multiline">
                    <div  class="column is-one-quarter action" v-for="action in normalActions" :key="action.id">
                        <small class="action-tag">{{action.fields.tag}}</small>
                        <h2 class="title is-5">{{action.fields.name}}</h2>
                        <p>
                            {{action.fields.introductionText}}
                        </p>
                        <nuxt-link class="button" :to="{path:'/'+$route.params.locale+'/action/'+action.fields.slug}">{{action.fields.callToAction}}</nuxt-link>
                        <a v-if="action.fields.link" class="button is-primary" :href="action.fields.link" target="_blank">{{action.fields.callToAction}}</a>
                    </div>
                </div>
            </div>
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
    computed: {
        highlightActions () {
            return this.actions.filter(action => {
                return action.fields.highlight == true
            })
        },
        normalActions () {
            return this.actions.filter(action => {
                return action.fields.highlight == false
            })
        }
    },
    mounted(){
        if(this.$route.params.locale){
            return client.getEntries({
                content_type: 'action',
                'locale':this.$route.params.locale+ "-BE",
                'order': '-sys.updatedAt'
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
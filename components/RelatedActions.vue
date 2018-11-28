<template>
    <div>
        <div class="title-box is-uppercase has-text-centered">
            <h2 class="subtitle has-text-black is-size-5">{{categoryId ? t("related-actions") : t("highlighted-actions") }}</h2>
        </div>
        <div v-for="action in actions" :key="action.sys.id">
            <Action :action="action" className="related"/>
        </div>
    </div>
</template>

<script>
import client from '~/plugins/contentful'
import translate from '~/plugins/translations'
import Loader from '~/components/Loader'
import Action from '~/components/Action'

export default {
    props: ['categoryId', 'excludeId'],
    components: {
        Loader,
        Action
    },
    data () {
        return {
            actions: [],
            loading: true
        }
    },
    methods: {
        t(key){
            return translate(this.$route.params.locale, key)
        }
    },
    mounted(){
        if(this.$route.params.locale){
            let query = {
                content_type: 'action',
                'locale': this.$route.params.locale + "-BE",
                'order': 'fields.sortOrder,fields.name',
                'limit' : 3
            }

            if(this.categoryId){
                query['fields.categories.sys.id'] = this.categoryId
            }
            else{
                query['fields.highlight'] = true
            }

            if(this.excludeId){
                query['sys.id[ne]'] = this.excludeId
            }

            return client.getEntries(query)
            .then(entries => {
                console.log(entries)
                this.actions = entries.items
                this.loading = false
            })
            .catch((e)=> {
            throw({ statusCode: 404, message: 'page not found' });
            })
        }
    }
}
</script>

<style>
.title-box {
    background-color: #67de97;
}

.title-box h2 {
    font-family: 'Fjalla One', sans-serif;
    letter-spacing: 1px;
    padding: 1.3rem;
}
</style>

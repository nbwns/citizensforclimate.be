<template>
    <div :class="['has-background-white', 'action', className]">
        <small class="action-meta has-text-grey is-size-6">{{action.fields.tag}}</small>
        <small class="action-meta action-date is-size-6">{{formatDate(action.fields.start)}}</small>
        <h3 class="title is-3 has-text-weight-normal has-text-black">{{action.fields.name}}</h3>
        <p>
            {{action.fields.introductionText}}
        </p>
        <div class="buttons">
            <a class="button is-primary" target="_blank" :href="action.fields.link">{{action.fields.callToAction}}</a>
            <nuxt-link class="button is-uppercase" :to="{path:'/'+$route.params.locale+'/action/'+action.fields.slug}">{{t('read-more')}}</nuxt-link>
        </div>
    </div> 
</template>

<script>
import moment from 'moment-with-locales-es6'
import translate from '~/plugins/translations'

export default {
    props: ['action', 'className'],
    methods: {
        formatDate(date) {
            if(date){
                let momentDate = moment(date);
                let format = "dddd D MMM YYYY";
                if(momentDate.hour() > 0){
                    format += " - HH:mm"
                }
                return moment(date).format(format)
            }
            else{
                return ''
            }
        },
        t(key){
            return translate(this.$route.params.locale, key)
        }
    },
    mounted(){
        moment.locale(this.$route.params.locale)
    }



}
</script>

<style>

</style>

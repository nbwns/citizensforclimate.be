<template>
    <div :class="['has-background-white', 'action', className]">
        <small class="action-meta has-text-grey is-size-6">{{action.fields.tag}}</small>
        <small class="action-meta action-date is-size-6">{{formatDate(action.fields.start)}}</small>
        <h3 class="title is-3 has-text-weight-normal has-text-black">{{action.fields.name}}</h3>
        <p>
            {{action.fields.introductionText}}
        </p>
        <nuxt-link  class="button" :to="{path:'/'+$route.params.locale+'/action/'+action.fields.slug}">{{action.fields.callToAction}}</nuxt-link>
    </div> 
</template>

<script>
import moment from 'moment-with-locales-es6'

export default {
    props: ['action', 'className'],
    methods: {
        formatDate(date) {
            if(date){
                let momentDate = moment(date);
                let format = "dddd D MMMM YYYY";
                if(momentDate.hour() > 0){
                    format += " - HH:mm"
                }
                return moment(date).format(format)
            }
            else{
                return ''
            }
        }
    },
    mounted(){
        moment.locale(this.$route.params.locale)
        console.log(this.className)
    }



}
</script>

<style>

</style>

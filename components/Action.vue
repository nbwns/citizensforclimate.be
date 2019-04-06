<template>
    <div :class="['has-background-white', 'action', className]" v-if="action.fields.name">
        <small class="action-meta has-text-grey is-size-6">{{action.fields.tag}}</small>
        <small class="action-meta action-date is-size-6">{{formatDate(action.fields.start)}}</small>
        <h3 class="title is-3 has-text-weight-normal has-text-black">{{action.fields.name}}</h3>
        <p>
            {{action.fields.introductionText}}
        </p>
        <div class="catego-list">
            <a href="" class="button-category"></a>
            <a href="" class="button-category"></a>
            <a href="" class="button-category"></a>
            <!-- <p v-for="(cat, i) in action.fields.categories" :key="i">
                <span v-if="cat.fields">{{ cat.fields.color }}</span>
            </p> -->
        </div>
        <div class="buttons">
            <a class="button is-primary" target="_blank" :href="action.fields.link">{{action.fields.callToAction}}</a>
            <nuxt-link class="button is-uppercase" target="_blank" :to="{path:'/'+$route.params.locale+'/action/'+action.fields.slug}">{{t('read-more')}}</nuxt-link>
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
                let momentDate = moment(date)
                momentDate.locale(this.$route.params.locale)
                let format = "dddd D MMM YYYY"
                if(momentDate.hour() > 0){
                    format += " - HH:mm"
                }
                return momentDate.format(format)
            }
            else{
                return ''
            }
        },
        t(key){
            return translate(this.$route.params.locale, key)
        }
    }
}
</script>

<style lang="scss">
.action {
    padding: 20px;
    justify-content: space-evenly;
    small, p {
        margin-bottom: .6em;
    }
    small {
        line-height: 1.2em;
    }
    .buttons {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 0;
    }
}
.catego-list {
    width: 100%;
    height: 15px;
    margin: 10px 0;
    margin-top: auto;
    a.button-category {
        display: inline-block;
        width: 15px;
        height: 15px;
        background: #000;
        border-radius: 50%;
        color: white;
        margin: 0 2px;
        &:first-child {
            margin-left: 0;
        }
        &:last-child {
            margin-right: 0;
        }
    }
}


</style>

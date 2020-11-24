<template>
    <div :class="['card', className]" v-if="action.fields.name">
        <div class="card-image">
            <figure class="image is-4by3">
                <img v-if="action.fields.image" :src="action.fields.image.fields.file.url" :title="action.fields.image.fields.title">
            </figure>
        </div>
        <div class="card-content">
            <div class="media-content">
                <nuxt-link class="title is-3 has-text-weight-normal has-text-black" target="_blank" :to="{path:'/'+$route.params.locale+'/action/'+action.fields.slug}">{{action.fields.name}}</nuxt-link>
                <a :key="keyword" v-for="keyword in action.fields.keywords">{{keyword}}</a>
            </div>
            <div class="content">
                <small class="action-meta action-date is-size-6" v-if="action.fields.start && !action.fields.end">{{t("date-start-only")}} {{formatDate(action.fields.start)}}</small>
                <small class="action-meta action-date is-size-6" v-else-if="action.fields.end && !action.fields.start">{{t("date-end-only")}} {{formatDate(action.fields.end)}}</small>
                <small class="action-meta action-date is-size-6" v-else-if="action.fields.start === action.fields.end">{{formatDate(action.fields.start)}}</small>
                <small class="action-meta action-date is-size-6" v-else>{{t("date-start")}} {{formatDate(action.fields.start)}} {{t("date-end")}} {{formatDate(action.fields.end)}}</small>
                <!-- <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> -->
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment-with-locales-es6'
import translate from '~/plugins/translations'

export default {
    data() {
        return {
            actionsOffset: Number
        }
    },
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
        },
        selectCategory(id, color) {
            if (id == this.selected) {
                this.selected = null
            } else {
                this.selected = id
                this.bgColor = color //add the bgcolor when click
            }
            this.$emit("categoryChanged", this.selected)
            this.scrollTop(this.actionsOffset)
        },
        scrollTop(offset){
            window.scrollTo({
                top: offset,
                left: 0,
                behavior: 'smooth'
            })
        },
        handleResize(){
            this.actionsOffset = document.getElementById('actions-section').offsetParent.offsetTop + document.querySelector('.title-head').offsetHeight
        }
    },
    mounted() {
        if ( !this.$route.params.slug ) {
            this.actionsOffset = document.getElementById('actions-section').offsetParent.offsetTop + document.querySelector('.title-head').offsetHeight
        }
    }
}
</script>

<style lang="scss">
.action {
    position: relative;
    padding: 20px;
    overflow: visible;

    small, p {
        margin-bottom: .6em;
    }
    small {
        line-height: 1.2em;
    }

    .highlight {
        
    }
}



</style>

<template>
    <div :class="['has-background-white', 'action', className]" v-if="action.fields.name">
        <div v-if="className">
            <img v-if="action.fields.categories[0].fields.picto.fields.file" :src="action.fields.categories[0].fields.picto.fields.file.url" :alt="action.fields.categories[0].fields.picto.fields.title + '-icon'" class="picto-highlight">
        </div>
        <small class="action-meta has-text-grey is-size-6">{{action.fields.tag}}</small>
        <small class="action-meta action-date is-size-6">{{formatDate(action.fields.start)}}</small>
        <h3 class="title is-3 has-text-weight-normal has-text-black">{{action.fields.name}}</h3>
        <p>
            {{action.fields.introductionText}}
        </p>
        <div v-if="!$route.params.slug && !className" class="catego-list">
            <a  v-for="(cat, i) in action.fields.categories" :key="i" @click="selectCategory(cat.sys.id)" >
                <span v-if="cat.fields" class="button-category" :style="{backgroundColor: cat.fields.color}">
                </span>
            </a>
        </div>
        <div v-else-if="$route.params.slug" class="catego-list">
            <span v-for="(cat, i) in action.fields.categories" :key="i">
                <span v-if="cat.fields" class="button-category" :style="{backgroundColor: cat.fields.color}">
                </span>
            </span>
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
            this.actionsOffset = document.getElementById('actions-section').offsetParent.offsetTop + document.querySelector('.action-head').offsetHeight
        }
    },
    mounted() {
        if ( !this.$route.params.slug ) {
            this.actionsOffset = document.getElementById('actions-section').offsetParent.offsetTop + document.querySelector('.action-head').offsetHeight
        }
    }
}
</script>

<style lang="scss">
.action {
    position: relative;
    padding: 20px;
    justify-content: space-evenly;
    overflow: visible;
    
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
    .picto-highlight {
        height: 80px;
        width: 80px;
        padding: 5px;
        border: 3px solid black;
        border-radius: 50%;
        box-sizing: border-box;
        background-color: white;
        position: absolute;
        top: -38px;
        right: 10px;
    }
    &.highlight {
        small.action-meta.has-text-grey {
            padding-right: 70px;
        }
    }
}
.catego-list {
    width: 100%;
    height: 15px;
    margin: 10px 0;
    margin-top: auto;
    span.button-category {
        display: inline-block;
        width: 15px;
        height: 15px;
        background: #000;
        border-radius: 50%;
        color: white;
    }
    a, span {
        margin: 0 3px;
        &:first-child {
            margin-left: 0;
        }
        &:last-child {
            margin-right: 0;
        }
    }
}


</style>

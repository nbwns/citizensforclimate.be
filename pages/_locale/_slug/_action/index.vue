<template>
  <div>
    <div class="light-blue-background">
      <div class="container is-fluid">
        <div class="columns" >
          <div class="column is-two-thirds">
            <div class="action-detail has-background-white">
              <figure>
                <img v-if="action.fields.image" :src="action.fields.image.fields.file.url" :title="action.fields.image.fields.title">
            </figure>
              <span>{{action.fields.categories[0].fields.name}}</span>
              <h1 class="title has-text-weight-normal is-3 is-uppercase">{{action.fields.name}}</h1>
              <div>Organisé par <a :key="org.sys.id" v-for="org in action.fields.organizers" :href="org.fields.website">{{org.fields.name}}</a> </div>
              <div class="content is-size-5" v-html="actionBody"></div>
              <a class="button is-primary is-size-4" v-if="action.fields.link" :href="action.fields.link">Vers le site de l'organisateur</a>
            </div>
          </div>
          <div class="column">
               <div class="info-block" v-if="action.fields.start || action.fields.end">
                  <p class="is-uppercase label">
                    {{t("date-when")}}
                  </p>
                  <p class="is-uppercase" v-if="action.fields.start && !action.fields.end">{{t("date-start-only")}} {{formatDate(action.fields.start)}}</p>
                  <p class="is-uppercase" v-else-if="action.fields.end && !action.fields.start">{{t("date-end-only")}} {{formatDate(action.fields.end)}}</p>
                  <p class="is-uppercase" v-else-if="action.fields.start === action.fields.end">{{formatDate(action.fields.start)}}</p>
                  <p class="is-uppercase" v-else>{{t("date-start")}} {{formatDate(action.fields.start)}} {{t("date-end")}} {{formatDate(action.fields.end)}}</p>
                </div>

                <div class="info-block">
                  <p class="is-uppercase label">
                      {{t("address")}}
                  </p>
                  <p>
                      <template v-if="action.fields.locationsList">
                        <div v-for="location in action.fields.locationsList" :key="location.sys.id">
                          <a v-if="location.fields.locationGeo"
                          :href="'https://www.openstreetmap.org/directions?from=&to='+location.fields.locationGeo.lat+'%2C'+location.fields.locationGeo.lon+'#map=17/'+location.fields.locationGeo.lat+'/'+location.fields.locationGeo.lon"
                          target="_blank">{{location.fields.locationLongDescription}}</a>
                          <span v-else>{{location.fields.locationLongDescription}}</span>
                          <div v-html="location.fields.locationLongDescription"></div>
                        </div>
                      </template>
                  </p>
                </div>
          </div>
        </div>
      </div>
    </div>
    <RelatedActions :categoryId="categoryId" :excludeId="action.sys.id"/>
  </div>
</template>

<script>
//import client from '~/plugins/contentful'
const client = require('~/plugins/contentful')
import translate from '~/plugins/translations'
import moment from 'moment-with-locales-es6'
import marked from 'marked'
import RelatedActions from '~/components/RelatedActions'

export default {
  components: {
    RelatedActions
  },
  data () {
    return {
      categoryId: null
    }
  },
  computed: {
    actionBody: function () {
      return marked(this.action.fields.body)
    }
  },
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
  },
  asyncData({params,error, route}){
    moment.locale(route.params.locale)
    return client.getEntries({
      content_type: 'action',
      'fields.slug': params.action,
      'locale': params.locale + "-BE"
    }).then(entries => {
      console.log(entries.items[0])
      console.log(entries.items[0].fields.categories[0])
      if(entries.items[0]){
        let catId = null;
        if(entries.items[0].fields.categories.length > 0){
          catId = entries.items[0].fields.categories[0].sys.id
        }
        return {
          action : entries.items[0],
          categoryId: catId
        }
      }
      else{
        throw "page not found"
      }
    })
    .catch((e)=> {
      throw({ statusCode: 404, message: 'page not found' });
    })
  },
   head() {
    return {
      title: this.action.fields.name,
      meta: [
        {
          hid: `description`,
          name: 'description',
          content: this.action.fields.name.introductionText
        },
        {
          hid: `og:title`,
          property: 'og:title',
          content: this.action.fields.name
        },
        {
          hid: `og:url`,
          property: 'og:url',
          content: 'http://www.citizensforclimate.be' + this.$route.fullPath
        },
        {
          hid: `og:image`,
          property: 'og:image',
          content: (this.action.fields.image ? this.action.fields.image.fields.file.url + '?w=1200&h=630' : `http://www.citizensforclimate.be/facebookcover.jpg`)
        },
        {
          hid: `og:description`,
          property: 'og:description',
          content: this.action.fields.name.introductionText
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  h1 {
      font-family: 'Fjalla One', sans-serif;
      letter-spacing: 1px;
  }

  .columns{
    padding: 100px 0 50px 0;
  }

  .action-detail{
    position: relative;
    padding: 20px;
    padding-top: 50px;
  }

   .action-detail a:not(.button){
    color: black;
    text-decoration: underline;
    transition: all 0.5s;
  }

   .action-detail a:not(.button):hover{
    color: #67de97;
    text-decoration: underline;
    transition: all 0.5s;
  }
  .action-detail-picto {
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    height: 90px;
    width: 90px;
    padding: 5px;
    border: 3px solid;
    border-radius: 50%;
  }

  .info-block{
    margin-top: 20px;
    word-wrap: break-word;
  }

  .label{
    font-family: 'Fjalla One', sans-serif;
    letter-spacing: 1px;
    color: #67de97;
    font-weight: normal;
  }

  .gradient-text {
    background: linear-gradient(to bottom, #67de97 0%, #000000 40%);
    -webkit-background-clip: text;
	  -webkit-text-fill-color: transparent;
  }

  .see-all-actions{
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.2rem;
    cursor: pointer;
    display:flex;
    align-items: center;
    justify-content: flex-start;
    margin: 15px 0 0 0;
  }

  .see-all-actions img{
      align-self: left;
  }
  .see-all-actions span{
      padding: 0 0 0 10px;
  }
  @media screen and (min-width: 1088px){
    .container.is-fluid.pratical-info {
      margin-left: 0px;
      margin-right: 0px;
    }
  }
</style>


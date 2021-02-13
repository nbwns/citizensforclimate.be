<template>
  <div>
    <div class="has-background-light">
      <section class="section">
        <div class="container is-fluid">
          <div class="columns is-8 is-variable" >
            <div class="column is-two-thirds">
              <div>
                <figure class="image is-3by1">
                  <img v-if="action.fields.image" :src="action.fields.image.fields.file.url+'?w=720&h=240&fit=crop'" :title="action.fields.image.fields.title">
                </figure>
                <span class="is-large">{{action.fields.categories[0].fields.name}}</span>
                <h1 class="title has-text-weight-normal is-3 is-uppercase">{{action.fields.name}}</h1>
                <div class="pb-6">Organisé par <span :key="org.sys.id" v-for="org in action.fields.organizers" class="pr-1"><a :href="org.fields.website">{{org.fields.name}}</a></span> </div>
                <div class="has-background-white content is-size-5 p-5">
                  <div v-html="actionBody"></div>
                  <div class="pt-6">
                    <a class="button is-primary is-size-4" v-if="action.fields.link" :href="action.fields.link">Vers le site de l'organisateur</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
                <div class="has-background-white p-5 mt-0">
                  <div v-if="action.fields.start || action.fields.end">
                      <strong>
                        {{t("date-when")}}
                      </strong>
                      <p v-if="action.fields.start && !action.fields.end">{{t("date-start-only")}} {{formatDate(action.fields.start)}}</p>
                      <p v-else-if="action.fields.end && !action.fields.start">{{t("date-end-only")}} {{formatDate(action.fields.end)}}</p>
                      <p v-else-if="action.fields.start === action.fields.end">{{formatDate(action.fields.start)}}</p>
                      <p v-else>{{t("date-start")}} {{formatDate(action.fields.start)}} {{t("date-end")}} {{formatDate(action.fields.end)}}</p>
                    </div>

                    <div class="pt-5">
                      <strong>
                          {{t("address")}}
                      </strong>
                      <p>
                          <template v-if="action.fields.locationsList">
                            <div v-for="location in action.fields.locationsList" :key="location.sys.id">
                              <a v-if="location.fields.locationGeo"
                              :href="'https://www.openstreetmap.org/directions?from=&to='+location.fields.locationGeo.lat+'%2C'+location.fields.locationGeo.lon+'#map=17/'+location.fields.locationGeo.lat+'/'+location.fields.locationGeo.lon"
                              target="_blank">{{location.fields.locationLongDescription}}</a>
                              <span v-else>{{location.fields.locationLongDescription}}</span>
                            </div>
                          </template>
                      </p>
                    </div>

                    <div class="pt-5">
                      <strong>
                            {{t("share")}}
                      </strong>
                      <p>social icons here</p>
                    </div>

                    <div class="pt-5">
                      <strong>
                            {{t("keyword")}}
                      </strong>
                      <div class="tags">
                          <span class="tag is-link" :key="keyword" v-for="keyword in action.fields.keywords"><a class="has-text-white">{{keyword}}</a></span>
                      </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="has-background-white">
        <RelatedActions :categoryId="categoryId" :excludeId="action.sys.id"/>
    </div>
    <div class="has-background-link-light">
        <RelatedActions :categoryId="categoryId" :excludeId="action.sys.id"/>
    </div>
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

</style>


<template>
  <div>
    <div class="has-background-grey-lighter">
      <div class="container is-fluid">
        <div class="columns" >
          <div class="column is-two-thirds">
            <div class="action-detail has-background-white">
              <h1 class="title has-text-weight-normal is-3 is-uppercase">{{action.fields.name}}</h1>
              <small class="action-meta has-text-grey is-size-6">{{action.fields.promoter}}</small>
              <div class="content is-size-5" v-html="$md.render(action.fields.body)"></div>
              <a class="button is-size-4" v-if="action.fields.link" :href="action.fields.link">{{action.fields.callToAction}}</a>              
              <div class="container is-fluid pratical-info">
                <div class="columns">
                    <div class="column is-half" v-if="action.fields.start || action.fields.end">
                        <div class="info-block" v-if="action.fields.start">
                          <p class="is-uppercase label">
                              Début
                          </p>
                          <p class="is-uppercase">
                              {{formatDate(action.fields.start)}}
                          </p>
                        </div>
                        <div class="info-block" v-if="action.fields.end">
                          <p class="is-uppercase label">
                              Fin
                          </p>
                          <p class="is-uppercase">
                              {{formatDate(action.fields.end)}}
                          </p>
                        </div>
                    </div>
                    <div class="column" v-if="action.fields.localisationDescription || action.fields.link">
                        <div class="info-block" v-if="action.fields.localisationDescription">
                          <p class="is-uppercase label">
                              Adresse
                          </p>
                          <p>
                              <a v-if="action.fields.localisationGeo" 
                                :href="'https://www.openstreetmap.org/#map=17/'+action.fields.localisationGeo.lat+'/'+action.fields.localisationGeo.lon" 
                                target="_blank">{{action.fields.localisationDescription}}</a>
                          </p>
                        </div>
                        <div class="info-block"  v-if="action.fields.link">
                          <p class="is-uppercase label">
                              Infos
                          </p>
                          <p>
                              <a :href="action.fields.link" target="_blank">{{action.fields.link}}</a>
                          </p>
                        </div>
                    </div>
                </div>
              </div>  
            </div>
            <nuxt-link class="see-all-actions has-text-black" :to="'/'+ $route.params.locale">
              <img src="~/assets/images/white-arrow.png" /> <span>Toutes les actions</span>
            </nuxt-link>
          </div>
          <div class="column">
            <RelatedActions :categoryId="categoryId" :excludeId="action.sys.id"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import client from '~/plugins/contentful'
import moment from 'moment-with-locales-es6'
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
  head () {
    return {
      title: this.action.fields.name
    }
  }
}
</script>

<style scoped>
  h1 {
      font-family: 'Fjalla One', sans-serif;
      letter-spacing: 1px;
  }

  .columns{
    padding: 50px 0 50px 0;
  }

  .action-detail{
    padding: 10px;
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

  .info-block{
    margin-top: 20px;
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
</style>


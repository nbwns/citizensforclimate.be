<template>
    <div class="banner" v-if="isOpen">
        <div class="container is-fluid">
          <button class="close-button" @click="closeSurvey">x</button>
          <div class="text-wrapper">
            <p class="has-text-black">{{t("survey-message")}}</p>
              <a class="button" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSfcNddEUquS7lHi1Y9tGJ6wzvfIIsSsctfcQo1T8P_0uyawOw/viewform?usp=sf_link">{{t("i-answer-survey")}}</a>
          </div>
        </div>
    </div>
</template>

<script>
import translate from '~/plugins/translations'

export default {
    data() {
      return {
        isOpen: true
      }
    },
    methods: {
        t(key){
            return translate(this.$route.params.locale, key)
        },
        closeSurvey() {
          this.isOpen = false
        }
    }
}
</script>

<style lang='scss' scoped>
    .banner {
      position: fixed;
      bottom: 0;
      width: 100%;
      z-index: 100;
      padding: 20px;
      background-color: #67de97;
    }

    .text-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      margin-right: 20px;
    }

    p {
      margin-bottom: 10px;
    }

    .button {
      margin-right: 20px;
      text-transform: none;
    }

    .close-button {
      position: absolute;
      right: 0;
      background: transparent;
      border: none;
      font-size: 26px;
      font-weight: bold;
      cursor: pointer;
    }
</style>

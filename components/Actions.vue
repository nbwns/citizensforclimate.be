<template>
  <div class="actions has-text-black">
    <div class="actions-background">
      <div class="container is-fluid">
        <div class="title-head has-text-centered">
          <h2 class="title is-1 has-text-black">{{t("actions-title")}}</h2>
          <p class="subtitle has-text-black">{{t("actions-subtitle")}}</p>
        </div>
        <Loader v-if="loading"/>
        <template v-if="!loading">
          <ActionCategories :items="categories" @categoryChanged="categoryFilter = $event"/>
          <div v-if="!loading" class="columns is-multiline is-centered">
            <div
              class="column is-one-third-desktop is-half-tablet"
              v-for="action in normalActions"
              :key="action.id"
            >
              <Action :action="action" :class="{highlight: action.fields.highlight}" @categoryChanged="categoryFilter = $event"/>
            </div>
          </div>
          <div
            class="see-more-actions"
            v-if="!showAllActions && !categoryFilter"
            @click="displayAllActions()"
          >
            <p>{{t("actions-more")}}</p>
            <img src="~/assets/images/white-arrow.png">
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// import client from "~/plugins/contentful";
const client = require('~/plugins/contentful')
import translate from "~/plugins/translations";
import Loader from "~/components/Loader";
import Action from "~/components/Action";
import ActionCategories from "~/components/ActionCategories";

export default {
  // props: ['actions'],
  data() {
    return {
      actions: [],
      categories: [],
      loading: true,
      maxActions: 12,
      showAllActions: false,
      categoryFilter: null
    };
  },
  components: {
    Loader,
    Action,
    ActionCategories
  },
  computed: {
    highlightActions() {
      return this.actions.filter(action => {
        return action.fields.highlight == true && action.fields.name;
      });
    },
    normalActions() {
      if (this.categoryFilter) {
        return this.actions.filter(action => {
          return (
            action.fields.name &&
            action.fields.categories.find(cat => {
              return cat.sys.id == this.categoryFilter;
            })
          );
        });
      } else {
        return this.actions.filter((action, index) => {
          return action.fields.name && index <= this.maxActions + 1;
        });
      }
    }
  },
  methods: {
    displayAllActions() {
      this.maxActions += 12;
      this.showAllActions = this.maxActions >= this.normalActions.length;
    },
    t(key) {
      return translate(this.$route.params.locale, key);
    }
  },
  mounted() {
    if (this.$route.params.locale) {
      //this.$i18n.locale = this.$route.params.locale
      let allActions = client
        .getEntries({
          content_type: "action",
          locale: this.$route.params.locale + "-BE",
          order: "-fields.highlight,fields.sortOrder,fields.name"
        })
        .then(entries => {
          return entries.items;
        });

      let allCategories = client
        .getEntries({
          content_type: "actionCategory",
          locale: this.$route.params.locale + "-BE",
          order: "fields.sortOrder"
        })
        .then(entries => {
          return entries.items;
        });

      return Promise.all([allActions, allCategories]).then(values => {
        this.actions = values[0];
        this.categories = values[1];
        this.loading = false;
      });
    }
  }
};
</script>

<style scoped>
.actions-background {
  background-color: #c8e3e3;
}

.see-more-actions {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.see-more-actions p {
  align-self: center;
}

.see-more-actions img {
  transform: rotate(-90deg);
  align-self: center;
}

@media screen and (max-width: 1088px) {
  .actions-background {
    padding-left: 15px;
  }
}

@media screen and (max-width: 768px) {

}

@media screen and (min-width: 768px) and (max-width: 1087px) {

}
</style>
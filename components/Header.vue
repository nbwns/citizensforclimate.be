<template>
  <div class="header-wrapper">
    <div class="container">
      <nav class="main-nav">
        <nuxt-link class="home" :to="($route.params.locale ? '/' + $route.params.locale : '')">
          <h2>Climagenda</h2>
          <h3>Agir en Belgique contre le changement climatique</h3>
        </nuxt-link>
        <div class="links-wrapper">
          <div class="search-wrapper">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.005 512.005"><path d="M505.749 475.587l-145.6-145.6c28.203-34.837 45.184-79.104 45.184-127.317C405.333 90.926 314.41.003 202.666.003S0 90.925 0 202.669s90.923 202.667 202.667 202.667c48.213 0 92.48-16.981 127.317-45.184l145.6 145.6c4.16 4.16 9.621 6.251 15.083 6.251s10.923-2.091 15.083-6.251c8.341-8.341 8.341-21.824-.001-30.165zM202.667 362.669c-88.235 0-160-71.765-160-160s71.765-160 160-160 160 71.765 160 160-71.766 160-160 160z"/></svg>
            <input type="text" class="search" />
          </div>
          <a href="" class="link">Resources</a>
          <a href="" class="button">Contribuer</a>
          <nuxt-link
            v-if="$route.path !== '/' && $route.params.locale"
            :to="'/' + newLang"
            @click.native="changeLanguage(newLang)"
            class="link"
          >
            {{ newLang.toUpperCase() }}
          </nuxt-link>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    changeLanguage(newLang) {
      localStorage.setItem("language", newLang);
    }
  },
  computed: {
    newLang: function() {
      return this.$route.params.locale == "fr" ? "nl" : "fr";
    }
  }
};
</script>

<style lang="scss" scoped>
.header-wrapper {
  background-color: var(--c-primary);
  color: var(--c-white);
}
.main-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}

.home {
  color: var(--c-white);

  h2 {
    font-size: 40px;
    letter-spacing: -2px;
    text-transform: uppercase;
    color: var(--c-secondary);
  }
}

.links-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;

  > * + * {
    margin-left: 20px;
  }
}

.search-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  top: 12px;
  left: 8px;
  fill: var(--c-white);
  width: 16px;
  pointer-events: none;
}

.search {
  padding: 10px 10px 10px 30px;
  background-color: transparent;
  border: 2px solid var(--c-white);
  color: var(--c-white);
}

.link {
  color: var(--c-white);
  text-transform: uppercase;

  &:hover, &:focus {
    color: var(--c-white);
    text-decoration: underline;
  }
}

.button {
  padding: 2px 8px;
  border: 2px solid var(--c-white);
  background-color: transparent;
  color: var(--c-white);
  border-radius: 0;
  text-transform: uppercase;

  &:hover, &:focus {
    color: var(--c-white);
  }
}
</style>

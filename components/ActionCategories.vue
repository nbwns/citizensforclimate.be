<template>
  <div class="tabs">
    <div
      v-for="cat in items"
      :key="cat.sys.id"
      class="tab-item"
      :class="{'is-active': (cat.sys.id == selected)}"
    >
      <a @click="selectCategory(cat.sys.id, cat.fields.color)">
        <div class="filter-one">
          <div class="filter-picto" :style="[{ borderColor: cat.fields.color },cssProps]">
            <img
              :src="cat.fields.picto.fields.file.url"
              :alt="'icon-'+cat.fields.picto.fields.title"
            >
          </div>
          <span v-html="filterTitle(cat.fields.name)"></span>
        </div>
      </a>
    </div>
    <div class="tab-item">
      <a @click="selectCategory()">
        <div class="filter-one">
          <div class="filter-picto" :style="{ borderColor: 'black' }">
            <img src="~/assets/images/toutafficher.png" alt="icon-all">
          </div>
          <span>
            Tout
            <br>afficher
          </span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["items"],
  data() {
    return {
      selected: null,
      bgColor: 'blue'
    }
  },
  computed: {
    // Create CSS Props for variables
    cssProps() {
      return {
        '--bg-picto-color': this.bgColor
        }
    }
  },
  methods: {
    selectCategory(id, color) {
      if (id == this.selected) {
        this.selected = null
      } else {
        this.selected = id
        this.bgColor = color //add the bgcolor when click
      }
      this.$emit("categoryChanged", this.selected)
    },
    // Ajoute d'une retour a la ligne apres le first word
    filterTitle(value) {
      const words = value.trim().split(" ")
      const firstWord = words.shift()
      return `${firstWord}<br>${words.join(" ")}`
    }
  }
};
</script>

<style lang="scss">
.tabs {
  display: flex;
  white-space: normal;
  justify-content: center;
  
  @media screen and (max-width: 770px) {
    justify-content: stretch;
  }
  a {
    padding: 0;
    border-bottom: none;
    font-size: 0.8em;
    line-height: 1.3;
  }
  .filter-one {
    max-width: 160px;
    min-width: 100px;
    text-align: center;
    span {
      font-weight: bold;
    }
  }

  .filter-picto {
    transition: all .2s ease-in-out;
    background-color: #fff;
    height: 55px;
    width: 55px;
    border-radius: 50%;
    border: 3px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 10px;
    padding: 4px;

    img {
      height: 100%;
      width: 100%;
      transition: all .2s ease-in-out;
    }
  }
  .tab-item {
    padding: 10px;
  }
  .tab-item.is-active {
    .filter-picto {
      background-color: var(--bg-picto-color);
      
      img {
        filter: invert(1);
      }
    }
  }
  .tab-item:hover {
    .filter-picto {
      transform: scale(1.1);
    }
  }
}
</style>

<template>
  <div id="actions-section">
  <nav class="tabs navbar" :class="{'is-fixed-top': sticky}" v-on:scroll="handleScroll">
    <div
      v-for="cat in items"
      :key="cat.sys.id"
      class="tab-item"
      :class="{'is-active': (cat.sys.id == selected)}"
    >
      <a @click="selectCategory(cat.sys.id, cat.fields.color)">
        <div class="filter-one">
          <div class="filter-picto" :style="[{ borderColor: cat.fields.color },cssProps]">
            <img v-if="cat.fields.picto.fields.file"
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
  </nav>
  </div>
</template>

<script>
export default {
  props: ["items"],
  data() {
    return {
      selected: null,
      bgColor: 'blue',
      sticky: false,
      actionsOffset: Number
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
  created() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  },
  mounted() {
    this.actionsOffset = document.getElementById('actions-section').offsetParent.offsetTop + document.querySelector('.action-head').offsetHeight
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
      this.scrollTop(this.actionsOffset)
    },
    // Ajoute d'une retour a la ligne apres le first word
    filterTitle(value) {
      const words = value.trim().split(" ")
      const firstWord = words.shift()
      return `${firstWord}<br>${words.join(" ")}`
    },
    scrollTop(offset){
      window.scrollTo({
        top: offset,
        left: 0,
        behavior: 'smooth'
      })
    },
    handleScroll(e){
      const windowScroll = window.pageYOffset
      if(windowScroll >= this.actionsOffset){
        this.sticky = true
      } else {
        this.sticky = false
      }
    },
    handleResize(){
      this.actionsOffset = document.getElementById('actions-section').offsetParent.offsetTop + document.querySelector('.action-head').offsetHeight
    }
  }
}
</script>

<style lang="scss">
.tabs {
  display: flex;
  justify-content: center;
  white-space: normal;
  background-color: #CDCDCD;
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
#actions-section {
  position: relative;
  // width: calc(100% + 15px);
  // left: -15px;
  height: 120px;
  margin-bottom: 20px;
  @media screen and ( max-width: 375px ){
    margin-bottom: 5px;
   .tab-item {
     padding: 10px;
     padding-bottom: 12px;
     font-size: .8em;
     .filter-one {
       min-width: 60px;
     }
     .filter-picto{
       height: 45px;
       width: 45px;
       border: 2px solid;
     }
   }
  }

}
</style>
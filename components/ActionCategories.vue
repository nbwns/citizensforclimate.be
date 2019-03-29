<template>
  <div class="tabs is-centered">
      <div v-for="cat in items" :key="cat.sys.id" :class="{'is-active': (cat.sys.id == selected)}">
          <a @click="selectCategory(cat.sys.id)">
        <div class="filter-one">
            <div class="filter-picto">
              <img
                :src="cat.fields.picto.fields.file.url"
                :alt="'icon-'+cat.fields.picto.fields.title"
              >
            </div>
            <span v-html="filterTitle(cat.fields.name)"></span>
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
      selected: null
    };
  },
  methods: {
    selectCategory(id) {
      if (id == this.selected) {
        this.selected = null;
      } else {
        this.selected = id;
      }
      this.$emit("categoryChanged", this.selected);
    },
    filterTitle(value) {
        const words = value.trim().split(' ')
        const firstWord = words.shift()
        return `${firstWord}<br>${words.join(' ')}`
    }
  }
};
</script>

<style lang="scss">
.tabs {
  border: 1px solid red;
  display: flex;
  overflow-x: scroll;
  white-space: pre-wrap;
  .filter-one {
      border: 1px solid blue;
      width: 160px;
      text-align: center;
  }
 
  .filter-picto {
    background-color: #fff;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    border: 3px solid crimson;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 4px;

    img {
      height: 45px;
      width: 45px;
    }
  }
  
}
</style>

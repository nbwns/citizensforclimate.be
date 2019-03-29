<template>
  <div class="tabs is-centered">
      <div v-for="cat in items" :key="cat.sys.id" :class="{'is-active': (cat.sys.id == selected)}">
        <div class="filter-one">
          <a @click="selectCategory(cat.sys.id)">
            <div class="filter-picto">
              <img
                :src="cat.fields.picto.fields.file.url"
                :alt="'icon-'+cat.fields.picto.fields.title"
              >
            </div>
            <span v-html="filterTitle(cat.fields.name)"></span>
          </a>
        </div>
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
    display: none;
    justify-content: center;
    align-items: center;

    img {
      height: 45px;
      width: 45px;
    }
  }
  
}
</style>

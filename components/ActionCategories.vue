<template>
    <div class="tabs">
        <ul>
            <li v-for="cat in items" :key="cat.sys.id" :class="{'is-active': (cat.sys.id == selected)}">
                <a @click="selectCategory(cat.sys.id)">{{cat.fields.name}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['items'],
    data(){
        return {
            selected: null
        }
    },
    methods: {
        selectCategory(id){
            if(id == this.selected){
                this.selected = null
            }
            else{
                this.selected = id
            }
            this.$emit("categoryChanged", this.selected)
        }
    }
}
</script>

<style>

</style>

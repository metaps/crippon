<template>
    <b-card-group columns>
        <app-item v-for="(item, index) in items" :item=item></app-item>
    </b-card-group>
</template>
<script>
import Item from './Item.vue'
export default {
        props: ['items'],
        components: {
            appItem: Item
        },

}
</script>
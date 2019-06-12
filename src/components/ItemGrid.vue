<template>
    <div class="row">
        <app-item v-for="(item, index) in items">{{ item }}</app-item>
    </div>
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
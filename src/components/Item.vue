<template>
      <b-card
    :title= "item.attributes.extension_name"
    :img-src= "item.image"
    img-alt="Image"
    img-top
  >
    <b-card-text>
      name:  {{item.name}} <br>
      active skill:{{ item.attributes.active_skill }}<br>
      agi:  {{ item.attributes.agi }}<br>
      hp: {{ item.attributes.hp }}<br>
      int:  {{ item.attributes.int }}<br>
      lv:  {{ item.attributes.lv }}<br>
      phy:  {{ item.attributes.phy }}<br>
      rarity  {{ item.attributes.rarity }}<br>
      id:{{ item.attributes.id }}<br>
    </b-card-text>

    <b-button href="#" variant="primary">Buy</b-button>
  
  </b-card>

</template>

<script>
  export default {
    props: ["item"]
  }
</script>

<style>
    .panel-body {
        font-family: 'Arizonia', cursive;
        font-size: 24px;
        color: #6e6e6e;
        border-block-color: black;
    }

    .item {
        cursor: pointer;
    }

    .item:hover {
        background-color: #ffe2e2;
    }
</style>
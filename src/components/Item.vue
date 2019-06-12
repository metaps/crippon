<template>
      <b-card
    title="Item Sample"
    img-src="https://picsum.photos/600/300/?image=25"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
      <slot></slot>
    </b-card-text>

    <b-button href="#" variant="primary">Purchase</b-button>
  </b-card>
</template>

<script>
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
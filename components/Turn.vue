<template>
  <div class="turn">
    <div v-if="points !== null" class="points me-5">{{ points }}</div>
    <div v-for="(cell, i) in cells" :key="`cell-${i}`" class="cell mx-1">
      {{ cell.name }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  points: { type: Number, default: null },
  cells: { type: Array, default: [] },
});
</script>

<style scoped>
.turn {
  display: inline-block;
  padding: 0.5em 1em;
  background-color: #efefef;
  border-radius: 0.5em;
}
.turn .points {
  display: inline-block;
  width: 50px;
  text-align: center;
}
.turn .cell {
  display: inline-block;
  width: 40px;
  font-size: 0.8em;
  padding: 0.25em 0.5em;
  background-color: #ccc;
  border-radius: 0.5em;
  text-align: center;
}
</style>

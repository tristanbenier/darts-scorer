<template>
  <div class="turn row">
    <div class="col-8">
      <div class="row">
        <div v-for="(cell, i) in cells" :key="`cell-${i}`" class="col-4">
          <div class="cell w-100">{{ cell.name }}</div>
        </div>
      </div>
    </div>
    <div class="col-4 text-center">
      <span v-if="points !== null" class="points">{{ points }}</span>
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
  background-color: #2e343a;
  border-radius: 0.125em;
  color: #fff;
}
.turn .points {
  text-align: center;
}
.turn .cell {
  font-size: 0.8em;
  padding: 1em 0;
  background-color: #3b4046;
  border-radius: 0.5em;
  text-align: center;
}
</style>

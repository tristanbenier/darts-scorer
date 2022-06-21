<template>
  <div class="game-x01">
    <div class="row">
      <div class="col">
        <DartsPanel
          width="100%"
          @hit="dartsHitHandler"
        />
      </div>
      <div class="col">
        <div class="row actions">
          <div class="col text-end">
            <button class="btn btn-primary btn-sm" @click="cancelClickHandler">Annuler</button>
          </div>
        </div>

        <div class="row">
          <div class="col"
            v-for="(player, i) in gamePlayers"
            :class="['player', 'text-center', currentPlayerIndex === i ? 'active' : null]"
          >
            <h2>{{ player.name }}</h2>
            <p class="player-average-turn-points">Moyenne: {{ player.averageTurnPoints }}</p>
            <p class="player-score">Score: {{ player.score }}</p>
            <p class="player-current-turn">
              <template v-if="player.currentTurn">
                <strong>{{ player.currentTurn.points }}</strong>
                [{{ player.currentTurn.cells.map(cell => cell.name).join(' • ') }}]
              </template>
              <template v-if="!player.currentTurn">
                -
              </template>
            </p>
            <hr>
            <p v-for="(turn, j) in player.turns" :key="`player-${i}-turn-${j}`">
              <strong>{{ turn.points }}</strong>
              [{{ turn.cells.length ? turn.cells.map(cell => cell.name).join(' • ') : '-' }}]
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DartsPanel from '@/components/DartsPanel.vue';

import { useCellsStore } from '@/store/cell';
import { useGameStore } from '@/store/game';

const cellsStore = useCellsStore();
const gameStore = useGameStore();

const game = computed(() => gameStore.currentGame);
const gamePlayers = computed(() => (game.value && game.value.players) || []);
const currentPlayerIndex = computed(() => game.value && game.value.currentPlayerIndex);

onBeforeMount(() => {
  cellsStore.initCells();
});

const dartsHitHandler = (cell) => {
  gameStore.currentPlayerPlay(cell);
};

const cancelClickHandler = () => {
  gameStore.cancelLastAction();
};
</script>

<style scoped>
.game-x01 .player.active {
  background-color: #ffcc00;
}
</style>

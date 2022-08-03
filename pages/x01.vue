<template>
  <!-- https://image.winudf.com/v2/image1/Y29tLmhpZy5EYXJ0c1Njb3JlclBST19zY3JlZW5fNV8xNjQwNjM0MTc4XzAyOQ/screen-5.jpg?fakeurl=1 -->
  <ClientOnly>
    <div class="game-x01">
      <div class="row">
        <div class="col py-2 px-5">
          <DartsPanel
            width="100%"
            @hit="dartsHitHandler"
          />
        </div>

        <div class="col">
          <a href="#" @click.prevent="cancelClickHandler">Annuler dernier coup</a>

          <div class="row">
            <div v-for="(player, i) in gamePlayers" class="col-6 col-md-4">
              <a class="player-container w-100" :class="{ active: currentPlayerIndex === i }" @click="selectedPlayer = player">
                {{ player.name }}
                <span class="player-score">{{ player.score }}</span>
              </a>
            </div>
          </div>

          <hr>

          <div v-if="currentPlayer" class="current-player-container row">
            <div class="col">
              A <code>{{ currentPlayer?.name }}</code> de jouer
            </div>

            <div v-if="currentPlayer.currentTurn" class="col">
              <Turn
                :points="currentPlayer.currentTurn.points"
                :cells="currentPlayer.currentTurn.cells"
              />
            </div>
            <hr>
          </div>

          <div v-if="selectedPlayer" class="current-player-container">
            {{ selectedPlayer.name }}
            <div
              v-for="(turn, j) in selectedPlayer.turns"
              :key="`player-${i}-turn-${j}`"
              class="mb-1"
            >
              <Turn
                :points="turn.points"
                :cells="turn.cells"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { GameX01 } from '@/models/GameX01';

import DartsPanel from '@/components/DartsPanel.vue';
import Turn from '@/components/Turn.vue';

import { useCellsStore } from '@/store/cell';
import { useGameStore } from '@/store/game';

const cellsStore = useCellsStore();
const gameStore = useGameStore();

const game = computed(() => gameStore.currentGame);
const gamePlayers = computed(() => (game.value?.players) || []);
const currentPlayerIndex = computed(() => game.value && game.value.currentPlayerIndex);
const currentPlayer = computed(() => gamePlayers.value?.[currentPlayerIndex.value]);

const selectedPlayer = ref(null);

onBeforeMount(() => {
  cellsStore.initCells();

  const gameName = 'GameX01';
  const storedGame = gameStore.loadGameFromStorage(gameName);
  if (storedGame) {
    const game = GameX01.createFromStoredValue(storedGame);
    gameStore.currentGame = game;
  }

  selectedPlayer.value = currentPlayer.value;
});

const dartsHitHandler = (cell) => {
  if (game.value.isFinished) {
    return;
  }

  selectedPlayer.value = currentPlayer.value;
  gameStore.currentPlayerPlay(cell);
  selectedPlayer.value = currentPlayer.value;
};

const restartClickHandler = () => {
  if (!window.confirm('Créer une nouvelle partie ?')) {
    return;
  }
  const newGame = new GameX01(game.value.id + 1, game.value.playerNames, game.value.startScore);
  gameStore.init(newGame);
};

const cancelClickHandler = () => {
  gameStore.cancelLastAction();
};
</script>

<style scoped>
.game-x01 .player-container {
  display: inline-block;
  margin-top: 1em;
  padding: 0.5em 1em;
  background-color: #efefef;
  border-radius: 0.5em;
  text-decoration: none;
  cursor: pointer;
}
.game-x01 .player-container.active {
  background-color: #ffb401;
}
.game-x01 .player-container .player-score {
  font-weight: bold;
  float: right;
}
</style>

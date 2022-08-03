<template>
  <!-- https://image.winudf.com/v2/image1/Y29tLmhpZy5EYXJ0c1Njb3JlclBST19zY3JlZW5fNV8xNjQwNjM0MTc4XzAyOQ/screen-5.jpg?fakeurl=1 -->
  <!-- https://image.winudf.com/v2/image1/Y29tLmhpZy5EYXJ0c1Njb3JlclBST19zY3JlZW5fM18xNjQwNjM0MTc4XzAzNw/screen-3.jpg?fakeurl=1 -->
  <ClientOnly>
    <div class="game-cricket">
      <div class="row">
        <div class="col-6 col-md-7">
          <DartsPanel
            width="100%"
            @hit="dartsHitHandler"
          />
        </div>

        <div class="col-6 col-md-5 pt-5">
          <div class="actions">
            <a class="button new-game-button me-2" @click.prevent="restartClickHandler">Nouvelle partie</a>
            <a class="button cancel-button me-2" @click.prevent="cancelClickHandler">Annuler dernier coup</a>
            <a class="button back-button" href="/">Retour</a>
          </div>

          <div class="players mt-3">
            <div
              v-for="(player, i) in gamePlayers"
              :key="`player_${i}`"
              class="player-container"
              :class="{ active: currentPlayerIndex === i }"
            >
              <div class="player-name">{{ player.name }}</div>
              <div class="player-score mb-3">{{ player.points }}</div>

              <div
                v-for="(scoreCellKey, j) in CRICKET_SCORE_CELL_KEYS"
                :key="`player-${i}-score-cell-${j}`"
                class="cricket-cell mb-2"
              >
                <div :class="[`cricket-cell-background-${player.getCellScore(scoreCellKey)}`]" />
                <div class="cricket-cell-score">{{ scoreCellKey }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import DartsPanel from '@/components/DartsPanel.vue';
import { GameCricket, CRICKET_SCORE_CELL_KEYS } from '@/models/GameCricket';

import { useCellsStore } from '@/store/cell';
import { useGameStore } from '@/store/game';

const cellsStore = useCellsStore();
const gameStore = useGameStore();

const game = computed(() => gameStore.currentGame);
const gamePlayers = computed(() => (game.value && game.value.players) || []);
const currentPlayerIndex = computed(() => game.value && game.value.currentPlayerIndex);

onBeforeMount(() => {
  cellsStore.initCells();

  const gameName = 'GameCricket';
  const storedGame = gameStore.loadGameFromStorage(gameName);
  if (storedGame) {
    const game = GameCricket.createFromStoredValue(storedGame);
    gameStore.currentGame = game;
  }
});

const dartsHitHandler = (cell) => {
  gameStore.currentPlayerPlay(cell);
};

const restartClickHandler = () => {
  if (!window.confirm('Créer une nouvelle partie ?')) {
    return;
  }
  const newGame = new GameCricket(game.value.id + 1, game.value.playerNames);
  gameStore.init(newGame);
};

const cancelClickHandler = () => {
  gameStore.cancelLastAction();
};
</script>

<style scoped>
.game-cricket .player-container {
  display: inline-block;
  min-width: 100px;
  padding: 1em;
  text-decoration: none;
  cursor: pointer;
  color: #fff;
  background-color: #2e343a;
  border-top: 5px solid transparent;
  border-right: 1px solid #3b4046;
}
.game-cricket .player-container.active {
  border-top: 5px solid #ff1a00;
}

.game-cricket .player-container .player-score {
  text-align: center;
  font-weight: bold;
  font-size: 2em;
}

.game-cricket .cricket-cell {
  position: relative;
  border: 1px solid #3b4046;
  width: 100%;
  padding: 1em 0;
  text-align: center;
}
.game-cricket .cricket-cell .cricket-cell-score {
  position: relative;
  font-weight: bold;
}
.game-cricket .cricket-cell .cricket-cell-background-1,
.game-cricket .cricket-cell .cricket-cell-background-2,
.game-cricket .cricket-cell .cricket-cell-background-3 {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #03ad4e;
}
.game-cricket .cricket-cell .cricket-cell-background-1 {
  width: 33.33%;
}
.game-cricket .cricket-cell .cricket-cell-background-2 {
  width: 66.67%;
}
.game-cricket .cricket-cell .cricket-cell-background-3 {
  width: 100%;
}
</style>

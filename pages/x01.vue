<template>
  <!-- https://image.winudf.com/v2/image1/Y29tLmhpZy5EYXJ0c1Njb3JlclBST19zY3JlZW5fNV8xNjQwNjM0MTc4XzAyOQ/screen-5.jpg?fakeurl=1 -->
  <ClientOnly>
    <div class="game-x01">
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

          <div v-if="game && game.isFinished" class="mt-3">
            Partie terminée
          </div>

          <div class="players mt-3">
            <div v-for="(player, i) in gamePlayers" :key="`player_${i}`">
              <div
                class="player-container"
                :class="{ active: currentPlayerIndex === i }"
              >
                <div class="row">
                  <div class="col-4 player-name">
                    {{ player.name }}

                    <div class="player-score">
                      {{ player.score }}
                    </div>
                  </div>

                  <div class="col-8">
                    <Turn
                      v-if="player.currentOrLastTurn"
                      :points="player.currentOrLastTurn.points"
                      :cells="player.currentOrLastTurn.cells"
                    />

                    <div class="row mt-2">
                      <div class="col-4 player-stats">
                        Tours: {{ player.turns.length || '-' }}
                      </div>

                      <div class="col-4 player-stats">
                        Moy: {{ player.averageTurnsPoints || '-' }}
                      </div>

                      <div class="col-4 player-stats">
                        Max: {{ player.maxTurnsScore || '-' }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
  padding: 1em;
  text-decoration: none;
  cursor: pointer;
  color: #fff;
  background-color: #2e343a;
  border-left: 5px solid transparent;
  border-bottom: 1px solid #3b4046;
}
.game-x01 .player-container.active {
  border-left: 5px solid #ff1a00;
}
.game-x01 .player-container .player-score {
  font-weight: bold;
  font-size: 2em;
}
.game-x01 .player-container .player-stats {
  font-size: 0.75em;
}
</style>

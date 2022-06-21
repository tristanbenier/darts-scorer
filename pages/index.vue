<template>
  <div class="game-selector">
    <div class="container">
      <h1>Configuration de la partie</h1>
      <div class="card p-3">
        <div v-for="gameName in GAME_NAMES" :key="`game-${gameName}`" class="row">
          <div class="col">
            <h2>{{ gameName }}</h2>
          </div>
          <div class="col">
            <button
              class="btn"
              :class="gameName === selectedGame ? 'btn-success': 'btn-primary'"
              @click="gameSelectionHandler(gameName)"
            >Sélectionner</button>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <input
              v-model="newPlayerName"
              class="form-control"
            />
            <button
              class="btn btn-primary"
              @click="newPlayerAddHandler"
            >Ajouter</button>
          </div>
          <div class="col">
            <div v-for="(playerName, i) in playerNames" :key="`player-${i}`">
              {{ playerName }}
            </div>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col text-center">
            <button class="btn btn-primary" @click="gameStartHandler">Créer la partie</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { GameX01 } from '@/models/GameX01';
import { GameCricket } from '@/models/GameCricket';

import { useGameStore } from '@/store/game';

const gameStore = useGameStore();
const router = useRouter();

const GAME_NAMES = ['301', '501', 'Cricket'];
const selectedGame = ref(null);
const newPlayerName = ref('');
const playerNames = ref([]);

const gameSelectionHandler = (gameName) => {
  selectedGame.value = gameName;
};

const newPlayerAddHandler = () => {
  playerNames.value.push(newPlayerName.value);
  newPlayerName.value = '';
};

const gameStartHandler = () => {
  let game;
  if (selectedGame.value === '301' || selectedGame.value === '501') {
    game = new GameX01(1, playerNames.value, parseInt(selectedGame.value));
    gameStore.init(game);
    router.push({ name: 'x01' });
    console.log('x01');
  } else if (selectedGame.value === 'Cricket') {
    game = new GameCricket(1, playerNames.value);
    gameStore.init(game);
    router.push({ name: 'cricket' });
    console.log('cricket');
  }
  console.log('hey');
};

// this.$store.dispatch('game/startNewGame', { game });
</script>

<style scoped>
.game-x01 .player.active {
  background-color: #ffcc00;
}
</style>

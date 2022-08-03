<template>
  <div class="game-selector">
    <div class="container pt-5">
      <h1 class="mb-5">Configuration de la partie</h1>

      <div class="row">
        <div class="col text-center">
          <a
            v-for="gameName in GAME_NAMES"
            :key="`game-${gameName}`"
            class="button"
            :class="{ green: gameName === selectedGame }"
            @click.prevent="gameSelectionHandler(gameName)"
          >{{ gameName }}</a>
        </div>

        <div class="col">
          <form @submit.prevent="newPlayerAddHandler">
            <div class="row">
              <div class="col">
                <input v-model="newPlayerName" class="w-100" />
              </div>

              <div class="col-auto">
                <button
                  type="submit"
                  class="button"
                >Ajouter</button>
              </div>
            </div>
          </form>
        </div>

        <div class="col">
          <div v-for="(playerName, i) in playerNames" :key="`player-${i}`">
            &bullet; {{ playerName }}
          </div>
        </div>

        <div class="row mt-5">
          <div class="col text-center">
            <button class="button me-2" @click="gameReloadClickHandler">Recharger une partie existante</button>
            <button class="button green" @click="gameStartClickHandler">Créer la partie</button>
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

const gameReloadClickHandler = () => {
  if (!selectedGame.value) {
    return;
  }

  if (selectedGame.value === '301' || selectedGame.value === '501') {
    router.push({ name: 'x01' });
  } else if (selectedGame.value === 'Cricket') {
    router.push({ name: 'cricket' });
  }
};

const gameStartClickHandler = () => {
  if (!playerNames.value.length || !selectedGame.value) {
    return;
  }

  let game;
  if (selectedGame.value === '301' || selectedGame.value === '501') {
    game = new GameX01(1, playerNames.value, parseInt(selectedGame.value));
    gameStore.init(game);
    router.push({ name: 'x01' });
  } else if (selectedGame.value === 'Cricket') {
    game = new GameCricket(1, playerNames.value);
    gameStore.init(game);
    router.push({ name: 'cricket' });
  }
};
</script>

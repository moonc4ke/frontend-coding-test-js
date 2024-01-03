<template>
  <div class="justify-center max-w-md mt-10">
    <h1 class="font-extrabold tracking-tigh text-3xl leading-10">
      House of Gryffindor
    </h1>
    <div v-if="!state.isLoading" class="mt-8">
      <section>
        <h2 class="font-bold text-2xl leading-6">
          Characters List of House of Gryffindor
        </h2>
        <ul class="mt-4 mb-4">
          <li
            v-for="character in state.characters"
            v-bind:key="character.id"
            class="hover:underline"
          >
            <router-link
              v-bind:to="{
                name: 'CharacterDetails',
                params: { characterId: character.id },
              }"
            >
              {{ character.name }}
            </router-link>
          </li>
        </ul>
      </section>
    </div>
    <div v-if="state.isLoading" class="mt-4">Loading...</div>
    <div v-if="state.error" class="mt-4">
      An error occurred: {{ state.error.message }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import axios from 'axios'

const state = reactive({
  characters: [],
  isLoading: true,
  error: null,
})

onMounted(async () => {
  try {
    const response = await axios.get(
      'https://hp-api.onrender.com/api/characters/house/gryffindor',
    )
    state.characters = response.data
    state.isLoading = false
  } catch (error) {
    state.error = error
    state.isLoading = false
  }
})
</script>

<template>
  <div class="justify-center max-w-md mt-10">
    <h1 class="font-extrabold tracking-tigh text-3xl leading-10">
      House of Gryffindor
    </h1>
    <div v-if="state.isLoading" class="mt-4">Loading...</div>
    <div v-if="state.error" class="mt-4">
      Error: failed to retrieve Hogwarts house data, please try again
    </div>
    <div v-if="!state.isLoading && !state.error" class="mt-8">
      <section>
        <h2 class="font-bold text-2xl leading-6">
          Characters List of House of Gryffindor
        </h2>

        <div class="min-h-screen flex items-center justify-center px-16">
          <div class="relative w-full max-w-lg">
            <div class="m-8 relative space-y-4">
              <ul class="mt-4 mb-4">
                <li
                  v-for="character in state.characters"
                  v-bind:key="character.id"
                  class="mb-3 hover:underline"
                >
                  <router-link
                    v-bind:to="{
                      name: 'CharacterDetails',
                      params: { characterId: character.id },
                    }"
                  >
                    <div
                      class="p-5 bg-white rounded-lg flex items-center justify-between space-x-8"
                    >
                      <div class="flex-1 flex justify-between items-center">
                        {{ character.name }}
                      </div>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, inject } from 'vue'
import axios from 'axios'

const toast = inject('toast')

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
    toast.addToast('Gryffindor data fetched successfully')
  } catch (error) {
    state.error = error
    state.isLoading = false
    toast.addToast('Error fetching Gryffindor data', 'error')
  }
})
</script>

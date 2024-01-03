<template>
  <div class="justify-center max-w-md mt-10 text-left">
    <button
      type="button"
      class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100"
      v-on:click="$router.back()"
    >
      <svg
        class="w-5 h-5 rtl:rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
        />
      </svg>
      <span>Go back</span>
    </button>
    <div v-if="!state.isLoading" class="mt-8">
      <div class="max-w-lg mx-auto mb-10 bg-white rounded-lg shadow-md p-5">
        <img
          class="w-32 h-32 rounded-full mx-auto object-cover"
          v-bind:src="
            state.characterDetails.image.length > 0
              ? state.characterDetails.image
              : '../src/assets/image-not-found-icon.svg'
          "
          alt="Character Image"
        />
        <h2 class="text-center text-2xl font-semibold mt-3">
          {{ state.characterDetails.name }}
        </h2>
        <div
          v-if="
            state.characterDetails.alternate_names &&
            state.characterDetails.alternate_names.length > 0
          "
          class="text-center text-gray-600 mt-1"
        >
          <span class="font-semibold">AKA:</span>
          <ul>
            <li
              v-for="name in state.characterDetails.alternate_names"
              v-bind:key="name"
            >
              {{ name }}
            </li>
          </ul>
        </div>
        <div class="mt-5">
          <h3 class="text-xl font-semibold">Details</h3>
          <p class="text-gray-600 mt-2">
            <span class="font-semibold">Species:</span>
            {{ state.characterDetails.species }}
          </p>
          <p class="text-gray-600 mt-2">
            <span class="font-semibold">Gender:</span>
            {{ state.characterDetails.gender }}
          </p>
          <p class="text-gray-600 mt-2">
            <span class="font-semibold">House:</span>
            {{ state.characterDetails.house }}
          </p>
          <p class="text-gray-600 mt-2">
            <span class="font-semibold">Date of Birth:</span>
            {{ state.characterDetails.dateOfBirth }}
          </p>
          <p class="text-gray-600 mt-2">
            <span class="font-semibold">Year of Birth:</span>
            {{ state.characterDetails.yearOfBirth }}
          </p>
          <p class="text-gray-600 mt-2">
            <span class="font-semibold">Wizard:</span>
            {{ state.characterDetails.wizard ? 'Yes' : 'No' }}
          </p>
          <p class="text-gray-600 mt-2">
            <span class="font-semibold">Ancestry:</span>
            {{ state.characterDetails.ancestry }}
          </p>
          <p class="text-gray-600 mt-2">
            <span class="font-semibold">Eye Colour:</span>
            {{ state.characterDetails.eyeColour }}
          </p>
          <p class="text-gray-600 mt-2">
            <span class="font-semibold">Hair Colour:</span>
            {{ state.characterDetails.hairColour }}
          </p>
          <p class="text-gray-600 mt-2">
            <span class="font-semibold">Wand:</span>
            {{ state.characterDetails.wand?.wood }} wood,
            {{ state.characterDetails.wand?.core }} core,
            {{ state.characterDetails.wand?.length }} inches
          </p>
          <p class="text-gray-600 mt-2">
            <span class="font-semibold">Patronus:</span>
            {{ state.characterDetails.patronus }}
          </p>
          <p class="text-gray-600 mt-2">
            <span class="font-semibold">Hogwarts Student:</span>
            {{ state.characterDetails.hogwartsStudent ? 'Yes' : 'No' }}
          </p>
          <p class="text-gray-600 mt-2">
            <span class="font-semibold">Hogwarts Staff:</span>
            {{ state.characterDetails.hogwartsStaff ? 'Yes' : 'No' }}
          </p>
          <p class="text-gray-600 mt-2">
            <span class="font-semibold">Actor:</span>
            {{ state.characterDetails.actor }}
          </p>
          <p class="text-gray-600 mt-2">
            <span class="font-semibold">Alive:</span>
            {{ state.characterDetails.alive ? 'Yes' : 'No' }}
          </p>
        </div>
      </div>
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

const props = defineProps({
  characterId: String,
})

const state = reactive({
  characterDetails: {},
  isLoading: true,
  error: null,
})

onMounted(async () => {
  try {
    const { characterId } = props
    const response = await axios.get(
      `https://hp-api.onrender.com/api/character/${characterId}`,
    )

    ;[state.characterDetails] = response.data

    state.isLoading = false
  } catch (error) {
    state.error = error
    state.isLoading = false
  }
})
</script>

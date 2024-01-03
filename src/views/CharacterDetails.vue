<template>
  <div class="justify-center max-w-md mt-10">
    <h1 class="font-extrabold tracking-tigh text-3xl leading-10">
      {{ state.characterDetails.name }}
    </h1>
    <div v-if="!state.isLoading" class="mt-8">
      <img
        v-bind:src="state.characterDetails.image"
        alt="Character Image"
        class="max-w-xs m-auto mb-4"
      />
      <div
        v-if="
          state.characterDetails.alternate_names &&
          state.characterDetails.alternate_names.length > 0
        "
        class="mb-4"
      >
        <span class="font-semibold">Alternate Names:</span>
        <ul>
          <li
            v-for="name in state.characterDetails.alternate_names"
            v-bind:key="name"
          >
            {{ name }}
          </li>
        </ul>
      </div>
      <p class="mb-4">
        <span class="font-semibold">Species:</span>
        {{ state.characterDetails.species }}
      </p>
      <p class="mb-4">
        <span class="font-semibold">Gender:</span>
        {{ state.characterDetails.gender }}
      </p>
      <p class="mb-4">
        <span class="font-semibold">House:</span>
        {{ state.characterDetails.house }}
      </p>
      <p class="mb-4">
        <span class="font-semibold">Date of Birth:</span>
        {{ state.characterDetails.dateOfBirth }}
      </p>
      <p class="mb-4">
        <span class="font-semibold">Year of Birth:</span>
        {{ state.characterDetails.yearOfBirth }}
      </p>
      <p class="mb-4">
        <span class="font-semibold">Wizard:</span>
        {{ state.characterDetails.wizard ? 'Yes' : 'No' }}
      </p>
      <p class="mb-4">
        <span class="font-semibold">Ancestry:</span>
        {{ state.characterDetails.ancestry }}
      </p>
      <p class="mb-4">
        <span class="font-semibold">Eye Colour:</span>
        {{ state.characterDetails.eyeColour }}
      </p>
      <p class="mb-4">
        <span class="font-semibold">Hair Colour:</span>
        {{ state.characterDetails.hairColour }}
      </p>
      <p class="mb-4">
        <span class="font-semibold">Wand:</span>
        {{ state.characterDetails.wand?.wood }} wood,
        {{ state.characterDetails.wand?.core }} core,
        {{ state.characterDetails.wand?.length }} inches
      </p>
      <p class="mb-4">
        <span class="font-semibold">Patronus:</span>
        {{ state.characterDetails.patronus }}
      </p>
      <p class="mb-4">
        <span class="font-semibold">Hogwarts Student:</span>
        {{ state.characterDetails.hogwartsStudent ? 'Yes' : 'No' }}
      </p>
      <p class="mb-4">
        <span class="font-semibold">Hogwarts Staff:</span>
        {{ state.characterDetails.hogwartsStaff ? 'Yes' : 'No' }}
      </p>
      <p class="mb-4">
        <span class="font-semibold">Actor:</span>
        {{ state.characterDetails.actor }}
      </p>
      <p class="mb-4">
        <span class="font-semibold">Alive:</span>
        {{ state.characterDetails.alive ? 'Yes' : 'No' }}
      </p>
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

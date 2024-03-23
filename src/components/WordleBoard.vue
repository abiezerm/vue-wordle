<script setup lang="ts">
  import { defineProps, ref, computed } from 'vue'
  import { VICTORY_MESSAGE, DEFEAT_MESSAGE, WORD_SIZE } from '@/settings'
  import englishWords from '@/englishWordsWith5Letters.json'

  defineProps({ 
    wordOfTheDay: {
      type: String,
      validator: (wordGiven: string) => englishWords.includes(wordGiven)
    }
  })
  const guessInProgress = ref("")
  const guessSubmitted = ref("")

  const formattedGuessInProgress = computed({
    get() {
      return guessInProgress.value
    },
    set(rawValue: string) {
      guessInProgress.value = rawValue
        .slice(0, WORD_SIZE)
        .toUpperCase()
        .replace(/[^A-Z]+/gi, "")
    }
  })

  function onSubmittedGuess() {
    if(!englishWords.includes(guessInProgress.value)) {
      return
    }

    guessSubmitted.value = guessInProgress.value
  }

</script>

<template>
    <input 
      type="text" 
      :maxlength="WORD_SIZE"
      v-model="formattedGuessInProgress" 
      @keydown.enter="onSubmittedGuess" 
    />
    <p 
      v-if="guessSubmitted.length > 0" 
      v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE" 
    />
</template>

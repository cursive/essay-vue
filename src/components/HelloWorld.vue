<!-- HelloWorld.vue -->
<template>
  <div>
    <h1>Prompts</h1>
    <!-- 
    <li v-for="prompt in prompts" :key="prompt.uuid">
      <b>{{ prompt.title }}</b>
      Author: {{ prompt.author }}
      Date: {{ prompt.date }}
    </li>
    <h5>Rubrics</h5>
    <li v-for="rubric in rubrics" :key="rubric.uuid">
      <b>{{ rubric.title }}</b>
    </li>
    <h5>Feedback</h5>
    <li v-for="comment in comments" :key="comment.id">
      <b>{{ comment.dimension }}</b>
    </li>

    <button @click="handleButtonClick">Call OpenAI</button> -->
  </div>
</template>




<script setup>
import { ref } from 'vue';
import { useMainStore } from '@/stores/store-prompts.js';
import { useRubricStore } from '@/stores/store-prompts.js';
import { useCommentStore } from '@/stores/store-prompts.js';
import { useFeedbackStore } from '@/stores/store-prompts.js';

////export 'useJsonStore' (imported as 'useJsonStore') was not found in './stores/prompts' (possible exports: usePromptStore, useRubricStore)
const store = useMainStore();
const prompts = store.getPrompts;
const rubrics = store.getRubrics;
const commments = store.getComments;

function handleButtonClick() {
  console.log("button clicked")
    //callOpenAI(this.prompts[0].description, this.rubrics[0].description)
    .then(result => {
      console.log('Result:', result);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

</script>

<style scoped></style>

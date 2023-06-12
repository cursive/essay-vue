

<template>
    <div class="admin">
        <label for="">Prompt: </label>
        <select v-model="selectedPromptIndex" @change="handleSelectChange">
            <option v-for="(prompt, index) in store.prompts" :value="index" :key="index">
                {{ prompt.title }}
            </option>
        </select>

        <a href="/prompts/promptlist.html">Prompt editor</a>
        <a href="/prompts/promptlist.html">Rubric editor</a>
    </div>
</template>



<script setup>
import { ref, computed } from 'vue';
import { useMainStore } from '@/stores/store-prompts';

const store = useMainStore();
const selectedPromptIndex = ref(0); // Assuming you want to initialize with the first prompt

// Define a computed property to store the prompts as a separate variable
const prompts = computed(() => {
    return store.prompts;
});



function handleSelectChange() {
    store.setActivePrompt(selectedPromptIndex);
}

store.getPrompts()


</script>


<style lang="scss" scoped>
.admin {

    width: 100%;
    background-color: #fff;
    padding: 8px;
    display: flex;
    gap: 16px;
    align-items: center;
    background-color: #001950;
    color: white;

    a {
        text-decoration: none;
        color: white
    }

    a:hover {
        text-decoration: underline;
    }

    label {
        padding-left: 160px;
    }

    font-size: 12px;
    border-bottom: 1px solid #aaaaaa;
}
</style>

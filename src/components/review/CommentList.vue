<template>
    <div class="comments">
        <h2>Comments</h2>
        <!-- Generate comment bubble based on what's in the state -->
        <CommentBubble v-for="comment in computedComments" :key="comment.id" :comment="comment" />
    </div>
</template>

<script setup>
import CommentBubble from './CommentBubble.vue'; // Import the Comment component
import { computed, ref } from 'vue';
import { useMainStore } from '@/stores/store-prompts';

const store = useMainStore();

//not used, because I switched to computed
const comments = store.getComments;


//Computed somehow means the data is reactive
const computedComments = computed(() => store.getComments);

</script>



<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.comments {
    * {
        transition: 300ms;
    }

    display: flex;
    flex-direction: column;
    gap: 16px;

}
</style>


<template>
    <div class="comments">
        <h2>Comments</h2>
        <CommentReview v-for="comment in computedComments" :key="comment.id" :comment="comment" />
    </div>
</template>

<script setup>
import CommentReview from './CommentReview.vue'; // Import the Comment component
import { computed, ref } from 'vue';
import { useMainStore } from '@/stores/store-prompts';

const store = useMainStore();
const comments = store.getComments;



const computedComments = computed(() => store.getComments);

</script>



<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.comments {
    display: flex;
    flex-direction: column;
    gap: 16px;

}
</style>


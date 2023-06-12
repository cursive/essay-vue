

<template>
    <div class="block">
        <h2>Essay feedback</h2>
        <div v-for="feedback in computedFeedbacks" :key="feedback.id" :class="['feedback', 'score' + feedback.score, {
            'approved': feedback.isApproved,
        }]">


            <h3>
                {{ feedback.dimension }}: {{ feedback.score }}
            </h3>
            <p contenteditable="true" @click="editFeedback(feedback)" @input="updateFeedback(feedback)">
                {{ feedback.feedback }}
            </p>
            <div class="buttons">
                <i class="thumbsup ph ph-thumbs-up" @click="approveFeedback(feedback)"></i>
                <i class="approve ph ph-check" @click="approveFeedback(feedback)"></i>
            </div>
        </div>
    </div>
</template>






<script setup>
import { ref } from 'vue';
import { computed } from 'vue';

import { useMainStore } from '@/stores/store-prompts';
const store = useMainStore();
const computedFeedbacks = computed(() => store.getFeedbacks);



const approveFeedback = (feedback) => {
    feedback.isApproved = true;
    console.log('approve');
};
const editFeedback = (feedback) => {
    console.log('editFeedback');
};
const updateFeedback = (feedback) => {
    console.log('editFeedback');
};

</script>
<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.block {
    padding-bottom: 48px;
}

.feedback {
    background-color: #e2f1e2;

    padding: 24px;

    &.approved {
        background-color: #e2e8f1;
    }

    &:first-of-type {
        border-top-right-radius: 16px;
        border-top-left-radius: 16px;
    }

    &:last-of-type {
        border-bottom-right-radius: 16px;
        border-bottom-left-radius: 16px;
    }

    margin-bottom: 2px;

    p {
        padding: 8px;
        border-radius: 8px;

        &:hover {
            background-color: rgba($color: #000000, $alpha: 0.05);
            cursor: pointer;
        }

        &:focus {
            outline: 2px solid rgba($color: #000000, $alpha: 0.3);
            background-color: rgba($color: #ffffff, $alpha: 0.05);
            transition: 300ms;
        }

    }


}

.buttons {
    display: flex;
    flex-direction: row;
    gap: 8px;
    margin-top: 4px;

    i {
        border-radius: 100%;
        padding: 8px;
        // background-color: #fff000;
        transform-origin: center;

        &:hover {
            cursor: pointer;
            background-color: rgba($color: #000000, $alpha: 0.1)
        }
    }

    .thumbsup {
        display: block;
    }

    .thumbsdown {
        display: block;
    }

    .approve {
        display: none;
    }
}
</style>


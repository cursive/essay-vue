

<template>
    <div class="block">
        <h2>Essay feedback</h2>
        <div v-for="feedback in computedFeedbacks" :key="feedback.id" :class="['feedback', 'score' + feedback.score, {
            'approved': feedback.isApproved,
            'editing': feedback.isEditing,
        }]">

            <div class="header">
                <img class="avatar migo" src="@/assets/migo.png">
                <img class="avatar teacher" src="@/assets/teacher.png">
                {{ feedback.dimension }}: {{ feedback.score }}
            </div>
            <h3>
                <!-- {{ feedback.dimension }}: {{ feedback.score }} -->
            </h3>
            <div class="feedback-text" contenteditable="true" @click="editFeedback(feedback)"
                @input="updateFeedback(feedback)">
                {{ feedback.feedback }}
                <div class="innerKey"></div>
            </div>

            <div class="buttons">


                <div class="button confirm" @click="approveFeedback(feedback)">
                    <i class="ph ph-check"></i>
                    <div class="label">Confirm</div>
                </div>
                <div class="button edit" @click="editFeedback(feedback, $event)">
                    <i class="ph ph-pencil"></i>
                    <div class="label">Edit</div>
                </div>
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



//Update the store each make a change so that we cna track if the steacher has reviewed everything

const approveFeedback = (feedback) => {
    feedback.isApproved = true;
    feedback.isEditing = false;
    console.log('approveFeedback');
};
const editFeedback = (feedback, event) => {
    feedback.isApproved = false;
    feedback.isEditing = true;
    //This is used to set keyboard focus on a div
    if (event) {
        const fb = event.target.parentNode.parentNode.parentNode
        const innerKey = fb.querySelector('.innerKey');
        innerKey.parentNode.focus();
    }
    console.log('editFeedback');
};
const updateFeedback = (feedback) => {
    console.log('updateFeedback');
};



</script>
<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.block {
    padding-bottom: 48px;
}



.feedback {
    background-color: #e2f1e2;

    * {
        transition: 300ms;
    }

    padding: 24px;

    .avatar {
        transform-origin: center;

        &.migo {
            padding-left: 8px;
        }

        &.teacher {
            margin-left: -36px;
            scale: 0;
            margin-right: 16px;
        }
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

    .feedback-text {
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

    .buttons {
        display: flex;
        flex-direction: row;
        gap: 8px;
        margin-top: 4px;
        padding: 4px;

        .button {
            border-radius: 8px;
            padding: 4px 8px 4px 8px;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 8px;

            &:hover {
                cursor: pointer;
                background-color: rgba($color: #000000, $alpha: 0.1)
            }

            .label {
                color: #111111;
                font-size: 14px;
            }

            i {}

            &.confirm {
                display: none;
            }
        }
    }


    &.editing {
        .buttons {
            .edit {
                display: none;
            }


            .confirm {
                display: flex;
            }
        }
    }


    // Color code the scores
    &.score1 {
        background-color: $lightred;
    }

    &.score2 {
        background-color: $lightred;
    }

    &.score3 {
        background-color: $lightorange;
    }

    &.score4 {
        background-color: $lightgreen;
    }

    &.score5 {
        background-color: $lightgreen;
    }

    &.approved {
        background-color: #e2e8f1;

        .migo {
            scale: 0;
        }

        .teacher {
            scale: 1;
        }

        .buttons {
            .confirm {
                display: none;
            }


            .edit {
                display: flex;
            }
        }
    }


}

.bigButton {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px 32px;
    width: 276px;
    height: 56px;

    color: white;

    background-size: 200% 100%;
    border-radius: 6px;
    background-color: $blue;

    &.disabled {
        background-color: #333333;
    }
}
</style>


<template>
    <div :class="['comment', 'score' + comment.score, {
        'approved': isApproved,
        'editing': isEditing,
        'hovering': isHovering,
    }]" @mouseover="hoverOn" @mouseout="hoverOff">
        <div class="content">
            <div class="header">
                <img class="avatar migo" src="@/assets/migo.png">
                <img class="avatar teacher" src="@/assets/teacher.png">
                <div class="dimension">
                    {{ comment.dimension }}: {{ comment.score }}
                </div>
            </div>
            <div class="feedback" tabindex="-1" contenteditable="true" @click="editComment" @input="updateFeedback">{{
                comment.feedback }}
                <div class="innerKey"></div>
            </div>
            <div class="buttons">
                <div class="button edit" @click="editComment($event)">
                    <i class="ph ph-pencil"></i>
                    <div class="label">Edit</div>
                </div>
                <div class="button thumbsdown" @click="rejectComment">
                    <i class=" ph ph-x"></i>
                    <div class="label">Reject</div>
                </div>
                <div class="button confirm" @click="approveComment">
                    <i class="ph ph-check"></i>
                    <div class="label">Confirm</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { computed } from 'vue';
import { useMainStore } from '@/stores/store-prompts';
const props = defineProps({
    comment: Object,
});

const editComment = (event) => {
    console.log('editComment', event.target);
    //document.querySelector('.feedback').focus();
    isEditing.value = true;
    if (event) {

        const comment = event.target.parentNode.parentNode.parentNode
        const innerKey = comment.querySelector('.innerKey');
        innerKey.parentNode.focus();
    }
};

const store = useMainStore();
const storedComment = store.getComments.find(c => c.id === props.comment.id);
const isEditing = ref(false);

const isApproved = computed(() => {
    return storedComment ? storedComment.isApproved : false;
});




const isHovering = computed(() => {
    return storedComment ? storedComment.isHovering : false;
});

const hoverOn = () => {
    storedComment.isHovering = true
};
const hoverOff = () => {
    storedComment.isHovering = false
};



const approveComment = () => {
    console.log('approveComment');
    isEditing.value = false;
    store.getComments.find(c => c.id === props.comment.id).isApproved = true;
};




const rejectComment = () => {
    console.log('rejectComment');

    const commentIndex = store.getComments.findIndex(c => c.id === props.comment.id);
    if (commentIndex !== -1) {
        store.getComments.splice(commentIndex, 1);
    }
};

const updateFeedback = (event) => {
    //update the store a speople type
    console.log('updateFeedback');
    storedComment.feedback = event.target.textContent;
};


</script>


<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.content .header {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 14px;
}

.comment {
    * {
        transition: 300ms;
    }

    box-sizing:border-box;
    width: 360px;
    padding: 8px;
    padding-top: 16px;
    padding-right: 8px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    border-radius: 16px;

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





    .dimension {
        padding-left: 8px;
        font-size: 16px;
        font-weight: 300;
        text-transform: capitalize;
        padding-top: 8px;
    }

    .feedback {
        transition: 700ms;
        font-size: 16px;
        color: #666666;
        padding-left: 8px;
        padding-right: 8px;
        padding-top: 4px;
        padding-bottom: 4px;
        border-radius: 8px;
        margin-top: 4px;

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


    //edit button
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


    &.hovering {
        outline: solid 2px rgba($color: #000000, $alpha: 0.5);
        outline-offset: -2px;
    }


    //User hovers over hilighted text in the essay
    &.triggeredhover {
        outline: solid 2px rgba($color: #000000, $alpha: 0.5);
        outline-offset: -2px;
    }

    // Status of comment (  editing, approved )
    &.editing {

        .buttons.edit,
        .buttons.thumbsup,

        .buttons {


            .thumbsup {
                display: none;
            }

            .thumbsdown {
                display: flex;
            }

            .edit {
                display: none !important;
            }

            .confirm {
                display: flex !important;
                ;
            }
        }
    }


    &.approved {
        background-color: #d9dde7;

        .migo {
            scale: 0;
        }

        .teacher {
            scale: 1;
        }

        .buttons {


            .thumbsup {
                display: none;
            }

            .thumbsdown {
                display: flex;
            }

            .edit {
                display: flex;
            }

            .confirm {
                display: none;
            }
        }

    }







}
</style>

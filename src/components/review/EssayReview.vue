<template>
    <div class="essay" @mouseover="hoverOn" @mouseout="hoverOff">
        <h2>Essay on Paul Bogard's “Let There Be Dark"</h2>

        <div id="fromStudent">

            <div v-html="highlightedEssay"></div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMainStore } from '@/stores/store-prompts';
const store = useMainStore();

let hoveringComment = null;

const hoverOn = (event) => {
    const target = event.target;
    if (target.tagName === 'SPAN' && target.classList.contains('quote')) {
        const quote = target.innerText;
        const cleanedQuote = quote.replace(/[^\w\s]/g, '').toLowerCase(); // Remove punctuation and convert to lowercase
        hoveringComment = store.comments.find((comment) => {
            const cleanedCommentQuote = comment.quote.replace(/[^\w\s]/g, '').toLowerCase();
            return cleanedCommentQuote === cleanedQuote;
        });

        if (hoveringComment) {
            // alert('hoverOn: ' + hoveringComment.quote);
            hoveringComment.isHovering = true;
            // Perform additional actions with the hoveringComment if needed
        }
    }
};

const hoverOff = () => {
    if (hoveringComment) {
        hoveringComment.isHovering = false;
    }
};


const highlightedEssay = computed(() => {
    let essay = store.getEssay;
    // console.log('Original essay:', essay);
    // console.log('highlightedEssay:');
    let commentCounter = 0;
    store.comments.forEach((comment) => {
        commentCounter++;
        // console.log('commentCounter: ' + commentCounter);
        const hoveringClass = comment.isHovering ? 'hovering' : '';
        const spanClass = `quote score${comment.score} ${hoveringClass}`;
        const spanContent = comment.quote;
        const spanElement = `<span class="${spanClass}">${spanContent}</span>`;
        const cleanedCommentQuote = comment.quote.replace(/(['])/g, '&rsquo;');
        // Create a regular expression pattern to match the cleaned comment quote, ignoring HTML tags and special characters
        const regexPattern = new RegExp(`(?![^<>]*>)${cleanedCommentQuote}`, 'gi');

        // console.log('Regex pattern:', regexPattern);

        essay = essay.replace(regexPattern, spanElement);
        // console.log('Updated essay:', essay);
    });

    // console.log('Final essay:', essay);
    return essay;
});





</script>




<style lang="scss" >
@import "@/assets/_variables.scss";

.middle {
    width: 600px;
}

.essay {
    background-color: $white;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 16px;

    #fromStudent {
        font-size: 18px;
    }
}


.quote {


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

    &.rejected {
        background-color: #ffffff !important;
    }

    //Haven't figred out how to make this work yet
    &.approved {
        background-color: #d9dde7 !important;
    }

    filter: brightness(104%);


    &.hovering {
        filter: saturate(4) brightness(100%);
        // border: 1px solid red;
    }

}
</style>

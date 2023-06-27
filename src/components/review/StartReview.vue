<template>
    <div class="panel">
        <h3>Pre review</h3>


        <div class="instructions preload" v-if="!store.loaded">
            <p>We'll take a first pass at reviewing the essay using the
                <a href="#" class="showrubric" @click="toggleRubricReview">The Turnitin Common Core State Standards Writing
                    Rubrics Grades 9 - 10</a>
            </p>
            <div @click="handleButtonClick()" :class="['bigButton', {
                loading: loadingComputed, loaded,
                'loaded': store.loaded
            }]"></div>
        </div>
        <div class="instructions loaded" v-if="store.loaded">
            <p>Review the comments and edit the feedback, then send the review to your student</p>
            <div class="bigButton" :class="{ 'disabled': !store.isReviewed }"></div>
        </div>

    </div>
</template>

<script setup>
import { useMainStore } from '@/stores/store-prompts';
import { ref, watch, computed } from 'vue';

const store = useMainStore();
const loading = ref(false);


// Computed property to track the loading state
const loadingComputed = computed(() => {
    return loading.value && !store.loaded;
});

function handleButtonClick() {
    loading.value = true;
    store.sendToOpenAi();
    const button = document.querySelector('.bigButton');
    button.removeEventListener('click', handleButtonClick);
}

function toggleRubricReview() {
    console.log('toggleRubricReview');
    store.toggleRubric();
}

// Watch for changes in store.loaded
watch(() => store.loaded, (value) => {
    if (value) {
        loading.value = false;
    }
});

</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";


.hidden {
    display: none;
}

.panel {
    background-color: #ffffff;
    border-radius: 16px;
    padding: 16px;
    width: 344px;

    .showrubric {
        color: #1865F2;

        &:hover {
            text-decoration: underline;
            cursor: pointer;
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
    background: linear-gradient(to right, #0f57dc, #0f57dc 50%, #0b48ba 50%, #0b48ba);
    background-size: 200% 100%;
    border-radius: 6px;


    &:hover {
        text-decoration: underline;
        background: linear-gradient(to right, #0f57dc, #0f57dc 50%, #0b48ba 50%, #0b48ba);
        background-size: 200% 100%;
        cursor: pointer;
    }

    &.loading {
        animation: pulse 2.1s infinite;
        background-position: -100% 0;
        transition: all 150s ease-out;
        text-decoration: none;
        cursor: default !important;
    }

    &.disabled {
        background: #999999;
        // background-position: left bottom;
        text-decoration: none;
        cursor: not-allowed !important;
    }
}


.preload .bigButton {
    &.loading {
        &::before {
            content: 'Analyzing (about 2 mins)...';
        }

    }

    &::before {
        content: 'Review essay';
    }
}


.loaded .bigButton {

    &::before {
        content: 'Send to student';
    }

}



a {
    text-decoration: none;
}


@keyframes pulse {
    0% {
        color: rgba($color: #ffffff, $alpha: 0.2);
    }

    50% {
        color: rgba($color: #ffffff, $alpha: 0.7);
    }

    100% {
        color: rgba($color: #ffffff, $alpha: 0.2);
    }
}
</style>

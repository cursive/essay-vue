<template>
    <div class="start">
        <h3>Pre review</h3>
        <p>We can take a first pass at review using the
            <span class="showrubric">this rubric</span> to call out what matters to you.
        </p>

        <!-- <div @click="handleButtonClick()" :class="['bigButton', { loading }]"></div> -->
        <div @click="handleButtonClick()" :class="['bigButton', { loading: loadingComputed, loaded }]"></div>

    </div>
</template>

<script setup>
import { useMainStore } from '@/stores/store-prompts';
import { ref, watch, computed } from 'vue';

const store = useMainStore();
const loading = ref(false);
const loaded = ref(false);

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

// Watch for changes in store.loaded
watch(() => store.loaded, (value) => {
    if (value) {
        loading.value = false;
    }
});

</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.start {
    background-color: #ffffff;
    border-radius: 16px;
    padding: 16px;
    width: 344px;

    .showrubric {
        color: #1865F2;

        &:hover {
            text-decoration: underline;
            font-weight: bold;
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

    &::before {
        content: 'Review essay';
    }


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

        &::before {
            content: 'Analyzing (about 2 mins)...';
        }

    }

    &.loaded {

        background: #999999;
        // background-position: left bottom;
        text-decoration: none;
        cursor: not-allowed !important;

        &::before {
            content: 'Submit to student';
        }

    }

    &.disabled {
        background: #999999;
        // background-position: left bottom;
        text-decoration: none;
        cursor: not-allowed !important;

        &::before {
            content: 'Review essay';
        }

    }

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

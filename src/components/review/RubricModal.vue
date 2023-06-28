
<!-- A modal that flashes up to show the rubirc, it's state is manged in the store -->
<template>
    <div class="rubric">
        <div class="header">
            <h2> The Turnitin Common Core State Standards Writing Rubrics Grades 9 - 10</h2>
            <i class="thumbsup ph ph-x-circle" @click="toggleRubricReview"></i>
        </div>
        <img src="@/assets/rubric.png" alt="">
    </div>
</template>


<script setup>
import { useMainStore } from '@/stores/store-prompts';
const store = useMainStore();
function toggleRubricReview() {
    console.log('toggleRubricReview');
    store.toggleRubric();
}
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.rubric {
    display: flex;
    flex-direction: column;
    width: 1226px;
    height: 100%;
    // overflow: scroll;
    background-color: white;
    padding: 24px;
    padding-top: 48px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 50px #0006;

    .header {
        display: flex;

        h2 {
            width: 1170px;
        }
    }
}

i {
    color: $blue;
    font-size: 48px;

    &:hover {
        cursor: pointer;
    }
}
</style>

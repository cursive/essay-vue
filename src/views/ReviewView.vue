<template>
  <!-- <NavAdmin /> This was the UI for picking a prompt-->

  <TopNav />
  <div class="centered">
    <EssayHeader />
  </div>
  <div class="centered">
    <div class="main">
      <div class="left">
        <StudentList />
      </div>
      <div class="middle">
        <EssayBody />
        <OverallFeedback />
      </div>
      <div class="right">
        <StartReview />
        <CommentList />
      </div>
    </div>
  </div>
  <RubricModal v-show="store.displayRubric" />
</template>

<script setup>
// @ is an alias to /src
import NavAdmin from '@/components/review/NavAdmin.vue'
import TopNav from '@/components/review/TopNav.vue'
import EssayHeader from '@/components/review/EssayHeader.vue'
import StudentList from '@/components/review/StudentList.vue'
import EssayBody from '@/components/review/EssayBody.vue'
import OverallFeedback from '@/components/review/OverallFeedback.vue'
import StartReview from '@/components/review/StartReview.vue'
import CommentList from '@/components/review/CommentList.vue'
import RubricModal from '@/components/review/RubricModal.vue'

import { useMainStore } from '@/stores/store-prompts';
const store = useMainStore();


</script>
<style lang="scss" scoped>
.centered {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}




.main {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  align-items: flex-start;
  padding-top: 16px;
}

.right,
.left {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.middle .content {
  width: 640px;
}
</style>

<template>
  <NavAdmin />
  <NavReview />
  <div class="centered">
    <HeaderReview />
  </div>
  <div class="centered">
    <div class="main">
      <div class="left">
        <StudentsReview />
      </div>
      <div class="middle">
        <EssayReview />
        <FeedbackReview />
      </div>
      <div class="right">
        <StartReview />
        <CommentsReview />
      </div>
    </div>
  </div>
</template>

<script setup>
// @ is an alias to /src
import NavReview from '@/components/review/NavReview.vue'
import NavAdmin from '@/components/review/NavAdmin.vue'
import HeaderReview from '@/components/review/HeaderReview.vue'
import StudentsReview from '@/components/review/StudentsReview.vue'
import EssayReview from '@/components/review/EssayReview.vue'
import FeedbackReview from '@/components/review/FeedbackReview.vue'
import StartReview from '@/components/review/StartReview.vue'
import CommentsReview from '@/components/review/CommentsReview.vue'


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

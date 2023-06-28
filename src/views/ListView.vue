<template>
  <TopNav />
  <div class="centered">
    <div class="main">
      <div class="left">
        <img src="@/assets/list-sidebar.png" alt="">
      </div>
      <div class="middle">
        <img src="@/assets/list-content.png" alt="">
        <router-link to="/essay">
          <div class="emma"></div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// @ is an alias to /src
import TopNav from '@/components/review/TopNav.vue'




</script>
<style lang="scss" scoped>
.centered {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.emma {
  width: 1092px;
  height: 40px;

  background-image: url(@/assets/list-emma.png);
  background-size: 100%;
  position: relative;
  top: -429px;
  left: 24px;

  &:hover {
    background-position-y: -40px;
    cursor: pointer;
  }
}

.left {
  width: 230px;
}

.middle {
  width: 1136px;
}

img {
  width: 100%;
}


.main {
  display: flex;
  flex-direction: row;
  align-items: left;
  align-items: flex-start;

}

.right,
.left {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>

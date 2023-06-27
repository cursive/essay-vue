

<template>
    <div class="students">
        <router-link to="/">
            <img src="@/assets/Students.png" alt="">
        </router-link>

    </div>
</template>

<script setup>

</script>


<style lang="scss" scoped>
@import "@/assets/_variables.scss";

.students {
    width: 254px;
    border-radius: 8px;
    background-color: $white;

}

img {
    width: 100%;
}
</style>

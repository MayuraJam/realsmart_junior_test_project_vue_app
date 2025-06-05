<script setup>
import { RouterView } from 'vue-router';
</script>

<!-- template เป็นแท็คแรกของการเริ่มเขียน vue.js -->
<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
 main{
  width: 85vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
 }
</style>

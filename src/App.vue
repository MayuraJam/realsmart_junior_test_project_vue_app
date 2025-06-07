<script setup>
import { RouterView } from 'vue-router';
</script>
<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
 main{
  width: 85vw;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
 }
</style>

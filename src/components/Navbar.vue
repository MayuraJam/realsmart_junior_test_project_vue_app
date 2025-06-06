<script setup>
import axios from 'axios';

defineProps({
  email: {
    type: String,
    default: ""
  }
})
</script>

<template>
  <nav class="navbar navbar-light bg-#fff justify-content-between p-2 px-3 shadow-sm">
    <a class="navbar-brand">Dashboard</a>
    <div class="active-part">
      <button class="btn btn-outline-secondary my-1 my-sm-0" type="submit" @click="handleToLoginPage">{{ email ?
        "logout" : "log in" }}</button>
      <div v-if="email" class="user-account">
        <userIcon />
        <p class="ms-2 mt-3">{{email}}</p>
      </div>
      <div v-else></div>
    </div>
  </nav>

</template>

<script>
import userIcon from './icons/IconUser.vue';
export default {
  methods: {
    handleToLoginPage() {
      axios.get('user/logout', {
        withCredentials: true
      }).then(
        res => {
          console.log(res);
          this.$router.push('/login')
        }
      ).catch(err => {
        const errMessage = err.response.data.errMessage;
        console.log("Login error :", errMessage);
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถกลับไปที่หน้าเข้าสู่ระบบได้",
        });
      }
      )
    }
  }
}
</script>

<style scoped>
.active-part {
  display: flex;
  align-items: center;
  gap: 20px;
}
.user-account{
  display: flex;
  align-items: center;
}
nav {
  width: 100%;
}
</style>

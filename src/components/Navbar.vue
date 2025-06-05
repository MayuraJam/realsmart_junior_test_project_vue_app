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
  <nav class="navbar navbar-light bg-light justify-content-between p-2 px-3 shadow-sm">
    <a class="navbar-brand">Dashboard</a>
    <div class="active-part">
      <button class="btn btn-outline-secondary my-1 my-sm-0" type="submit" @click="handleToLoginPage">{{ email ?
        "logout" : "log in"}}</button>
      <p>{{ email ? email : "" }}</p>
    </div>
  </nav>

</template>

<script>
export default {
  methods: {
    handleToLoginPage() {
      axios.get('user/logout',{
        withCredentials:true
      }).then(
        res => {
          console.log(res);
          this.$router.push('/')
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
  justify-content: center;
  align-items: center;
  gap: 10px;
}

nav {
  width: 100%;
}
</style>

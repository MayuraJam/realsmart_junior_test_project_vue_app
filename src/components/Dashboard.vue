<template>
    <Navbar/>
    <p>This is a Dashboard page</p>
    <p>Email login : {{ user?.email }}</p>

</template>

<script>
import axios from 'axios';
import Navbar from './Navbar.vue';

//  สำหรับ import ค่าหรือ prop
export default {
    name: 'Dashboard',
    data(){
        return{
            user:null
        }
    },
    async created(){
        const response = await axios.get('user',{
            withCredentials : true
        });
        console.log(response.data);
        this.user = response.data
    }

}
</script>
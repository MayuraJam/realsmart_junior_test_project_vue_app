<!-- login card -->
<template>
    <div class="card-layout">
        <div class="card-login">
            <h1>Login</h1>
            <p>Log in to your account</p>
            <form @submit.prevent="onSubmit">
                <!-- กดปุ่มแล้ว route ไปหน้า dashboard -->
                <div class="form-group">
                    <label class="mb-2">Email</label>
                    <input type="email" class="form-control" placeholder="Please enter your Email" id="email">
                </div>
                <div class="form-group">
                    <label class="mb-2">Password</label>
                    <input type="password" class="form-control" placeholder="Please enter your password" id="password">
                    <!-- <i class="bi bi-eye-slash" id="togglePassword"></i> -->
                </div>
                <a href="#" style="color:#0057D8 ;">Forgot Password?</a>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
        <div class="buttom-detail">
            <p>Copyright © 2025 ABC Company Limited. All rights reserved. </p>
            <a href="#">Privacy Policy I Terms & Conditions</a>
        </div>
        <p>Welcome to basic fetch API => {{ firstName }} {{ lastName }}</p>
    </div>
</template>

<script>
import axios from 'axios';

//  สำหรับ import ค่าหรือ prop
export default {
    name: 'Login',
    data() {
        return {
            firstName: '',
            lastName: ''
        }
    },
    mounted() {
        this.getUser()
    },
    methods: {
        async getUser() {
            await axios.get(`https://dummyjson.com/users`).then(res => {
                const user = res.data.users[1];
                this.firstName = user.firstName;
                this.lastName = user.lastName;
            }).catch(e => {
                console.log(e);
            })
        }
    }
}
</script>

<style scoped>
.card-layout {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.card-login {
    width: 485px;
    height: 454px;
    border: 1.5px solid #D7DDEC;
    border-radius: 10px;
    background-color: #F6F8FB;
    margin-bottom: 25px;
    padding: 25px 35px;

}

.card-login h1 {
    font-weight: bold;
    font-size: 34px;
}

.card-login p {
    color: #6B7187;
    font-size: 14px;
}

.card-login h1,
p {
    text-align: center;
}

.buttom-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.buttom-detail p {
    font-size: 10px;
    color: #61677D;
}


.buttom-detail a {
    color: #0057D8;
    font-size: 9px;
}


form {
    display: flex;
    flex-direction: column;
    margin-top: 25px;
    gap: 30px;
}

.form-control ::placeholder,
.form-control :-ms-input-placeholder,
.form-control::-ms-input-placeholder {
    color: #A6B0CF;
}
</style>
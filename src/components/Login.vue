<!-- login card -->
<template>
    <div class="card-layout">
        <div class="card-login">
            <h1>Login</h1>
            <p>Log in to your account</p>

            <form @submit.prevent="handleSubmit">
                <!-- กดปุ่มแล้ว route ไปหน้า dashboard -->
                <div class="form-group">
                    <label class="mb-2">Email</label>
                    <input type="email" class="form-control" placeholder="Please enter your Email" id="email"
                        v-model="input.email" @blur="validate('email')" @keypress="validate('email')">
                    <p class="errors" v-if="!!errors.email">{{ errors.email }}</p>
                </div>
                <div class="form-group">
                    <label class="mb-2">Password</label>
                    <input type="password" class="form-control" placeholder="Please enter your password" id="password"
                        v-model="input.password" @blur="validate('password')" @keypress="validate('password')">
                    <p class="errors" v-if="!!errors.password">{{ errors.password }}</p>
                </div>
                <a href="#" style="color:#0057D8 ;">Forgot Password?</a>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>

        </div>
        <div class="buttom-detail">
            <p>Copyright © 2025 ABC Company Limited. All rights reserved. </p>
            <a href="#">Privacy Policy I Terms & Conditions</a>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import * as Yup from 'yup';
import Swal from 'sweetalert2'

//  สำหรับ import ค่าหรือ prop

const validateForm = Yup.object().shape({
    email: Yup.string()
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i, "Invalid email format")
        .required("Please enter your Email"),
    password: Yup.string()
        .required("Please enter your Password")
        .min(6, "password should be less thsn 6 characters"),
})

export default {
    name: 'Login',
    data() {
        //   พื้นที่กำหนด data ที่ใช้งานใน component นี้
        return {
            input: {
                email: '',
                password: ''
            },
            errors: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        // พื้นที่ใส่ function ที่เกี่ยวข้อง
        handleSubmit() {
            // ทำการ validate ข้อมูล
            validateForm.validate(this.input, { abortEarly: false }).then(() => {
                //เตรียมข้อมูลสำหรับส่งไป req
                const data = {
                    email: this.input.email,
                    password: this.input.password
                }
                axios.post('user/login', data, {
                    withCredentials: true
                })
                    .then(
                        res => {
                            console.log(res);
                            Swal.fire({
                                title: "Login success",
                                icon: "success",
                            });
                            this.$router.push('/dashboard')
                        }
                    ).catch(err => {
                        const errMessage = err.response.data.errMessage;
                        console.log("Login error :", errMessage);
                        Swal.fire({
                            icon: "error",
                            title: "Login fail",
                            text: "ไม่สามารถเข้าสู่ระบบได้"
                        });

                    }
                    )
            })
                .catch((err) => {
                    err.inner.array.forEach((error) => {
                        this.errors = {
                            ...this.errors, [error.path]: error.message
                        };
                    });
                })
        },
        validate(field) {
            validateForm.validateAt(field, this.input).then(() => (this.errors[field] = ""))
                .catch((err) => {
                    this.errors[err.path] = err.message;
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
    margin-top: 50px;
}

.card-login {
    width: 485px;
    min-height: 454px;
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

p.errors {
    text-align: end;
    color: red !important;
}
</style>
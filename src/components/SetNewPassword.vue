<template>
    <div>
        <CardLayoutSlot title="Reset Password" subtitle="reset your new password">
            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label class="mb-2">new password</label>
                    <input type="password" class="form-control" placeholder="Please enter your password" id="password"
                        v-model="input.password" @blur="validate('password')" @keypress="validate('password')">
                    <p class="errors" v-if="!!errors.password">{{ errors.password }}</p>
                </div>
                <div class="form-group">
                    <label class="mb-2">confirm new Password</label>
                    <input type="password" class="form-control" placeholder="Please enter your password"
                        id="confilmPassword" v-model="input.confilmPassword" @blur="validate('confilmPassword')"
                        @keypress="validate('confilmPassword')">
                    <p class="errors" v-if="!!errors.confilmPassword">{{ errors.confilmPassword }}</p>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </CardLayoutSlot>

    </div>
</template>

<script>
import axios from 'axios';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import CardLayoutSlot from './layout/CardLayoutSlot.vue';

const validateForm = Yup.object().shape({
    password: Yup.string()
        .required("Please enter your Password")
        .min(6, "password should be less thsn 6 characters"),
    confilmPassword: Yup.string()
        .required("Please enter your Password")
        .min(6, "password should be less thsn 6 characters")
        .oneOf([Yup.ref('password'), null], "Passwords must match")
})

export default {
    name: 'Setnewpassword',
    components: {
        CardLayoutSlot
    },
    data() {
        return {
            input: {
                password: '',
                confilmPassword: '',
            },
            errors: {
                password: '',
                confilmPassword: '',
            },
            user: null
        }
    },
    methods: {
        async handleSubmit() {
            if (!this.input.password || !this.input.confilmPassword) {
                Swal.fire({
                    icon: "error",
                    title: "Please enter your new password",
                });
                return;
            }

            try {
                await validateForm.validate(this.input, { abortEarly: false });

                const responseUser = await axios.get('user', { withCredentials: true });
                this.user = responseUser.data;
                console.log("UserData :", this.user)

                const data = {
                    id: this.user._id,
                    password: this.input.password
                };
                const res = await axios.put('http://localhost:3030/user/passwordReset', data, { withCredentials: true });

                console.log(res.data);
                Swal.fire({
                    title: "Reset password success",
                    icon: "success",
                });
                this.$router.push('/');

            } catch (err) {
                console.log("Error when fail to reset :", err?.response?.data?.errMessage || err.message);
                Swal.fire({
                    icon: "error",
                    title: "Reset password fail",
                    text: "ไม่สามารถเปลี่ยนรหัสผ่านใหม่ได้",
                });
            }
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
    min-height: 400px;
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
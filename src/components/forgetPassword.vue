<template>
    <div>
        <CardLayoutSlot title="Forget password" subtitle="Enter your email for reset your new password">
            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label class="mb-2">Email</label>
                    <input type="email" class="form-control" placeholder="Please enter your Email" id="email"
                        v-model="input.email" @blur="validate('email')" @keypress="validate('email')">
                    <p class="errors" v-if="!!errors.email">{{ errors.email }}</p>
                </div>
                <button type="submit" class="btn btn-primary">Sent email</button>
                <a href="/" style="color:#0057D8 ; text-align:center;">
                    < back to login</a>
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
    email: Yup.string()
        .required("Please enter your Email"),
})

export default {
    name: 'ForgetPassword',
    components: {
        CardLayoutSlot
    },
    data() {
        return {
            input: {
                email: '',
            },
            errors: {
                email: '',
            }
        }
    },
    methods: {
        handleSubmit() {
            if (!this.input.email) {
                Swal.fire({
                    icon: "error",
                    title: "Please enter your email",
                });
                return;
            }
            validateForm.validate(this.input, { abortEarly: false }).then(() => {
                const data = {
                    email: this.input.email,
                }
                axios.post('user/forgotPassword', data, {
                    withCredentials: true
                })
                    .then(
                        res => {
                            console.log(res);
                            Swal.fire({
                                title: "sent email success",
                                icon: "success",
                            });
                            this.$router.push('/resetpassword')
                        }
                    ).catch(err => {
                        const errMessage = err.response.data.errMessage;
                        console.log("Login error :", errMessage);
                        Swal.fire({
                            icon: "error",
                            title: "User does not exist",
                            text: errMessage
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
    min-height: 300px;
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
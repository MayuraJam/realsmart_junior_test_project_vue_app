<template>
    <div class="card-layout">
        <div class="card-login">
            <h1>{{ title }}</h1>
            <p>{{ subtitle }}</p>

            <slot></slot>

        </div>
        <div class="buttom-detail">
            <p>Copyright © 2025 ABC Company Limited. All rights reserved. </p>
            <a href="#">Privacy Policy I Terms & Conditions</a>
        </div>
    </div>
</template>

<script>


export default {
    name: 'CardLayoutSlot',
    props: {
        title: {
            type: String,
            default: ""
        },
        subtitle: {
            type: Array,
            default: ""
        }
    },

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

</style>
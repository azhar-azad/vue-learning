<script setup>
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const loginData = reactive({
    email: '',
    password: '',
    emailIsInvalid: null,
    passwordIsInvalid: null,
    errMsg: ''
});

watch(
    loginData,
    () => {
        setLoginDataToLocalStorage();
    },
    {
        deep: true
    }
);

const checkEmailValidity = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailPattern.test(loginData.email)) {
        loginData.errMsg = null;
        loginData.emailIsInvalid = false;
        return true;
    }

    loginData.errMsg = 'Email is invalid';
    return false;
};

const checkPasswordValidity = () => {
    const password = loginData.password;

    if (password.length < 4) {
        loginData.errMsg = 'Password should be at least 4 characters long';
        return false;
    }

    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    const numberPattern = /\d/;
    const specialCharacterPattern = /[!@#$%^&*()\-_=+{}[\]:;"'<>,.?/\\|]/;

    if (!uppercasePattern.test(password)) {
        loginData.errMsg = 'Password should contain at least one uppercase letter (A-Z)';
        return false;
    }
    if (!lowercasePattern.test(password)) {
        loginData.errMsg = 'Password should contain at least one lowercase letter (a-z)';
        return false;
    }
    if (!numberPattern.test(password)) {
        loginData.errMsg = 'Password should contain at least one number (0-9)';
        return false;
    }
    if (!specialCharacterPattern.test(password)) {
        loginData.errMsg = 'Password should contain at least one special character';
        return false;
    }

    loginData.passwordIsInvalid = false;
    loginData.errMsg = null;
    return true;
};

const handleLogin = () => {
    console.log('email: ' + loginData.email);
    console.log('password: ' + loginData.password);

    if (!checkEmailValidity()) {
        loginData.emailIsInvalid = true;
        return;
    }
    if (!checkPasswordValidity()) {
        loginData.passwordIsInvalid = true;
        return;
    }

    if (checkEmailValidity() && checkPasswordValidity()) {
        setLoginDataToLocalStorage();
        router.push({ name: 'tasks' });
        return;
    }


};

function setLoginDataToLocalStorage() {
    localStorage.setItem('loginData', JSON.stringify(loginData));
};

</script>


<template>
    <main>
        <div class="input-wrap" :class="{'input-err' : loginData.emailIsInvalid}">
            <input v-model="loginData.email" type="text" placeholder="Email">
        </div>
        <br>

        <div class="input-wrap" :class="{'input-err' : loginData.passwordIsInvalid}">
            <input v-model="loginData.password" type="password" placeholder="Password">
        </div>

        <p 
            v-show="loginData.emailIsInvalid || loginData.passwordIsInvalid" 
            class="err-msg">{{ loginData.errMsg }}</p>
        <br>

        <button @click="handleLogin()">Login</button>
    </main>
    
</template>


<style lang="scss" scoped>
main {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    padding: 40px 16px;

    .input-wrap {
        display: flex;
        transition: 250ms ease;
        border: 2px solid #41b080;

        &.input-err {
            border-color: red;
        }

        &:focus-within {
            box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1),
            0 -2px 4px -2px rgb(0 0 0 / 0.1);
        }

        input {
            width: 100%;
            padding: 8px 6px;
            border: none;

            &:focus {
            outline: none;
            }
        }
    }

    button {
        padding: 8px 16px;
        border: none;
    }
}


.err-msg {
  margin-top: 6px;
  font-size: 12px;
  text-align: center;
  color: red;
}
</style>
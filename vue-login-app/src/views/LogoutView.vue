<script setup>
const logout = () => {
    localStorage.removeItem('loginData');
};
logout();
</script>


<template>
    <div>
        You are logged out!
    </div>
</template>


<style lang="scss" scoped>

</style>
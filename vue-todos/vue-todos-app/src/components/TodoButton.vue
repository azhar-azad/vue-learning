<script setup>

</script>

<template>
    <button>
        <!-- 'Create' is the default value if no value is passed from this component's caller -->
        <slot>Create</slot> 
    </button>
</template>

<style lang="scss" scoped>
button {
  padding: 8px 16px;
  border: none;
}
</style>
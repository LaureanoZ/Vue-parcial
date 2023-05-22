<script setup>
    defineProps (['modelValue']);
    defineEmits (['update:modelValue']);
</script>

<template>
    <textarea
        rows="5"
        class="form-control"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
</template>
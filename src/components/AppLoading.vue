<script setup>
defineProps({
    loading: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <template v-if="!loading">
        <slot />
    </template>
    <template v-else>
        <!-- TODO: Reemplazar con un loader -->
        Cargando...
    </template>
</template>
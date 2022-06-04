<template>
    <ActionsLayout>
        <div class="aspect-square w-full animate-pulse rounded-md shadow bg-gray-50" v-for="x in 8" :key="x">

        </div>
    </ActionsLayout>
</template>

<script setup>
import ActionsLayout from './ActionsLayout.vue';
</script>
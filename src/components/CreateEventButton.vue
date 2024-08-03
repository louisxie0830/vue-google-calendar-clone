<script setup lang="ts">
    import { useGlobalStore } from '../stores/useGlobalStore';
    const globalStore = useGlobalStore();
</script>

<template>
    <button 
        type="button" 
        class="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl"
        @click="globalStore.setShowEventModal(true)">
        <img src="../assets/plus.svg" alt="create_event" class="w-7 h-7"/>
        <span class="pl-3 pr-7">Create</span>
    </button>
</template>
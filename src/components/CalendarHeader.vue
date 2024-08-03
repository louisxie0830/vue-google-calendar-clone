<script setup lang="ts">
    import { computed } from 'vue'
    import dayjs from 'dayjs';
    
    import { useGlobalStore } from '../stores/useGlobalStore';
    const globalStore = useGlobalStore();
    
    const handlePrevMonth = () => {
        globalStore.setMonthIndex(globalStore.monthIndex - 1);
    };
    
    const handleNextMonth = () => {
        globalStore.setMonthIndex(globalStore.monthIndex + 1);
    };
    
    const handleRest = () => {
        const monthIndex = globalStore.monthIndex === dayjs().month() ? globalStore.monthIndex + Math.random() : dayjs().month()
        globalStore.setMonthIndex(monthIndex);
    };
    
    const currentYearAndMonth = computed(() => dayjs(new Date(dayjs().year(), globalStore.monthIndex)).format("MMMM YYYY"));
</script>

<template>
    <header class="px-4 py-2 flex items-center">
        <img src="../assets/logo.png" alt="calendar" class="mr-2 w-12 h-12"/>
        <h1 class="mr-10 text-xl text-gray-500 fond-bold">Calendar</h1>
        <button type="button" class="border rounded py-2 px-4 mr-5" @click="handleRest">Today</button>
        <button type="button" @click="handlePrevMonth">
            <span class="material-icons-outlined cursor-pointer text-gray-600 mx-2">chevron_left</span>
        </button>
        <button type="button" @click="handleNextMonth">
            <span class="material-icons-outlined cursor-pointer text-gray-600 mx-2">chevron_right</span>
        </button>
        <h2 class="ml-4 text-xl text-gray-500 font-bold">{{ currentYearAndMonth }}</h2>
    </header>
</template>
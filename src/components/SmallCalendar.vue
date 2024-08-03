<script setup lang="ts">
    import { ref, computed, watchEffect } from 'vue';
    import dayjs from 'dayjs';
    import getMonth from '../utils/getMonth';
    import getDayClass from '../utils/getDayClass';

    import { useGlobalStore } from '../stores/useGlobalStore';
    const globalStore = useGlobalStore();
    
    const currentMonthIdx = ref<number>(dayjs().month());
    const currentMonth = ref<any>(getMonth());
    
    const setCurrentMonthIdx = (idx: number) => {
        currentMonthIdx.value = idx;
    };
    
    const setCurrentMonth = (idx: number) => {
        currentMonth.value = getMonth(idx);
    };
    
    const handlePrevMonth = () => {
        setCurrentMonthIdx(currentMonthIdx.value - 1);
    };
    
    const handleNextMonth = () => {
        setCurrentMonthIdx(currentMonthIdx.value + 1);
    };
    
    const handleButtonClass = (day:any, daySelected: any) => {
        return `py-1 w-full ${getDayClass(day, daySelected)}`
    };
    
    const currentYearAndMonth = computed(() => dayjs(new Date(dayjs().year(), currentMonthIdx.value)).format("MMMM YYYY"));
        
    watchEffect(() => {
        setCurrentMonthIdx(globalStore.monthIndex);
        setCurrentMonth(globalStore.monthIndex);
    });
</script>


<template>
    <div class="mt-9">
        <header class="flex justify-between">
            <p class="text-gray-500 font-bold">{{ currentYearAndMonth }}</p>
            <div>
                <button type="button" @click="handlePrevMonth">
                    <span class="material-icons-outlined cursor-pointer text-gray-600 mx-2">chevron_left</span>
                </button>
                <button type="button" @click="handleNextMonth">
                    <span class="material-icons-outlined cursor-pointer text-gray-600 mx-2">chevron_right</span>
                </button>
            </div>
        </header>
        <div class="grid grid-cols-7 grid-rows-6">
            <span class="text-sm py-1 text-center" v-for="(day, i) in currentMonth[0]" :key="i">
                {{ day.format("dd").charAt(0) }}
            </span>
            <template v-for="(row) in currentMonth">
                <button type="button"
                    v-for="(day, i) in row" :key="i" :class="handleButtonClass(day, globalStore.daySelected)"
                    @click="globalStore.setSmallCalendarMonth(currentMonthIdx);
                            globalStore.setDaySelected(day)">
                    <span class="text-sm">{{ day.format("D") }} </span>
                </button>
            </template>
            
        </div>
    </div>
</template>
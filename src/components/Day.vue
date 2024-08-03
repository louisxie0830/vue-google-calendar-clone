<script setup lang="ts">
    import { ref, defineProps, watch, useAttrs } from 'vue';
    import dayjs from 'dayjs';
    import { useGlobalStore } from '../stores/useGlobalStore';
    const globalStore = useGlobalStore();
    
    const props = defineProps<{ day: any; rowIdx: number }>();
    const $attrs = useAttrs();
    const dayEvents = ref([]);
    
    const setDayEvents = (event: any) => {
        dayEvents.value = event;
    };
    
    const getCurrentDayClass = () => {
        return props.day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? 
            "text-sm p-1 my-1 text-center bg-blue-600 text-white rounded-full w-7" :
            "text-sm p-1 my-1 text-center";
    };
    
    const getDayEventClass = (label:any) => {
        return `bg-${label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`;
    };
    
    watch(() => [globalStore.filteredEvents, props.day], ([filteredEventsNewValue, dayNewValue]) => {
        const events = filteredEventsNewValue.filter((evt: any) => {
            return dayjs(evt.day).format("DD-MM-YY") === dayNewValue.format("DD-MM-YY")
        });
        setDayEvents(events);
    }, { deep: true });
</script>

<template>
    <div v-bind="$attrs" class="border border-gray-200 flex flex-col">
        <header class="flex flex-col items-center">
            <p v-if="rowIdx === 0" class="text-sm mt-1">{{ day.format("ddd").toUpperCase() }}</p>
            <p :class="getCurrentDayClass()">{{ day.format("DD") }}</p>
        </header>
        <div class="flex-1 cursor-pointer" 
            @click.prevent="globalStore.setDaySelected(day); globalStore.setShowEventModal(true);">
            <div v-for="(evt, idx) in dayEvents" :key="idx" :class="getDayEventClass(evt.label)" @click.prevent="globalStore.setSelectedEvent(evt)">
                {{ evt.title }}
            </div>
        </div>
    </div>
</template>
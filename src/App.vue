<script setup lang="ts">
  import { ref, onMounted, watchEffect } from 'vue'
  import getMonth from './utils/getMonth';
  import CalendarHeader from './components/CalendarHeader.vue'
  import Sidebar from './components/Sidebar.vue'
  import Month from './components/Month.vue'
  import EventModal from './components/EventModal.vue'
  import dayjs from 'dayjs';
  
  import { useGlobalStore } from './stores/useGlobalStore';
  const globalStore = useGlobalStore();
  const currentMonth = ref(getMonth());
  
  const setCurrentMonth = (index) => {
    currentMonth.value = getMonth(index);
  };
  
  
  watchEffect(() => {
    setCurrentMonth(globalStore.monthIndex);
  });
  
  onMounted(() => {
    globalStore.setMonthIndex(dayjs().month());
    globalStore.setCurrentMonth(getMonth(globalStore.monthIndex))
  });
</script>

<template>
  <EventModal v-if="globalStore.showEventModal" />
  <div className="h-screen flex flex-col">
    <CalendarHeader />
    <div className="flex flex-1">
      <Sidebar />
      <Month :month="currentMonth"/>
    </div>
  </div>
</template>

<style scoped>
</style>

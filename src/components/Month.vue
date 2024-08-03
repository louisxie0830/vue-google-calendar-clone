<script setup lang="ts">
    import Day from './Day.vue';
    import { defineProps, useAttrs } from 'vue';
    const props = defineProps<{ month: any; }>();
    const $attrs = useAttrs();
</script>


<template>
    <div v-bind="$attrs" class="flex-1 grid grid-cols-7 grid-rows-5">
        <template v-for="(row, i) in props.month">
            <Day v-for="(day, idx) in row" :day="day" :row-idx="i" :key="idx"></Day>
        </template>
    </div>
</template>
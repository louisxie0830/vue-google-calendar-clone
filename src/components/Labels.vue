
<script setup lang="ts">
    import { useGlobalStore } from '../stores/useGlobalStore';
    const globalStore = new useGlobalStore();
    const handleInputClass = (lbl) => {
        return `form-checkbox h-5 w-5 text-${lbl}-400 rounded focus:ring-0 cursor-pointer`
    };
</script>

<template>
    <p class="text=gray-500 font-bold mt-10">Label</p>
    <label class="items-center mt-3 block" v-for="({ label: lbl, checked }, idx) in globalStore.labels" :key="idx">
        <input
            type="checkbox"
            :checked=checked
            @click="globalStore.updateLabel({ label: lbl, checked: !checked })"
            :class=handleInputClass(lbl)
        />
        <span className="ml-2 text-gray-700 capitalize">{{ lbl }}</span>
    </label>
</template>
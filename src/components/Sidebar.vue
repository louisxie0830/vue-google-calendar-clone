<script setup lang="ts">
    import CreateEventButton from './CreateEventButton.vue'
    import SmallCalendar from './SmallCalendar.vue'
    import Labels from './Labels.vue'
</script>

<template>
    <aside class="border p-5 w-64">
        <CreateEventButton/>
        <SmallCalendar/>
        <Labels/>
    </aside>
</template>
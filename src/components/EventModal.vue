<script setup lang="ts">
import { ref } from 'vue';
import { useGlobalStore } from '../stores/useGlobalStore';
const globalStore = useGlobalStore();

const labelsClasses = ref(["indigo", "gray", "green", "blue", "red", "purple"]);

const title = ref(globalStore.selectedEvent?.title || '');

const description = ref(globalStore.selectedEvent?.description || '');

const selectedLabel = ref(globalStore.selectedEvent ?
    labelsClasses.value.find((lbl) => lbl === globalStore.selectedEvent.label)
    : labelsClasses.value[0]);

const getLabelClass = (label: string) => {
    return `bg-${label}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`
}

const setSelectedLabel = (labelClass: string) => {
    selectedLabel.value = labelClass;
}


const handleSubmit = () => {
    const calendarEvent = {
        title: title.value,
        description: description.value,
        label: selectedLabel.value,
        day: globalStore.daySelected.valueOf(),
        id: globalStore.selectedEvent ? globalStore.selectedEvent.id : Date.now()
    };

    if (globalStore.selectedEvent) {
        globalStore.dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
        globalStore.dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    globalStore.setShowEventModal(false);
};
</script>

<template>
    <div class="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
        <form class="bg-white rounded-log shadow-2x1 w-1/4">
            <header class="bg-gray-100 px-4 py-2 flex justify-between items-center">
                <span class="material-icons-outlined text-gray-400">
                    drag_handle
                </span>
                <div>
                    <span
                        v-if="globalStore.selectedEvent"
                        class="material-icons-outlined text-gray-400 cursor-pointer"
                        @click="globalStore.dispatchCalEvent({ type: 'delete', payload: globalStore.selectedEvent }); globalStore.setShowEventModal(false)"
                    >delete</span>
                    <button
                        type="button"
                        @click="globalStore.setShowEventModal(false)"
                    >
                        <span class="material-icons-outlined text-gray-400">close</span>
                    </button>
                </div>
            </header>
            <div class="p-3">
                <div class="grid grid-cols-1/5 items-end gap-y-7">
                    <div></div>
                    <input
                        class="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                        type="text"
                        name="title"
                        placeholder="Add title"
                        v-model="title"
                        required
                    />
                    <span class="material-icons-outlined text-gray-400">schedule</span>
                    <p v-if="globalStore.daySelected">{{ globalStore.daySelected.format("dddd, MMMM DD") }}</p>
                    <span class="material-icons-outlined text-gray-400">segment</span>
                    <input
                        type="text"
                        name="description"
                        placeholder="Add a description"
                        v-model="description"
                        required
                        class="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                    />
                    <span class="material-icons-outlined text-gray-400">bookmark_border</span>
                    <div class="flex gap-x-2">
                        <span v-for="(lblClass, i) in labelsClasses" :class="getLabelClass(lblClass)" @click="setSelectedLabel(lblClass)" :key="i">
                            <span v-if="selectedLabel === lblClass" class="material-icons-outlined text-white text-sm">check</span>
                        </span>
                    </div>
                </div>
            </div>
            <footer class="flex justify-end border-t p-3 mt-5">
                <button
                    type="submit"
                    class="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
                    @click.prevent="handleSubmit"
                >Save</button>
            </footer>
        </form>
    </div>
</template>
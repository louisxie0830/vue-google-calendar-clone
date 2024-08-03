import { ref, computed, watchEffect } from 'vue';
import { defineStore } from 'pinia';
import dayjs, { Dayjs } from 'dayjs';
import getMonth from '../utils/getMonth';

type Event = {
    title: string;
    description: string;
    label: string;
    day: number;
    id: number;
};

type Label = {
    label: string;
    checked: boolean;
};

export const useGlobalStore = defineStore('global', () => {
    const monthIndex = ref<number>(dayjs().month());
    const smallCalendarMonth = ref<number>(0);
    const daySelected = ref<Dayjs | null>(dayjs());
    const showEventModal = ref<boolean>(false);
    const savedEvents = ref<Event[]>([]);
    const selectedEvent = ref<Event | null>(null);
    const labels = ref<Label[]>([]);
    const currentMonth = ref<any>(getMonth());

    const filteredEvents = computed(() => {
        return savedEvents.value.filter((evt) => labels.value
            .filter((lbl) => lbl.checked)
            .map((lbl) => lbl.label)
            .includes(evt.label)
        );
    });

    
    watchEffect(() => {
        const uniqueLabels = [...new Set(savedEvents.value.map((evt) => evt.label))];

        labels.value = uniqueLabels.map((label) => {
            const currentLabel = labels.value.find((lbl) => lbl.label === label);
            return {
                label,
                checked: currentLabel ? currentLabel.checked : true,
            };
        });
    });


    const setMonthIndex = (index: number) => {
        monthIndex.value = index;
    };

    const setSmallCalendarMonth = (index: number) => {
        smallCalendarMonth.value = index;
    };

    const setDaySelected = (day: Dayjs | null) => {
        daySelected.value = day;
    };

    const setShowEventModal = (value: boolean) => {
        showEventModal.value = value;
    };
    

    const dispatchCalEvent = (event: { type: string; payload: Event }) => {
        switch (event.type) {
            case 'push':
                savedEvents.value.push(event.payload);
                break;
            case 'update':
                savedEvents.value = savedEvents.value.map((evt) => evt.id === event.payload.id ? event.payload : evt);
                break;
            case 'delete':
                savedEvents.value = savedEvents.value.filter((evt) => evt.id !== event.payload.id);
                break;
            default:
                throw new Error();
        }
    };

    const setSelectedEvent = (event: Event | null) => {
        selectedEvent.value = event;
    };

    const setLabels = (newLabels: Label[]) => {
        labels.value = newLabels;
    };

    const updateLabel = (label: Label) => {
        labels.value = labels.value.map((lbl) =>
            lbl.label === label.label ? label : lbl
        );
    };

    const setCurrentMonth = (month: any) => {
        currentMonth.value = month;
    };

    return {
        monthIndex,
        smallCalendarMonth,
        daySelected,
        showEventModal,
        savedEvents,
        selectedEvent,
        labels,
        filteredEvents,
        currentMonth,
        setMonthIndex,
        setSmallCalendarMonth,
        setDaySelected,
        setShowEventModal,
        dispatchCalEvent,
        setSelectedEvent,
        setLabels,
        updateLabel,
        setCurrentMonth
    };
});
<script lang="ts" setup>
import CalendarHeader from "./ui/CalendarHeader.vue";
import CalendarGrid from "./ui/CalendarGrid.vue";
import { useCalendar } from "./composable/useCalendar";
import { computed, toRefs, watch } from "vue";

interface IProps {
  modelValue?: string | Date;
  locale: string;
}

const props = defineProps<IProps>();

const { locale, modelValue } = toRefs(props);

const {
  weekDays,
  MONTHS,
  currentMonth,
  currentYear,
  selectedDate,
  prevMonth,
  nextMonth,
  generatedCalendar,
} = useCalendar(
  locale,
  modelValue.value ? new Date(modelValue.value) : undefined
);

const emits = defineEmits<{ (e: "update:modelValue", value: string): void }>();

const monthName = computed(() => MONTHS.value[currentMonth.value]);

const updateMonth = (type: "up" | "down") => {
  switch (type) {
    case "up": {
      nextMonth();
      break;
    }

    case "down": {
      prevMonth();
      break;
    }
  }
};

watch(
  () => selectedDate.value,
  (newValue) => {
    const strValue = newValue.toLocaleDateString();

    emits("update:modelValue", strValue);
  }
);
</script>

<template>
  <div class="calendar">
    <CalendarHeader
      :monthName="monthName"
      :year="currentYear"
      @update="updateMonth"
    />

    <CalendarGrid
      v-model:day="selectedDate"
      :weekDays="weekDays"
      :calendarDays="generatedCalendar"
    />
  </div>
</template>

<style lang="scss" scoped>
.calendar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 16ox;
  padding: 16px;
  max-width: 400px;
}
</style>

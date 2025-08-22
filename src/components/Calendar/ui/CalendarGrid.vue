<script lang="ts" setup>
import type { ICalendarDate } from "../types/calendar.types";

interface IProps {
  weekDays: string[];
  calendarDays: ICalendarDate[];
}

defineProps<IProps>();

const selectedDay = defineModel<Date>("day");

const selectDay = (day: ICalendarDate) => {
  selectedDay.value = day.date;

  console.log(selectedDay.value);
};
</script>

<template>
  <div class="calendar-grid">
    <div class="calendar-weekdays">
      <div v-for="wday in weekDays" :key="wday">{{ wday }}</div>
    </div>
    <div class="calendar-days">
      <div
        v-for="(day, idx) in calendarDays"
        :key="idx"
        :class="{
          'not-current-month': !day.isCurrentMonth,
          today: day.isToday,
          selected: day.isSelected,
        }"
        @click="selectDay(day)"
      >
        {{ day.date.getDate() }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calendar-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.calendar-days,
.calendar-weekdays {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 16px;
  justify-items: center;
}
.calendar-days > div {
  width: 32px;
  text-align: center;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: color 0.3s ease-in-out, background 0.3s ease-in-out;
}
.calendar-days > div.today {
  background: #f7b731;
  color: #fff;
}
.calendar-days > div.selected {
  background: #3867d6;
  color: #fff;
}
.calendar-days > div.not-current-month {
  color: #bbb;
  opacity: 0.6;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
}
.calendar-weekdays > div {
  font-weight: bold;
  width: 32px;
  text-align: center;
  display: inline-block;
}
</style>

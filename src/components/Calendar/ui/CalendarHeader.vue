import { useCalendar } from '../composable/useCalendar';
<script lang="ts" setup>
import { computed } from "vue";

interface IProps {
  monthName: string;
  year: number;
}

const props = defineProps<IProps>();
const emits = defineEmits<{ (e: "update", type: "up" | "down"): void }>();

const joinedMonthAndYear = computed(() => `${props.monthName} ${props.year}`);

const updateValue = (type: "up" | "down") => {
  emits("update", type);
};
</script>

<template>
  <div class="calendar__header">
    <button @click="updateValue('down')">&#8592;</button>
    <span>{{ joinedMonthAndYear }}</span>
    <button @click="updateValue('up')">&#8594;</button>
  </div>
</template>

<style lang="scss" scoped>
.calendar__header {
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  justify-items: center;

  & > button {
    font-size: 16px;
  }
}
</style>

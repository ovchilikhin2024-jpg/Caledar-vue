<script setup lang="ts">
import { computed, ref } from "vue";
import Calendar from "./components/Calendar/Calendar.vue";
import Select from "./components/Select/Select.vue";

const date = ref<string>();

const locales = [
  { value: "en", name: "en" },
  { value: "ru", name: "ru" },
  { value: "de", name: "de" },
  { value: "ja", name: "ja" },
];
const locale = ref<string>("en");

const updateModelValue = (modelValue: string) => {
  locale.value = modelValue;
};

const str = computed(() => {
  if (!date.value) return `Дата не выбрана`;

  return `Выбранная дата: ${new Date(date.value).toLocaleDateString(
    locale.value
  )}`;
});
</script>

<template>
  <Select
    label="Локализация"
    v-model="locale"
    id="locale"
    name="locale"
    :optionValues="locales"
    optionLabel="name"
    optionValue="value"
    @update:modelValue="updateModelValue"
  />
  <Calendar v-model="date" :locale="locale" />

  <p>{{ str }}</p>
</template>

<style scoped></style>

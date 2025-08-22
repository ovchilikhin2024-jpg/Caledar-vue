<script lang="ts" setup>
import { ref, watch } from "vue";

interface IProps<T> {
  modelValue: keyof T | T;
  id: string;
  name: string;
  label?: string;
  optionValues: T[];
  optionValue: keyof T;
  optionLabel: keyof T;
}
const props = defineProps<IProps<any>>();

const selectedValue = ref(props.modelValue);

const emits = defineEmits<{
  (e: "update:modelValue", modelValue: any): void;
}>();

watch(
  () => selectedValue.value,
  (newValue) => {
    emits("update:modelValue", newValue);
  }
);
</script>

<template>
  <label :for="id">{{ label }}</label>
  <select v-model="selectedValue" :name="name" :id="id">
    <option v-for:="option in optionValues" :value="option[optionValue]">
      {{ option[optionLabel] }}
    </option>
  </select>
</template>

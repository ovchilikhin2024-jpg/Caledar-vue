import { computed, ref, watch, type Ref } from "vue";
import type { ICalendarDate } from "../types/calendar.types";
import { SunLocales } from "../constants/locales";

export const useCalendar = (locale: Ref<string>, initialDate?: Date) => {
  const selectedDate = ref(initialDate ?? new Date());
  const currentYear = ref(selectedDate.value.getFullYear());
  const currentMonth = ref(selectedDate.value.getMonth());

  const today = computed(() => new Date());

  const months = computed(() => {
    const formatter = new Intl.DateTimeFormat(locale.value, { month: "short" });

    const months: string[] = [];

    for (let i = 0; i < 12; i++) {
      const tempDate = new Date(2021, i, 1);

      months.push(formatter.format(tempDate));
    }

    return months;
  });

  const weekDays = computed(() => {
    // Возвращаем массив дней недели согласно локали
    const formatter = new Intl.DateTimeFormat(locale.value, {
      weekday: "short",
    });
    const weekdays: string[] = [];

    // 1970-01-04 это воскресенье
    for (let i = 0; i < 7; i++) {
      const date = new Date(1970, 0, 4 + i);
      weekdays.push(formatter.format(date));
    }

    const isSunLocale = SunLocales.includes(locale.value);

    // сдвигаем массив, если неделя начинается с понедельника
    if (!isSunLocale) {
      return [...weekdays.slice(1), weekdays[0]]; // с понедельника
    }

    return weekdays; // с воскресенья
  });

  const generatedCalendar = computed<ICalendarDate[]>(() => {
    const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1);

    const lastDayOfMonth = new Date(
      currentYear.value,
      currentMonth.value + 1,
      0
    );

    let startDay = firstDayOfMonth.getDay();

    const isSunLocale = SunLocales.includes(locale.value);

    const offset = isSunLocale ? 7 : 6;

    startDay = (startDay + offset) % 7;

    const days: ICalendarDate[] = [];

    for (let i = 0; i < startDay; i++) {
      const date = new Date(
        currentYear.value,
        currentMonth.value,
        -(startDay - i - 1)
      );

      days.push({
        date,
        isCurrentMonth: false,
        isToday: isToday(date),
        isSelected: isSelected(date),
      });
    }

    for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
      const date = new Date(currentYear.value, currentMonth.value, d);

      days.push({
        date,
        isCurrentMonth: true,
        isToday: isToday(date),
        isSelected: isSelected(date),
      });
    }

    while (days.length % 7 !== 0) {
      const date = new Date(
        currentYear.value,
        currentMonth.value + 1,
        days.length - lastDayOfMonth.getDate() - startDay + 1
      );

      days.push({
        date,
        isCurrentMonth: false,
        isToday: isToday(date),
        isSelected: isSelected(date),
      });
    }

    return days;
  });

  watch(
    () => selectedDate.value,
    (newValue) => {
      currentYear.value = newValue.getFullYear();
      currentMonth.value = newValue.getMonth();
    }
  );

  const isSelected = (date: Date): boolean => {
    if (!selectedDate.value) return false;

    return (
      date.getDate() === selectedDate.value.getDate() &&
      date.getMonth() === selectedDate.value.getMonth() &&
      date.getFullYear() === selectedDate.value.getFullYear()
    );
  };

  const isToday = (date: Date): boolean => {
    return (
      date.getDate() === today.value.getDate() &&
      date.getMonth() === today.value.getMonth() &&
      date.getFullYear() === today.value.getFullYear()
    );
  };

  const prevMonth = () => {
    if (currentMonth.value === 0) {
      currentMonth.value = 11;
      currentYear.value -= 1;
    } else {
      currentMonth.value -= 1;
    }
  };

  const nextMonth = () => {
    if (currentMonth.value === 11) {
      currentMonth.value = 0;
      currentYear.value += 1;
    } else {
      currentMonth.value += 1;
    }
  };

  return {
    selectedDate,
    currentMonth,
    currentYear,
    generatedCalendar,
    MONTHS: months,
    weekDays,
    prevMonth,
    nextMonth,
  };
};

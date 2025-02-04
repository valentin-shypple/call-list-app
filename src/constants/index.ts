export type SortFilterValue = "date" | "duration" | "";
export type OrderFilterValue = "ASC" | "DESC" | "";

interface Column {
  id:
    | "blank"
    | "type"
    | "date"
    | "employee"
    | "call"
    | "source"
    | "estimate"
    | "duration";
  label: string;
  minWidth?: number;
  align?: "right";
  className?: string;
  sortValue?: SortFilterValue;
}

export const Columns: readonly Column[] = [
  { id: "blank", label: "", minWidth: 30, className: "blank" },
  { id: "type", label: "Тип", minWidth: 50 },
  { id: "date", label: "Время", minWidth: 84, sortValue: "date" },
  {
    id: "employee",
    label: "Сотрудник",
    minWidth: 125,
  },
  {
    id: "call",
    label: "Звонок",
    minWidth: 321,
  },
  {
    id: "source",
    label: "Источник",
    minWidth: 210,
  },
  {
    id: "estimate",
    label: "Оценка",
    minWidth: 106,
  },
  {
    id: "duration",
    label: "Длительность",
    minWidth: 457,
    align: "right",
    sortValue: "duration",
  },
];

export const Estimates = [
  {
    value: "Плохо",
    color: "#EA1A4F",
    text: "#EA1A4F",
    fill: "#fee9ef",
  },
  {
    value: "Хорошо",
    color: "#ADBFDF",
    text: "#132945",
    fill: "#d7e4fb",
  },
  {
    value: "Отлично",
    color: "#28A879",
    text: "#28A879",
    fill: "#dbf8f0",
  },
  {
    value: "",
    color: "",
    text: "",
    fill: "",
  },
];

export const CallTypes = [
  {
    value: "",
    name: "Все типы",
  },
  {
    value: "1",
    name: "Входящие",
  },
  {
    value: "0",
    name: "Исходящие",
  },
];

export const DateFilterItems = [
  {
    value: "3",
    name: "3 дня",
  },
  {
    value: "7",
    name: "Неделя",
  },
  {
    value: "30",
    name: "Месяц",
  },
  {
    value: "365",
    name: "Год",
  },
];

export const DateFilterRanges = [3, 7, 30, 365];

import { makeAutoObservable } from "mobx";
import { SortFilterValue, OrderFilterValue } from "./constants";

class FiltersStore {
  dateFilterValue: string;
  dateStart: string;
  dateEnd: string;
  inOut: number | string;
  sortBy: SortFilterValue;
  order: OrderFilterValue;
  offset: number;
  currentRecord: number | null;

  constructor() {
    makeAutoObservable(this);
    this.dateFilterValue = "3";
    this.dateStart = "";
    this.dateEnd = "";
    this.inOut = "";
    this.sortBy = "";
    this.order = "";
    this.offset = 0;
    this.currentRecord = null;
  }

  setOffset(value: number) {
    this.offset = value;
  }

  setCurrentRecord(value: number | null) {
    this.currentRecord = value;
  }

  setDateFilterValue(value: string) {
    this.dateFilterValue = value;
  }

  setDateStart(value: string) {
    this.dateStart = value;
  }

  setDateEnd(value: string) {
    this.dateEnd = value;
  }

  setInOut(value: string) {
    this.inOut = value;
  }

  setSortBy(value: SortFilterValue) {
    this.sortBy = value;
  }

  setOrder(value: OrderFilterValue) {
    this.order = value;
  }
}

export class RootStore {
  filtersStore = new FiltersStore();
}

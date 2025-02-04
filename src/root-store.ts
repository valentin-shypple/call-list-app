import { makeAutoObservable } from "mobx";
import { SortFilterValue, OrderFilterValue } from "./constants";

class FiltersStore {
  dateFilterValue: string;
  dateStart: string;
  dateEnd: string;
  inOut: number | string;
  sortBy: SortFilterValue;
  order: OrderFilterValue;

  constructor() {
    makeAutoObservable(this);
    this.dateFilterValue = "30";
    this.dateStart = "";
    this.dateEnd = "";
    this.inOut = "";
    this.sortBy = "";
    this.order = "";
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

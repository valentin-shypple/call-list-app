import { makeObservable, runInAction } from "mobx";
import { createContext } from "react";
import { SortFilterValue, OrderFilterValue } from "./constants";

class AppData {
  filters: {
    dateFilterValue: string;
    dateStart: string;
    dateEnd: string;
    inOut: number | string;
    sortBy: SortFilterValue;
    order: OrderFilterValue;
  };

  constructor() {
    makeObservable(this);
    this.filters = {
      dateFilterValue: "3",
      dateStart: "",
      dateEnd: "",
      inOut: "",
      sortBy: "",
      order: "",
    };
  }

  setDateFilterValue(value: string) {
    this.filters.dateFilterValue = value;
  }

  setDateStart(value: string) {
    this.filters.dateStart = value;
  }

  setDateEnd(value: string) {
    this.filters.dateEnd = value;
  }

  setInOut(value: string) {
    this.filters.inOut = value;
    console.log(this, "STATE");
  }

  setSortBy(value: SortFilterValue) {
    this.filters.sortBy = value;
    console.log(this, "STATE");
  }

  setOrder(value: OrderFilterValue) {
    this.filters.order = value;
    console.log(this, "STATE");
  }
}

export const appStore = new AppData();
export const AppStoreContext = createContext(appStore);

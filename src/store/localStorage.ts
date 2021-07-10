import { StoredState } from "../types";

const CRONTABS_KEY = "crontabs";

export function restoreTabs() {
  try {
    const tabs = localStorage.getItem(CRONTABS_KEY);
    if (tabs) {
      return JSON.parse(tabs);
    }
  } catch (e) {
    console.error("An error occurred when parsing local storage tabs", e);
  }
  
  return [];
}

export function saveTabs(state: StoredState) {
  try {
    localStorage.setItem(CRONTABS_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("An error occurred when saving tabs to local storage", e);
  }
}
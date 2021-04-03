import { derived, Readable, Writable, writable } from "svelte/store";

function savedStore<T>(name: string, inital: T) {
    let data = localStorage.getItem(name);
    const store = writable<T>(data !== null ? JSON.parse(data) : inital);
    store.subscribe(data => { localStorage.setItem(name, JSON.stringify(data)); });
    return store;
}

export const darkTheme = savedStore("darkTheme", true);



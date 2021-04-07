import { derived, Readable, Writable, writable } from "svelte/store";
import localforage from "localforage";
import type { Transaction } from "./types";

function savedStore<T>(name: string, inital: T) {
    let data = localStorage.getItem(name);
    const store = writable<T>(data !== null ? JSON.parse(data) : inital);
    store.subscribe(data => { localStorage.setItem(name, JSON.stringify(data)); });
    return store;
}

function largeSavedStore<T>(name: string, inital: T, format?: (data:any)=>T) {
    const store = writable<T>(inital);
    localforage.getItem(name).then((data)=>{if(data === null) return; store.set(format ? format(JSON.parse(data as string)): JSON.parse(data as string));});
    store.subscribe(data => { localforage.setItem(name, JSON.stringify(data));});
    return store;
}

export const infoMessages = writable<string[]>([]);
export const darkTheme = savedStore("darkTheme", false);
export const transactions = largeSavedStore<Transaction[]>("transactions", [],(data)=>{
    let cleaned: Transaction[] = [];
        for (const row of data) {
            cleaned.push({
                date: new Date(row.date),
                postedDate: new Date(row.postedDate),
                cardNumber: row.cardNumber,
                description: row.description,
                category: row.category,
                amount: row.amount,
              });
        }
    return cleaned;
});

export const showInfoMessage = (message: string)=>{
    infoMessages.update((messages)=>{messages.push(message); return messages});
}

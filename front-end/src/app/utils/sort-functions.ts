import { Task } from "../models/Task"

export module SortFunctions {
    export function sortByName(a: Task, b: Task): number {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    }

    export function sortByCreationDate(a: Task, b: Task): number {
        if (a.creationDate < b.creationDate) return -1;
        if (a.creationDate > b.creationDate) return 1;
        return 0;
    }

    export function sortByStatus(a: Task, b: Task): number {
        if (a.status < b.status) return -1;
        if (a.status > b.status) return 1;
        return 0;
    }

}
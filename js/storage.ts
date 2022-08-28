import { IGroup, IStorageStation } from "./model.js";
import { State } from "./state.js";

export class LocalStorage {

    private static KEY = 'stationGroups';
    private static groups: IGroup[];

    static getGroups(): IGroup[] {
        if (!LocalStorage.groups) LocalStorage.groups = JSON.parse(localStorage.getItem(LocalStorage.KEY) || '[]');

        return LocalStorage.groups;
    }

    static addStation(station: IStorageStation): void {
        const group = LocalStorage.groups.find(g => g.name === State.group.name) as IGroup;
        if (!group.stations) group.stations = [];
        group.stations.push(station);

        LocalStorage.save();
    }

    static removeStation(station: IStorageStation) {
        const group = LocalStorage.groups.find(g => g.name === State.group.name) as IGroup;
        group.stations?.splice(group.stations.indexOf(station), 1);

        LocalStorage.save();
    }

    static addGroup(group: IGroup): void {
        LocalStorage.groups.push(group);
        LocalStorage.save();
    }

    static removeGroup(group: IGroup): void {
        LocalStorage.groups.splice(LocalStorage.groups.indexOf(group), 1);
        LocalStorage.save();
    }

    private static save = (): void => localStorage.setItem(LocalStorage.KEY, JSON.stringify(LocalStorage.groups));
}

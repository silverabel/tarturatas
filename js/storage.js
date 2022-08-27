import { State } from "./state.js";
export class LocalStorage {
    static getGroups() {
        if (!LocalStorage.groups)
            LocalStorage.groups = JSON.parse(localStorage.getItem(LocalStorage.KEY) || '[]');
        return LocalStorage.groups;
    }
    static addStation(station) {
        const group = LocalStorage.groups.find(g => g.name === State.group.name);
        if (!group.stations)
            group.stations = [];
        group.stations.push(station);
        LocalStorage.save();
    }
    static removeStation(station) {
        var _a;
        const group = LocalStorage.groups.find(g => g.name === State.group.name);
        (_a = group.stations) === null || _a === void 0 ? void 0 : _a.splice(group.stations.indexOf(station), 1);
        LocalStorage.save();
    }
    static addGroup(name) {
        LocalStorage.groups.push({ name });
        LocalStorage.save();
    }
    static removeGroup(group) {
        LocalStorage.groups.splice(LocalStorage.groups.indexOf(group), 1);
        LocalStorage.save();
    }
}
LocalStorage.KEY = 'stationGroups';
LocalStorage.save = () => localStorage.setItem(LocalStorage.KEY, JSON.stringify(LocalStorage.groups));

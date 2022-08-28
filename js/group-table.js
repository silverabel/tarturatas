import { State } from "./state.js";
import { LocalStorage } from "./storage.js";
export class GroupTable {
    static init() {
        const templateRow = GroupTable.container.querySelector('template').content.querySelector('tr');
        const tableBody = GroupTable.container.querySelector('tbody');
        LocalStorage.getGroups().forEach((group) => {
            var _a, _b;
            const row = templateRow.cloneNode(true);
            row.group = group;
            row.querySelector('td.name').innerHTML = group.name;
            row.querySelector('td.count').innerHTML = ((_b = (_a = group.stations) === null || _a === void 0 ? void 0 : _a.length) === null || _b === void 0 ? void 0 : _b.toString()) || '0';
            row.querySelector('td.delete button').onclick = (event) => GroupTable.removeGroup(group, event);
            row.onclick = () => State.showStationTable(group);
            tableBody.insertBefore(row, GroupTable.addGroupRow);
        });
        GroupTable.initialized = true;
        GroupTable.addGroupRow.hidden = false;
    }
    static setHidden(hidden) {
        GroupTable.container.hidden = hidden;
    }
    static addGroup() {
        var _a;
        const name = (_a = GroupTable.container.querySelector('input')) === null || _a === void 0 ? void 0 : _a.value;
        if (name)
            LocalStorage.addGroup(name);
    }
    static removeGroup(group, event) {
        event.stopPropagation();
        confirm('Kustuta?') && LocalStorage.removeGroup(group);
    }
}
GroupTable.initialized = false;
GroupTable.container = document.querySelector('#group-container');
GroupTable.addGroupRow = GroupTable.container.querySelector('#add-group');

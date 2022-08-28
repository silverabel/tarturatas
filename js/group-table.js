import { State } from "./state.js";
import { LocalStorage } from "./storage.js";
export class GroupTable {
    static init() {
        LocalStorage.getGroups().forEach(GroupTable.addRow);
        GroupTable.initialized = true;
        GroupTable.addGroupRow.hidden = false;
    }
    static setHidden(hidden) {
        GroupTable.container.hidden = hidden;
    }
    static addGroup() {
        var _a;
        const name = (_a = GroupTable.container.querySelector('input')) === null || _a === void 0 ? void 0 : _a.value;
        if (name) {
            const group = { name };
            LocalStorage.addGroup(group);
            GroupTable.addRow(group);
        }
    }
    static addRow(group) {
        var _a, _b;
        const row = GroupTable.templateRow.cloneNode(true);
        row.group = group;
        row.querySelector('td.name').innerHTML = group.name;
        row.querySelector('td.count').innerHTML = ((_b = (_a = group.stations) === null || _a === void 0 ? void 0 : _a.length) === null || _b === void 0 ? void 0 : _b.toString()) || '0';
        row.querySelector('td.delete button').onclick = (event) => GroupTable.remove(row, event);
        row.onclick = () => State.showStationTable(group);
        GroupTable.tableBody.insertBefore(row, GroupTable.addGroupRow);
    }
    static remove(row, event) {
        event.stopPropagation();
        if (confirm('Kustuta?')) {
            LocalStorage.removeGroup(row.group);
            row.remove();
        }
    }
}
GroupTable.initialized = false;
GroupTable.container = document.querySelector('#group-container');
GroupTable.addGroupRow = GroupTable.container.querySelector('#add-group');
GroupTable.templateRow = GroupTable.container.querySelector('template').content.querySelector('tr');
GroupTable.tableBody = GroupTable.container.querySelector('tbody');

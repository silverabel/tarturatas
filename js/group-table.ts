import { Fetcher } from "./fetcher.js";
import { IGroup, IStation, IStationDetail, IStorageStation } from "./model.js";
import { State } from "./state.js";
import { StationTable } from "./station-table.js";
import { LocalStorage } from "./storage.js";

interface IRow extends HTMLTableRowElement {

    group: IGroup;
}

export class GroupTable {

    static initialized = false;
    private static container = document.querySelector('#group-container') as HTMLDivElement;
    private static addGroupRow = GroupTable.container.querySelector('#add-group') as HTMLTableRowElement;
    private static templateRow = (GroupTable.container.querySelector('template') as HTMLTemplateElement).content.querySelector('tr') as HTMLTableRowElement;
    private static tableBody = (GroupTable.container.querySelector('tbody') as HTMLTableSectionElement);

    static init(): void {
        LocalStorage.getGroups().forEach(GroupTable.addRow);

        GroupTable.initialized = true;
        GroupTable.addGroupRow.hidden = false;
    }

    static setHidden(hidden: boolean): void {
        GroupTable.container.hidden = hidden;
    }

    static addGroup(): void {
        const name = GroupTable.container.querySelector('input')?.value;
        if (name) {
            const group: IGroup = { name };
            LocalStorage.addGroup(group);
            GroupTable.addRow(group);
        }
    }

    private static addRow(group: IGroup): void {
        const row = GroupTable.templateRow.cloneNode(true) as IRow;
        row.group = group;
        (row.querySelector('td.name') as HTMLTableCellElement).innerHTML = group.name;
        (row.querySelector('td.count') as HTMLTableCellElement).innerHTML = group.stations?.length?.toString() || '0';
        (row.querySelector('td.delete button') as HTMLButtonElement).onclick = (event: MouseEvent) => GroupTable.remove(row, event);
        row.onclick = () => State.showStationTable(group);

        GroupTable.tableBody.insertBefore(row, GroupTable.addGroupRow);
    }

    private static remove(row: IRow, event: MouseEvent): void {
        event.stopPropagation();
        if (confirm('Kustuta?')) {
            LocalStorage.removeGroup(row.group);
            row.remove();
        }
    }
}
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

    static init(): void {
        const templateRow = (GroupTable.container.querySelector('template') as HTMLTemplateElement).content.querySelector('tr') as HTMLTableRowElement;
        const tableBody = (GroupTable.container.querySelector('tbody') as HTMLTableSectionElement);

        LocalStorage.getGroups().forEach((group: IGroup) => {
            const row = templateRow.cloneNode(true) as IRow;
            row.group = group;
            (row.querySelector('td.name') as HTMLTableCellElement).innerHTML = group.name;
            (row.querySelector('td.count') as HTMLTableCellElement).innerHTML = group.stations?.length?.toString() || '0';
            (row.querySelector('td.delete button') as HTMLButtonElement).onclick = (event: MouseEvent) => GroupTable.removeGroup(group, event);
            row.onclick = () => GroupTable.showStations(group);

            tableBody.append(row);
        });

        GroupTable.initialized = true;
    }

    static setHidden(hidden: boolean): void {
        GroupTable.container.hidden = hidden;
    }

    static addGroup(): void {
        const name = GroupTable.container.querySelector('input')?.value;
        if (name) LocalStorage.addGroup(name);
    }

    private static removeGroup(group: IGroup, event: MouseEvent): void {
        event.stopPropagation();
        confirm('Kustuta?') && LocalStorage.removeGroup(group);
    }

    private static showStations(group: IGroup): void {
        State.showStationTable(group);
    }
}
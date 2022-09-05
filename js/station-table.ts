import { Fetcher } from "./fetcher.js";
import { IGroup, IStation, IStationDetail, IStorageStation } from "./model.js";
import { Select } from "./select.js";
import { LocalStorage } from "./storage.js";

interface IRow extends HTMLTableRowElement {

    station: IStorageStation;
}

export class StationTable {

    private static container = document.querySelector('#station-container') as HTMLDivElement;

    private static body = StationTable.container.querySelector('tbody') as HTMLTableSectionElement;
    private static template = StationTable.container.querySelector('template') as HTMLTemplateElement;
    private static rows: Map<string, IRow> = new Map();

    static init(): void {
        LocalStorage.groups.flatMap(group => group.stations).forEach(station => {
            station && !StationTable.rows.has(station.id) && StationTable.addRow(station);
        });
    }

    static setGroup(group: IGroup): void {
        [...StationTable.rows.values()].forEach(row => row.remove());
        group.stations?.map(({ id }) => StationTable.rows.get(id)).forEach(row => StationTable.body.insertBefore(row as IRow, StationTable.body.firstChild));
    }

    static addStation(station: IStation): void {
        if (!StationTable.rows.has(station.id)) {
            StationTable.addRow(station);
            StationTable.setTotals(station);
        }

        StationTable.body.insertBefore(StationTable.rows.get(station.id) as IRow, StationTable.body.firstChild);
    }

    static setTotals(...stations: IStation[]): void {
        StationTable.rows.forEach((row: IRow) => {
            const station = stations.find(s => s.id === row.station.id);
            if (station) (row.querySelector('td.total') as HTMLTableCellElement).innerHTML = `${station?.primaryLockedCycleCount} + ${station?.secondaryLockedCycleCount}`;
        });
    }

    static setDetails(row: IRow): void {
        Fetcher.get(row.station.id).then((station: IStationDetail) => station.lockedCycleTypeCount.forEach(({ cycleType, countPrimary, countSecondary }) => {
            (row.querySelector('td.' + cycleType.toLowerCase()) as HTMLTableCellElement).innerHTML = `${countPrimary} + ${countSecondary}`;
        }));
    }

    static setHidden(hidden: boolean): void {
        StationTable.container.hidden = hidden;
    }
    
    static addRow(station: IStorageStation): void {
        const row = (StationTable.template.content.querySelector('tr') as HTMLTableRowElement).cloneNode(true) as IRow;
        row.station = station;
        (row.querySelector('td.name') as HTMLTableCellElement).innerHTML = station.description;
        row.onclick = () => confirm('Kustuta?') && StationTable.remove(row);
        StationTable.setDetails(row);

        StationTable.rows.set(station.id, row);
    }

    private static remove(row: IRow): void {
        LocalStorage.removeStation(row.station);
        row.remove();
    }
}
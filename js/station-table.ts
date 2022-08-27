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
    private static rows: IRow[];

    static async init(group: IGroup): Promise<void> {
        StationTable.rows = [];

        group.stations?.forEach(station => {
            const row = (StationTable.template.content.querySelector('tr') as HTMLTableRowElement).cloneNode(true) as IRow;
            row.station = station;
            (row.querySelector('td.name') as HTMLTableCellElement).innerHTML = station.description;
            row.onclick = () => confirm('Kustuta?') && LocalStorage.removeStation(station);
            StationTable.setDetails(row);
            StationTable.body.insertBefore(row, StationTable.body.firstChild);

            StationTable.rows.push(row);
        });


        Fetcher.getAll().then((stations: IStation[]) => {
            if (!Select.initialized) Select.init(stations);
            StationTable.setTotals(stations);
        });
    }

    static setTotals(stations: IStation[]): void {
        StationTable.rows.forEach((row: IRow) => {
            const station = stations.find(s => s.id === row.station.id);
            (row.querySelector('td.total') as HTMLTableCellElement).innerHTML = `${station?.primaryLockedCycleCount} + ${station?.secondaryLockedCycleCount}`;
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
}
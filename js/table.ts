import { Fetcher } from "./fetcher.js";
import { IStation, IStationDetail } from "./model.js";
import { Storage } from "./storage.js";

interface IRow extends HTMLTableRowElement {

    station: IStation;
}

export class Table {

    private static BODY = document.querySelector('tbody') as HTMLTableSectionElement;
    private static TEMPLATE = document.querySelector('template') as HTMLTemplateElement;
    private static ROWS: IRow[] = [];

    static init(): void {
        Storage.get().forEach((station: IStation) => {
            const row = (Table.TEMPLATE.content.querySelector('tr') as HTMLTableRowElement).cloneNode(true) as IRow;
            row.station = station;
            (row.querySelector('td.name') as HTMLTableCellElement).innerHTML = station.description;

            Table.ROWS.push(row);
        });

        Table.BODY.append(...Table.ROWS.values());
    }

    static setTotals(stations: IStation[]): void {
        Table.ROWS.forEach((row: IRow) => {
            const station = stations.find(s => s.id === row.station.id);
            (row.querySelector('td.total') as HTMLTableCellElement).innerHTML = `${station?.primaryLockedCycleCount} + ${station?.secondaryLockedCycleCount}`;
        });
    }

    static setDetails(): void {
        Table.ROWS.forEach((row: IRow) => {
            Fetcher.get(row.station.id).then(({ lockedCycleTypeCount }) => lockedCycleTypeCount.forEach(({ cycleType, countPrimary, countSecondary }) => {
                (row.querySelector('td.' + cycleType.toLowerCase()) as HTMLTableCellElement).innerHTML = `${countPrimary} + ${countSecondary}`;
            }));
        });
    }
}
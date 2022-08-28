import { Fetcher } from "./fetcher.js";
import { IStation } from "./model.js";
import { StationTable } from "./station-table.js";
import { LocalStorage } from "./storage.js";

interface IOption extends HTMLOptionElement {

    station: IStation;
}

export class Select {

    static initialized = false;
    private static element = document.querySelector('select') as HTMLSelectElement;

    static async init(stations: IStation[]) {
        Select.element.onchange = Select.addStation;

        const options: IOption[] = stations.map((station: IStation) => {
            const option = document.createElement('option') as IOption;
            option.station = station;
            option.innerHTML = station.description;

            return option;
        });

        Select.element.append(...options);

        Select.initialized = true;
    }
    
    private static addStation(): void {
        const station: IStation = (Select.element.options[Select.element.selectedIndex] as IOption).station;
        LocalStorage.addStation(station);
        StationTable.addRow(station);
        StationTable.setTotals(station);
    }
}
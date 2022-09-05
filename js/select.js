import { StationTable } from "./station-table.js";
import { LocalStorage } from "./storage.js";
export class Select {
    static async init(stations) {
        Select.element.onchange = Select.addStation;
        const options = stations.map((station) => {
            const option = document.createElement('option');
            option.station = station;
            option.innerHTML = station.description;
            return option;
        });
        Select.element.append(...options);
    }
    static addStation() {
        const station = Select.element.options[Select.element.selectedIndex].station;
        LocalStorage.addStation(station);
        StationTable.addStation(station);
    }
}
Select.element = document.querySelector('select');

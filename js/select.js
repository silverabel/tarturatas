import { LocalStorage } from "./storage.js";
export class Select {
    static async init(stations) {
        Select.element.onchange = () => LocalStorage.addStation(Select.element.options[Select.element.selectedIndex].station);
        const options = stations.map((station) => {
            const option = document.createElement('option');
            option.station = station;
            option.innerHTML = station.description;
            return option;
        });
        Select.element.append(...options);
        Select.initialized = true;
    }
}
Select.initialized = false;
Select.element = document.querySelector('select');

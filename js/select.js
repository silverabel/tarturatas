import { Storage } from "./storage.js";
export class Select {
    static async init(stations) {
        Select.ELEMENT.onchange = () => Storage.add(Select.ELEMENT.options[Select.ELEMENT.selectedIndex].station);
        const options = stations.map((station) => {
            const option = document.createElement('option');
            option.station = station;
            option.innerHTML = station.description;
            return option;
        });
        Select.ELEMENT.append(...options);
    }
}
Select.ELEMENT = document.querySelector('select');

import { Fetcher } from "./fetcher.js";
import { IStation } from "./model.js";
import { Storage } from "./storage.js";

interface IOption extends HTMLOptionElement {

    station: IStation;
}

export class Select {

    private static ELEMENT = document.querySelector('select') as HTMLSelectElement;

    static async init(stations: IStation[]) {
        Select.ELEMENT.onchange = () => Storage.add((Select.ELEMENT.options[Select.ELEMENT.selectedIndex] as IOption).station);

        const options: IOption[] = stations.map((station: IStation) => {
            const option = document.createElement('option') as IOption;
            option.station = station;
            option.innerHTML = station.description;

            return option;
        });

        Select.ELEMENT.append(...options);
    }
}
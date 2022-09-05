import { Fetcher } from "./fetcher.js";
import { GroupTable } from "./group-table.js";
import { IStation } from "./model.js";
import { Select } from "./select.js";
import { State } from "./state.js";
import { StationTable } from "./station-table.js";
import { LocalStorage } from "./storage.js";

navigator.serviceWorker?.register('./serviceWorker.js')
    .then((registration: ServiceWorkerRegistration) => console.log('ServiceWorker registration successful with scope: ', registration.scope))
    .catch(error => console.log('ServiceWorker registration failed: ', error));

window.onpopstate = State.onHistoryChange;
LocalStorage.init();
GroupTable.init();
StationTable.init();

Fetcher.getAll().then((stations: IStation[]) => {
    Select.init(stations);
    StationTable.setTotals(...stations);
});

State.showGroupTable();

(window as any).addGroup = (): void => GroupTable.addGroup();

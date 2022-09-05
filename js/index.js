var _a;
import { Fetcher } from "./fetcher.js";
import { GroupTable } from "./group-table.js";
import { Select } from "./select.js";
import { State } from "./state.js";
import { StationTable } from "./station-table.js";
import { LocalStorage } from "./storage.js";
(_a = navigator.serviceWorker) === null || _a === void 0 ? void 0 : _a.register('./serviceWorker.js').then((registration) => console.log('ServiceWorker registration successful with scope: ', registration.scope)).catch(error => console.log('ServiceWorker registration failed: ', error));
window.onpopstate = State.onHistoryChange;
LocalStorage.init();
GroupTable.init();
StationTable.init();
Fetcher.getAll().then((stations) => {
    Select.init(stations);
    StationTable.setTotals(...stations);
});
State.showGroupTable();
window.addGroup = () => GroupTable.addGroup();

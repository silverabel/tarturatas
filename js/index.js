import { Fetcher } from "./fetcher.js";
import { GroupTable } from "./group-table.js";
import { Select } from "./select.js";
import { State } from "./state.js";
import { StationTable } from "./station-table.js";
import { LocalStorage } from "./storage.js";
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

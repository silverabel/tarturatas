import { Fetcher } from "./fetcher.js";
import { Select } from "./select.js";
import { Table } from "./table.js";
Table.init();
Fetcher.getAll().then((stations) => {
    Select.init(stations);
    Table.setTotals(stations);
});
Table.setDetails();

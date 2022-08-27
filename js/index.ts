import { GroupTable } from "./group-table.js";
import { State } from "./state.js";

State.showGroupTable();

(window as any).addGroup = (): void => GroupTable.addGroup();
(window as any).showGroupTable = (): void => State.showGroupTable();
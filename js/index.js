import { GroupTable } from "./group-table.js";
import { State } from "./state.js";
State.showGroupTable();
window.addGroup = () => GroupTable.addGroup();
window.showGroupTable = () => State.showGroupTable();

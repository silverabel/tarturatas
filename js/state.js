import { GroupTable } from "./group-table.js";
import { StationTable } from "./station-table.js";
export class State {
    static showStationTable(group) {
        if (State.group !== group)
            StationTable.init(group);
        State.group = group;
        GroupTable.setHidden(true);
        StationTable.setHidden(false);
    }
    static showGroupTable() {
        if (!GroupTable.initialized)
            GroupTable.init();
        StationTable.setHidden(true);
        GroupTable.setHidden(false);
    }
}

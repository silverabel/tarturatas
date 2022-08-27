import { GroupTable } from "./group-table.js";
import { IGroup } from "./model.js";
import { StationTable } from "./station-table.js";

export class State {

    static group: IGroup;

    static showStationTable(group: IGroup): void {
        if (State.group !== group) StationTable.init(group);
        State.group = group;

        GroupTable.setHidden(true);
        StationTable.setHidden(false);
    }

    static showGroupTable(): void {
        if (!GroupTable.initialized) GroupTable.init();
        
        StationTable.setHidden(true);
        GroupTable.setHidden(false);
    }
}
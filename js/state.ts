import { GroupTable } from "./group-table.js";
import { IGroup } from "./model.js";
import { StationTable } from "./station-table.js";

enum View {
    GROUP_TABLE,
    STATION_TABLE,
}

export class State {

    static view = View.GROUP_TABLE;
    static group: IGroup;
    private static historyListener = window.onpopstate = State.onHistoryChange;

    static showStationTable(group: IGroup): void {
        if (State.group?.name !== group.name) StationTable.init(group);
        State.group = group;
        State.view = View.STATION_TABLE;

        history.pushState(group, '');
        State.render();
    }

    static showGroupTable(): void {
        if (!GroupTable.initialized) GroupTable.init();
        State.view = View.GROUP_TABLE;
        
        history.pushState(null, '');
        State.render();
    }

    private static onHistoryChange(event: PopStateEvent): void {
        const group: IGroup = event.state;

        if (group) {
            if (State.group.name !== group.name) StationTable.init(group);
            State.group = group;
            State.view = View.STATION_TABLE;
        } else {
            State.view = View.GROUP_TABLE;
        }

        State.render();
    }

    private static render(): void {
        switch(State.view) {
            case View.GROUP_TABLE:
                StationTable.setHidden(true);
                GroupTable.setHidden(false);
                break;
            case View.STATION_TABLE:
                GroupTable.setHidden(true);
                StationTable.setHidden(false);
        }
    }
}
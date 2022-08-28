import { GroupTable } from "./group-table.js";
import { StationTable } from "./station-table.js";
var View;
(function (View) {
    View[View["GROUP_TABLE"] = 0] = "GROUP_TABLE";
    View[View["STATION_TABLE"] = 1] = "STATION_TABLE";
})(View || (View = {}));
export class State {
    static showStationTable(group) {
        var _a;
        if (((_a = State.group) === null || _a === void 0 ? void 0 : _a.name) !== group.name)
            StationTable.init(group);
        State.group = group;
        State.view = View.STATION_TABLE;
        history.pushState(group, '');
        State.render();
    }
    static showGroupTable() {
        if (!GroupTable.initialized)
            GroupTable.init();
        State.view = View.GROUP_TABLE;
        history.pushState(null, '');
        State.render();
    }
    static onHistoryChange(event) {
        const group = event.state;
        if (group) {
            if (State.group.name !== group.name)
                StationTable.init(group);
            State.group = group;
            State.view = View.STATION_TABLE;
        }
        else {
            State.view = View.GROUP_TABLE;
        }
        State.render();
    }
    static render() {
        switch (State.view) {
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
State.view = View.GROUP_TABLE;
State.historyListener = window.onpopstate = State.onHistoryChange;

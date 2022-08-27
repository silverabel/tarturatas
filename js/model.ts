export interface IGroup {
    
    name: string;
    stations?: IStorageStation[];
}

export interface IStorageStation {

    id: string;
    description: string;
}

export interface IStation extends IStorageStation {

    primaryLockedCycleCount: number;
    secondaryLockedCycleCount: number;
}

export interface IStationDetail extends IStation {

    lockedCycleTypeCount: { cycleType: string; countPrimary: number; countSecondary: number; }[];
}

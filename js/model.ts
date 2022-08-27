export interface IStation {

    id: string;
    description: string;
    primaryLockedCycleCount?: number;
    secondaryLockedCycleCount?: number;
}

export interface IStationDetail extends IStation {

    lockedCycleTypeCount: { cycleType: string; countPrimary: number; countSecondary: number; }[];
}

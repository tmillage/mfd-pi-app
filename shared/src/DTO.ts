export interface ApplicationDTO {
    name: string
    panels: PanelDTO[];
    panelSets: PanelSetDTO[];
}
export interface PanelDTO {
    id: number;
    label: string;
    background: string;
    top: ButtonDTO[];
    left: ButtonDTO[];
    right: ButtonDTO[];
    bottom: ButtonDTO[];
    rocker: RockerDTO[];
}

export interface PanelSetDTO {
    label: string
    panelId: number[];
}

export interface ButtonDTO {
    label: string;
    action: string;
}

export interface RockerDTO {
    top: ButtonDTO;
    bottom: ButtonDTO;
}
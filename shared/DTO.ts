export interface ApplicationDTO {
    name: string
    panels: PanelDTO[];
    panelSets: PanelSetDTO[];
}
export interface PanelDTO {
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
    panels: string[];
}

export interface ButtonDTO {
    label?: string;
    action?: string;
}

export interface RockerDTO {
    label: string;
    top: ButtonDTO;
    bottom: ButtonDTO;
}
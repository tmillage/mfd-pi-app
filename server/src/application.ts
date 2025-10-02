import { ApplicationDTO } from "shared/DTO";

const applications: { [key: string]: ApplicationDTO } = {};
applications["star-citizen"] = LoadStarCitizen();

function Load(name: string) {
    applications[name] =  { 
        name: name,
        panels: [],
        panelSets: []
    }
}

export function Application(name: string):ApplicationDTO {
    if(!applications[name]) {
        Load(name);
    }
    return applications[name];
}

function LoadStarCitizen(): ApplicationDTO {
    return {
        name: "star-citizen",
        panels: [
            {
                label: "Targeting",
                background: "STARCITIZEN_WHITE.png",
                top: [
                    {
                        label: "Pin 1",
                        action: "v_target_toggle_lock_index_1"
                    },
                    {
                        label: "Pin 2",
                        action: "v_target_toggle_lock_index_2"
                    },
                    {
                        label: "Pin 3",
                        action: "v_target_toggle_lock_index_3"
                    },
                    {
                        label: "Unlock",
                        action: "v_target_unlock_selected"
                    }
                ],
                left: [
                    {
                        label: "FRND NR",
                        action: "v_target_cycle_friendly_reset"
                    }
                ],
                right: [
                    {
                        label: "HSTL NR",
                        action: "v_target_cycle_hostile_reset"
                    },
                    {
                        label: "EXIT SEAT",
                        action: "pl_exit"
                    },
                    {
                        label: "Wipe Helmet",
                        action: "visor_wipe"
                    },
                    {
                        label: "Gimbal",
                        action: "v_weapon_gimbal_mode_cycle_fixed_auto"
                    }
                ],
                bottom: [],
                rocker: [
                    {
                        label: "FRND",
                        top: {
                            label: "FRND+",
                            action: "v_target_cycle_friendly_fwd"
                        },
                        bottom: {
                            label: "FRND-",
                            action: "v_target_cycle_friendly_back"
                        }
                    },
                    {
                        label: "HSTL",
                        top: {
                            label: "HSTL+",
                            action: "v_target_cycle_hostile_fwd"
                        },
                        bottom: {
                            label: "HSTL-",
                            action: "v_target_cycle_hostile_back"
                        }
                    },
                    {
                        label: "Lock",
                        top: {
                            label: "Lock",
                            action: "v_lock_all_doors"
                        },
                        bottom: {
                            label: "Unlock",
                            action: "v_unlock_all_doors"
                        }
                    },
                    {
                        label: "Doors",
                        top: {
                            label: "Open",
                            action: "v_open_all_doors"
                        },
                        bottom: {
                            label: "Close",
                            action: "v_close_all_doors"
                        }
                    }
                ]
            },
            {
                label: "Flight",
                background: "STARCITIZEN_WHITE.png",
                top: [
                    {
                        label: "Acpt",
                        action: "ui_notification_accept"
                    },
                    {
                        label: "DcLn",
                        action: "ui_notification_decline"
                    },
                    {
                        label: "",
                        action: ""
                    },
                    {
                        label: "Reset Head",
                        action: "headtrack_recenter_device"
                    },
                    {
                        label: "Head Track",
                        action: "headtrack_enabled"
                    }
                ],
                left: [
                    {
                        label: "Cam",
                        action: "v_view_cycle_fwd"
                    },
                    {
                        label: "Load 1",
                        action: "view_load_view_1"
                    },
                    {
                        label: "Load 2",
                        action: "view_load_view_2"
                    },
                    {
                        label: "Load 3",
                        action: "view_load_view_3"
                    },
                    {
                        label: "Reset Cam",
                        action: "view_reset_saved"
                    }
                ],
                right: [
                    {
                        label: "Cycle CFG",
                        action: "v_transform_cycle"
                    },
                    {
                        label: "VTOL",
                        action: "v_toggle_vtol"
                    },
                    {
                        label: "Lights",
                        action: "v_lights"
                    },
                    {
                        label: "ATC",
                        action: "v_atc_request"
                    },
                    {
                        label: "Auto Land",
                        action: "v_autoland"
                    }
                ],
                bottom: [
                    {
                        label: "Wep Pwr",
                        action: "v_power_toggle_weapons"
                    },
                    {
                        label: "Shld Pwr",
                        action: "v_power_toggle_shields"
                    },
                    {
                        label: "Eng Pwr",
                        action: "v_power_toggle_thrusters"
                    },
                    {
                        label: "Flt Rdy",
                        action: "v_flightready"
                    },
                    {
                        label: "Gear",
                        action: "v_toggle_landing_system"
                    }
                ],
                rocker: [
                    {
                        label: "FOV",
                        top: {
                            label: "FOV+",
                            action: "view_fov_in"
                        },
                        bottom: {
                            label: "FOV-",
                            action: "view_fov_out"
                        }
                    },
                    {
                        label: "PNG",
                        top: {
                            label: "PNG+",
                            action: "v_inc_scan_focus_level"
                        },
                        bottom: {
                            label: "PNG-",
                            action: "v_dec_scan_focus_level"
                        }
                    },
                    {
                        label: "CNTR",
                        top: {
                            label: "CNTR+",
                            action: "v_weapon_countermeasure_decoy_burst_increase"
                        },
                        bottom: {
                            label: "CNTR-",
                            action: "v_weapon_countermeasure_decoy_burst_decrease"
                        }
                    },
                    {
                        label: "CFG",
                        top: {
                            label: "CFG+",
                            action: "v_transform_deploy"
                        },
                        bottom: {
                            label: "CFG-",
                            action: "v_transform_retract"
                        }
                    }
                ]
            },
            {
                label: "Emotes",
                background: "STARCITIZEN_WHITE.png",
                top: [
                    {
                        label: "Wave",
                        action: "emote_wave"
                    },
                    {
                        label: "Salute",
                        action: "emote_salute"
                    },
                    {
                        label: "Point",
                        action: "emote_point"
                    },
                    {
                        label: "Clap",
                        action: "emote_clap"
                    },
                    {
                        label: "Cheer",
                        action: "emote_cheer"
                    }
                ],
                left: [],
                right: [],
                bottom: [
                    {
                        label: "Yes",
                        action: "emote_cs_yes"
                    },
                    {
                        label: "Left",
                        action: "emote_cs_left"
                    },
                    {
                        label: "FWD",
                        action: "emote_cs_forward"
                    },
                    {
                        label: "Right",
                        action: "emote_cs_right"
                    },
                    {
                        label: "No",
                        action: "emote_cs_no"
                    }
                ],
                rocker: []
            },
            {
                label: "On Foot",
                background: "STARCITIZEN_WHITE.png",
                top: [
                    {},
                    {
                        label: "RELD",
                        action: "reload"
                    },
                    {
                        label: "HLSTR",
                        action: "holster"
                    },
                    {
                        label: "RELD SCND",
                        action: "reloadSecondary"
                    },
                    {}
                ],
                left: [
                    {
                        label: "Drop",
                        action: "drop"
                    },
                    {
                        label: "Wipe Helmet",
                        action: "visor_wipe"
                    }
                ],
                right: [
                    {
                        label: "Sidearm",
                        action: "selectpistol"
                    },
                    {
                        label: "Primary",
                        action: "selectprimary"
                    },
                    {
                        label: "Secondary",
                        action: "selectsecondary"
                    },
                    {
                        label: "Gadget",
                        action: "selectgadget"
                    },
                    {
                        label: "Melee",
                        action: "selectMeleeWeapon"
                    }
                ],
                bottom: [],
                rocker: []
            },
            {
                label: "Salvage",
                background: "STARCITIZEN_WHITE.png",
                top: [
                    {},
                    {
                        label: "Left",
                        action: "v_salvage_focus_left"
                    },
                    {
                        label: "Both",
                        action: "v_salvage_focus_all_heads"
                    },
                    {
                        label: "Right",
                        action: "v_salvage_focus_right"
                    },
                    {}
                ],
                left: [],
                right: [
                    {
                        label: "Fracture",
                        action: "v_salvage_toggle_fire_fracture"
                    },
                    {
                        label: "Disintegrate",
                        action: "v_salvage_toggle_fire_disintegrate"
                    },
                    {
                        label: "Salvage",
                        action: "v_toggle_salvage_mode"
                    },
                    {
                        label: "Gimbal",
                        action: "v_salvage_toggle_gimbal_mode"
                    },
                    {
                        label: "Reset Gimbal",
                        action: "v_salvage_reset_gimbal"
                    }
                ],
                bottom: [],
                rocker: []
            }
        ],
        panelSets: [
            {
                label: "Flight",
                panels: ["Targeting", "Flight"]
            },
            {
                label: "On Foot",
                panels: ["Emotes", "On Foot"]
            },
            {
                label: "Salvage",
                panels: ["Salvage", "Gimbal"]
            }
        ]
    };
}
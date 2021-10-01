import { Allocation } from "./allocation";

export interface TempAloc {
    id?: string;
    validated?: boolean;
    allocation?: Allocation[];
    saveAt?:  number;
}
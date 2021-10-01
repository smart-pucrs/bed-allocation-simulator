import { Allocation } from "./allocation";
import { LaudoInternacao } from "./laudo-internacao";
import { Leito } from "./leito";

export interface OptimiserResult {
    id?: string;
    allAllocated?: boolean;
    sugestedAllocation?: Allocation[];
    notAllocated?: string[];
    leitoData?: Leito[];
    laudosData?: LaudoInternacao[];
    alreadySuggested?: boolean;
    alocar?: boolean;
    concluido?:boolean;
}
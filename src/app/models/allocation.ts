import { LaudoInternacao } from "./laudo-internacao";
import { Leito } from "./leito";
import { Paciente } from "./paciente";

export interface Allocation {
    id?: string;
    idPaciente?: string;
    leito?: string;
    pacienteData?: Paciente;
    leitoData?: Leito;
    laudo?: LaudoInternacao;
}
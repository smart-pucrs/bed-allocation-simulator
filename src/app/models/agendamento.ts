import { Profissional } from "./profissional";
import { Paciente } from "./paciente";

export interface Agendamento {
    id?: string;
    nomePaciente?: string;
    prontuario?: string;
    paciente?: Paciente;
    tipo?: string;
    especialidade?: string;
    nomeMedico?: string
    medico?: Profissional;
    dataProcedimento?: number;
    descricao?: string;
    cancelado?: boolean;
}
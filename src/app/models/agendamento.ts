import { Paciente } from "./paciente";
import { Profissional } from "./profissional";

export interface Agendamento {
    id?: string;
    nomePaciente?: string;
    prontuario?: string;
    pacienteId?: string;
    tipo?: string;
    especialidade?: string;
    nomeMedico?: string;
    crmMedico?: string;
    medicoId?: string;
    dataProcedimento?: number;
    descricao?: string;
    cancelado?: boolean;
}
import { Leito } from "./leito";
import { Paciente } from "./paciente";
import { Profissional } from "./profissional";

export interface ConsultaMedica {
	id?: string;
	// paciente?: Paciente;
	nomePaciente?: string;
	pacienteId?: string;
	prontuario?: string;
	especialidade?: string;
	tipoDeLeito?: string;
	tipoDeEncaminhamento?: string;
	tipoDeCuidado?: string;
	// medicoResponsavel?: Profissional;
	nomeMedico?: string;
	crmMedico?: string;
	diagnostico?: string;
	tratamento?: string;
	exames?: string;
	medicamentos?: string;
	internar?: string;
	dataConsulta?: number;
	tipoDeEstadia?: string;
}
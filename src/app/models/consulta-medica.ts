import { Profissional } from "./profissional";
import { Leito } from "./leito";
import { Paciente } from "./paciente";

export interface ConsultaMedica {
	id?: string;
	paciente?: Paciente;
	prontuario?: string;
	especialidade?: string;
	tipoDeLeito?: string;
	tipoDeEncaminhamento?: string;
	tipoDeCuidado?: string;
	medicoResponsavel?: Profissional;
	diagnostico?: string;
	tratamento?: string;
	exames?: string;
	medicamentos?: string;
	internar?: string;
	dataConsulta?: number;
	tipoDeEstadia?: string;
}
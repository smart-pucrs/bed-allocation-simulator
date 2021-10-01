import { LaudoInternacao } from "./laudo-internacao";

export interface Validacao {

    pacientes?:  LaudoInternacao[];
    saveAt?:  Date;
    problema?:  String;
    plano?:  String;
    retorno?:  String;
    valido?:  boolean;
    concluido?:  boolean;
    id?: string;
    alocar?: boolean;
}

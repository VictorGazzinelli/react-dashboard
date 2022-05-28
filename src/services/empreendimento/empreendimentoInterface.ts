export interface IEmpreendimentoDto {
	IdEmpreendimento: number,
	Nome: string,
}

export interface IObterEmpreendimentoInput {
	IdEmpreendimento: number
}

export interface IObterEmpreendimentoOutput {
	Empreendimento: IEmpreendimentoDto
}
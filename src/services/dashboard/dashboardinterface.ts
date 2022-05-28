export interface IDashboardDto {
	IdDashboard: number,
	IdEmpreendimento: number,
	Nome: string,
	Widgets: string | null
}

export interface IListarDashboardPorEmpreendimentoInput {
	IdEmpreendimento : number
}

export interface IListarDashboardPorEmpreendimentoOutput {
	Dashboards : IDashboardDto[]
}

export interface IInserirDashboardInput extends Omit<IDashboardDto, 'IdDashboard'> {

}

export interface IInserirDashboardOutput {
	IdDashboard: number,
}

export interface IEditarDashboardInput extends IDashboardDto {

}

export interface IEditarDashboardOutput extends IInserirDashboardOutput {
	
}

export interface IDeletarDashboardInput extends IInserirDashboardOutput {

}

export interface IDeletarDashboardOutput extends IInserirDashboardOutput {
	
}
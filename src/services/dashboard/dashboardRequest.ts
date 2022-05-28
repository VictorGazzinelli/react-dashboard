import { IDashboardDto, IDeletarDashboardInput, IDeletarDashboardOutput, IEditarDashboardInput, IEditarDashboardOutput, IInserirDashboardInput, IInserirDashboardOutput, IListarDashboardPorEmpreendimentoInput, IListarDashboardPorEmpreendimentoOutput, IObterDashboardInput, IObterDashboardOutput} from './dashboardinterface';

export default class dashboardRequest {

	static Dashboards : Array<IDashboardDto> = [
		{
			IdDashboard: 1,
			IdEmpreendimento: 1,
			Nome: 'Dashboard 1',
			Widgets: ''
		},
		{
			IdDashboard: 2,
			IdEmpreendimento: 1,
			Nome: 'Dashboard 2',
			Widgets: ''
		}
	]

	static ObterDashboard(dto: IObterDashboardInput): Promise<IObterDashboardOutput>{
		return new Promise((resolve, reject) => {
			resolve({ Dashboard: dashboardRequest.Dashboards.find(dashboard => dashboard.IdDashboard === dto.IdDashboard) || dashboardRequest.Dashboards[0]})
		})
	}
	
	static ListarDashboardPorEmpreendimento(dto: IListarDashboardPorEmpreendimentoInput): Promise<IListarDashboardPorEmpreendimentoOutput>{
		const dashBoards : IDashboardDto[] = [...dashboardRequest.Dashboards]
		return new Promise((resolve, reject) => {
			resolve({ Dashboards: dashBoards})
		})
	}

	static InserirDashboard(dto: IInserirDashboardInput): Promise<IInserirDashboardOutput>{
		const idDashboard = [...dashboardRequest.Dashboards].length + 1;
		const dashboard : IDashboardDto = {
			...dto,
			IdDashboard: idDashboard
		}
		return new Promise((resolve, reject) => {
			dashboardRequest.Dashboards.push(dashboard);	
			resolve({ IdDashboard: idDashboard })
		})
	}

	static EditarDashboard(dto: IEditarDashboardInput): Promise<IEditarDashboardOutput>{
		return new Promise((resolve, reject) => {
			dashboardRequest.Dashboards = dashboardRequest.Dashboards.filter(dashboard => dashboard.IdDashboard !== dto.IdDashboard)
			dashboardRequest.Dashboards.push(dto);	
			resolve({ IdDashboard: dto.IdDashboard })
		})
	}

	static DeletarDashboard(dto: IDeletarDashboardInput): Promise<IDeletarDashboardOutput>{
		return new Promise((resolve, reject) => {
			dashboardRequest.Dashboards = dashboardRequest.Dashboards.filter(dashboard => dashboard.IdDashboard !== dto.IdDashboard)
			resolve({ IdDashboard: dto.IdDashboard })
		})
	}

}
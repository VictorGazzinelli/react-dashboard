import empreendimento from './empreendimento/empreendimentoRequest';
import dashboard from './dashboard/dashboardRequest';

export default class ApiCaller{
	static empreendimento = empreendimento;
	static dashboard = dashboard;
}
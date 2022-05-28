export default class SystemPaths {
	static root = '/';

	static home = {
		root: '/home/:IdEmpreendimento?',
		default: '/home/1/dashboard/1',
		goTo: (IdEmpreendimento?: string | number) => `/home${IdEmpreendimento ? `/${IdEmpreendimento}` : ''}`,

		dashboard: {
				root: '/home/:IdEmpreendimento/dashboard/:IdDashboard?',
				goTo: (IdEmpreendimento?: string | number, IdDashboard?: string | number) => {
						if (IdEmpreendimento)
								return `/home/${IdEmpreendimento}/dashboard/${IdDashboard}`;
						return SystemPaths.home.goTo(IdEmpreendimento);
				},
		},
	}
			
}

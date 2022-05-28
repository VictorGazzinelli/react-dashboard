import React, {createContext, useState } from 'react';
import { IEmpreendimentoDto } from './services/empreendimento/empreendimentoInterface';
import { useArray, UseArrayActions } from './hooks/useArray';
import { IDashboardDto } from './services/dashboard/dashboardinterface';

interface IGlobalContext {
	currentEmpreendimento: IEmpreendimentoDto | null
	setCurrentEmpreendimento: React.Dispatch<React.SetStateAction<IEmpreendimentoDto | null>>,
	dashboardArray: UseArrayActions<IDashboardDto>,
}

interface IProps {
	children?: React.ReactNode;
}

export const GlobalContext = createContext({} as IGlobalContext);

const GlobalContextProvider: React.FC = ({ children }: IProps) => {
	const [currentEmpreendimento, setCurrentEmpreendimento] = useState<IEmpreendimentoDto | null>(null);
	const dashboardArray = useArray<IDashboardDto>([]);

	const sharedValues: IGlobalContext = {
		currentEmpreendimento,
		setCurrentEmpreendimento,
		dashboardArray,
	};

	return (
			<GlobalContext.Provider value={sharedValues}>
					{children}
			</GlobalContext.Provider>
	);
}

export default GlobalContextProvider;

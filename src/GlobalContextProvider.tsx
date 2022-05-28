import React, {createContext, useEffect, useState } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import SystemPaths from './routes/paths';

import useApiRequest from './hooks/useApiRequest';
import { IEmpreendimentoDto, IObterEmpreendimentoInput } from './services/empreendimento/empreendimentoInterface';
import { useArray, UseArrayActions } from './hooks/useArray';
import { IDashboardDto } from './services/dashboard/dashboardinterface';

interface IGlobalContext {
	currentEmpreendimento: IEmpreendimentoDto | null
	setCurrentEmpreendimento: React.Dispatch<React.SetStateAction<IEmpreendimentoDto | null>>,
	currentEmpreendimentoLoading: boolean,
	dashboardArray: UseArrayActions<IDashboardDto>,
}

interface IProps {
	children?: React.ReactNode;
}

export const GlobalContext = createContext({} as IGlobalContext);

const GlobalContextProvider: React.FC = ({ children }: IProps) => {
	const getEmpreendimento = useApiRequest((api) => api.empreendimento.ObterEmpreendimento);
	const { IdEmpreendimento } = useParams();
	const [currentEmpreendimento, setCurrentEmpreendimento] = useState<IEmpreendimentoDto | null>(null);
	const dashboardArray = useArray<IDashboardDto>([]);


	const onEmpreendimentoChange = () => {
		console.log('IdEmpreendimento', IdEmpreendimento)
		if(!IdEmpreendimento) return;
		console.log('IdEmpreendimento', IdEmpreendimento)
	}

	useEffect(onEmpreendimentoChange, [IdEmpreendimento])

	const sharedValues: IGlobalContext = {
		currentEmpreendimento,
		setCurrentEmpreendimento,
		currentEmpreendimentoLoading: getEmpreendimento.loading,
		dashboardArray,
	};

	return (
			<GlobalContext.Provider value={sharedValues}>
					{children}
			</GlobalContext.Provider>
	);
}

export default GlobalContextProvider;

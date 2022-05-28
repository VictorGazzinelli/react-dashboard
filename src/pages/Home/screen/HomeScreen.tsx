import React, { useEffect, useContext } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { GlobalContext } from '../../../GlobalContextProvider';
import ScreenDashboard from '../Dashboard/screens/ScreenDashboard';
import useApiRequest from '../../../hooks/useApiRequest';

const HomeScreen: React.FC = () => {
	const { IdEmpreendimento } = useParams<{ IdEmpreendimento: string }>()
	const { setCurrentEmpreendimento } = useContext(GlobalContext)
	const getEmpreendimento = useApiRequest((api) => api.empreendimento.ObterEmpreendimento);

	const onComponentMount = () => {
		if(!IdEmpreendimento) return;
		getEmpreendimento.apiCall({IdEmpreendimento: Number(IdEmpreendimento)})
			.then(response => {
				setCurrentEmpreendimento(response.Empreendimento)
			})
	}

	useEffect(onComponentMount, []);

	return (
		<Routes>
		<Route path="dashboard">
				<Route path=":IdDashboard" element={<ScreenDashboard />} />
		</Route>
		</Routes>
	);
};

export default HomeScreen;
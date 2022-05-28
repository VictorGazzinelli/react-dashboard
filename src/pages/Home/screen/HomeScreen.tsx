import React, { useEffect, useContext } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import paths from '../../../routes/paths';
import { GlobalContext } from '../../../GlobalContextProvider';
import ScreenDashboard from '../Dashboard/screens/ScreenDashboard';

const ScreenHome: React.FC = () => {
	const navigate = useNavigate();
	const { IdEmpreendimento } = useParams<{ IdEmpreendimento: string }>()
	const { currentEmpreendimento } = useContext(GlobalContext)

	const obterIdEmpreendimento = () : string | number => {
		return currentEmpreendimento ? currentEmpreendimento?.IdEmpreendimento : ''
	}

	const onStart = () => {
		if (IdEmpreendimento) return;
		navigate(paths.home.dashboard.goTo(obterIdEmpreendimento()))
	}

	useEffect(onStart, []);

	return (
		<Routes>
		<Route path="dashboard">
				<Route path=":IdDashboard" element={<ScreenDashboard />} />
		</Route>
		</Routes>
	);
};

export default ScreenHome;
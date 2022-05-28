import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import styled from 'styled-components';
import HomeScreen from '../pages/Home/screen/HomeScreen';

import paths from './paths';
import MainSideBar from './sideBar/MainSideBar';

const SystemRoutes: React.FC = () => (
    <Container>
        <MainSideBar />
        <Routes>
						<Route path="home">
							<Route path=":IdEmpreendimento/*" element={<HomeScreen />} />
						</Route>
						<Route
								path="/"
								element={<Navigate to={paths.home.default} replace />}
						/>
        </Routes>
    </Container>
);

export default SystemRoutes;

const Container = styled.div`  
    background: ${(props) => props.theme.SYSTEM_BACKGROUND};
    display:flex;  
    flex:1;
    overflow:hidden;
`;

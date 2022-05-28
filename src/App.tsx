import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import 'antd/dist/antd.css';

import './../node_modules/react-grid-layout/css/styles.css';
import './../node_modules/react-resizable/css/styles.css';
import './../node_modules/react-grid-layout/css/styles.css'
import './../node_modules/react-resizable/css/styles.css'

import { ThemeProvider } from 'styled-components';

import SystemPaths from './routes/paths';
import SystemRoutes from './routes/Routes';

import GlobalContextProvider from './GlobalContextProvider';
import GlobalStyle from './styles/global';
import { light } from './styles/theme';

const App: React.FC = () => {
	return (
			<ThemeProvider theme={light}>
				<GlobalStyle />
				<BrowserRouter>
					{/*@ts-ignore*/}
					<GlobalContextProvider>
						<Routes>
							<Route path="*" element={<SystemRoutes />}/>
						</Routes>
					</GlobalContextProvider>
				</BrowserRouter>
			</ThemeProvider>
	);
};

export default App;

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Details from './Components/Details';
import Home from './pages/Home';
import baseURL from './api';
import { LoadingOverlay } from '@mantine/core';

function App() {
	const [loading, setLoading] = useState(false);

	baseURL.interceptors.request.use((config) => {
		setLoading(true);
		config.headers.siisi = 'fsdf';
		return config;
	});
	baseURL.interceptors.response.use((config) => {
		setLoading(false);
		return config;
	});

	return (
		<BrowserRouter>
			{
				<div style={{ width: '100vw', position: 'fixed', height: '100vh' }}>
					<LoadingOverlay visible={loading} />
				</div>
			}
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/contacts/:id' element={<Details />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

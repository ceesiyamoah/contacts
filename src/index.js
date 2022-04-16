import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MantineProvider } from '@mantine/core';

const theme = {
	colorScheme: 'dark',
	fontFamily: 'Verdana, sans-serif',
	fontFamilyMonospace: 'Monaco, Courier, monospace',
	headings: { fontFamily: 'Greycliff CF, sans-serif' },
	colors: {
		brand: [
			'#F0BBDD',
			'#ED9BCF',
			'#EC7CC3',
			'#ED5DB8',
			'#F13EAF',
			'#F71FA7',
			'#FF00A1',
			'#E00890',
			'#C50E82',
			'#AD1374',
		],
	},
	primaryColor: 'blue',
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<>
		<MantineProvider theme={theme}>
			<App />
		</MantineProvider>
	</>
);

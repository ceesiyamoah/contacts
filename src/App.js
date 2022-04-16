import { Button, Modal } from '@mantine/core';
import { useState } from 'react';
import './App.css';
import Header from './Header';
import Home from './pages/Home';
import useStyles from './styles';

function App() {
	const [addModalOpen, setAddModalOpen] = useState(false);
	const { classes } = useStyles();

	return <Home />;
}

export default App;

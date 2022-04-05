import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import NewReview from './pages/NewReview';
import NewStall from './pages/NewStall';
function App() {
	return (
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/home" element={<Home />} />
			<Route path="/new" element={<NewStall />} />
			<Route path="/review" element={<NewReview />} />
		</Routes>
	);
}

export default App;

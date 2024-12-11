import { RouterProvider } from 'react-router-dom';
import router from './pages/router'
import { useEffect } from 'react';
import header from './header.js';
import axios from 'axios';
import apiUrl from './apiUrl.js';
import store from './store/store'
import { Provider } from 'react-redux';

function App() {

	useEffect(() => {
		let token = localStorage.getItem('token');
		if (token) {
			axios.post(apiUrl + 'auth/validate', null, header()).then(res => {
				console.log(res);
			}).catch(err => {
				console.log(err);
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				window.location.reload();
			});
		}
	}, []);

	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	)
}

export default App

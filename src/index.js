import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import GlobalProvider from './store/GlobalProvider';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<GlobalProvider>
				<App />
			</GlobalProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();

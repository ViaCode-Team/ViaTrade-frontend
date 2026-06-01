import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';
import './interceptors';
import './styles/global.css';

import '@fontsource/poppins/latin-700.css';
import '@fontsource-variable/roboto/wdth.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);

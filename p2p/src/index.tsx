import React, { Suspense } from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './pages/App';
import Provider from './Providers';
import "./i18n/i18n"

const container = document.getElementById('root');
const root = createRoot(container!); 
root.render(
<React.StrictMode>
  <Provider>
  <Suspense fallback="...loading">
    <App />
  </Suspense>
  </Provider>
</React.StrictMode>
);
// ReactDOM.render(
//   <React.StrictMode>
//     <Provider>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

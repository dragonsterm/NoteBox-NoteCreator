import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('notebox-root');
const shadowRoot = rootElement?.shadowRoot;
const appContainer = shadowRoot?.querySelector('#notebox-app-container');

if (appContainer) {
  createRoot(appContainer).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
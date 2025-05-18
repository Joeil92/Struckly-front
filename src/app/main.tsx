import { createRoot } from 'react-dom/client'
import './index.css'
import '../shared/utils/i18n.ts'
import App from './app.tsx'

createRoot(document.getElementById('root')!).render(<App />)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PdfSigner from './components/PdfSigner.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PdfSigner />
  </StrictMode>,
)

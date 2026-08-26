import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Sobre } from './pages/Sobre'
import { Servicos } from './pages/Servicos'
import { Contato } from './pages/Contato'
import { AbrirEmpresa } from './pages/AbrirEmpresa'
import { TrocarContador } from './pages/TrocarContador'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="servicos" element={<Servicos />} />
          <Route path="contato" element={<Contato />} />
          <Route path="abrir-empresa" element={<AbrirEmpresa />} />
          <Route path="trocar-contador" element={<TrocarContador />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

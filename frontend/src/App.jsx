import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Sobre } from './pages/Sobre'
import { Servicos } from './pages/Servicos'
import { Contato } from './pages/Contato'
import { AbrirEmpresa } from './pages/AbrirEmpresa'
import { TrocarContador } from './pages/TrocarContador'
import { AudienceLeadPage } from './pages/AudienceLeadPage'
import { Planos } from './pages/Planos'
import { LinksUteis } from './pages/LinksUteis'
import { Blog } from './pages/Blog'
import { BlogPost } from './pages/BlogPost'
import { AdminLogin } from './pages/admin/AdminLogin'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { AdminPostEditor } from './pages/admin/AdminPostEditor'
import { AdminRoute } from './components/admin/AdminRoute'
import { AdminShell } from './components/admin/AdminShell'

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
          <Route
            path="profissionais-liberais"
            element={<AudienceLeadPage slug="profissionais-liberais" />}
          />
          <Route
            path="prestador-de-servicos"
            element={<AudienceLeadPage slug="prestador-de-servicos" />}
          />
          <Route path="comercio" element={<AudienceLeadPage slug="comercio" />} />
          <Route path="farmacias" element={<AudienceLeadPage slug="farmacias" />} />
          <Route path="planos" element={<Planos />} />
          <Route path="links-uteis" element={<LinksUteis />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
        </Route>

        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin" element={<AdminRoute />}>
          <Route element={<AdminShell />}>
            <Route index element={<AdminDashboard />} />
            <Route path="posts/novo" element={<AdminPostEditor />} />
            <Route path="posts/:id/editar" element={<AdminPostEditor />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

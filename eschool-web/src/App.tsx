import './styles/global.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import { Manchetes } from './pages/Manchetes';
import { Vestibulares } from './pages/Vestibulares';
import { Editais } from './pages/Editais';
import { Eventos } from './pages/Eventos';
import { Estagios } from './pages/Estagios'
import { Editoriais } from './pages/Editoriais';
import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { Cooperacao } from './pages/Cooperacao';
import { AreaEditor } from './pages/AreaEditor';
import { NovaNoticia } from './pages/NovaNoticia';
import { Noticia } from './pages/Noticia';
import { AreaAdmin } from './pages/AreaAdmin';
import { PrivateRoute } from './routes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Manchetes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/vestibulares" element={<Vestibulares />} />
          <Route path="/editais" element={<Editais />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/estagios" element={<Estagios />} />
          <Route path="/editoriais" element={<Editoriais />} />
          <Route path="/cooperacao" element={<Cooperacao />} />
          <Route path="/noticia/:id" element={<Noticia/>} />
          <Route path="/area-editor" element={<PrivateRoute role={'editor'} component={AreaEditor} />} />
          <Route path="/area-admin" element={<PrivateRoute role={'admin'} component={AreaAdmin} />} />
          <Route path="/nova-noticia" element={<PrivateRoute role={'editor'} component={NovaNoticia} />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

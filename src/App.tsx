import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { DataProvider } from './context/DataContext';
import Layout from './components/Layout';
import Panel from './pages/Panel';
import Alumnos from './pages/Alumnos';
import AlumnoFicha from './pages/AlumnoFicha';
import Cono from './pages/Cono';
import Lengua from './pages/Lengua';
import Clase from './pages/Clase';

function App() {
  return (
    <DataProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Panel />} />
            <Route path="alumnos" element={<Alumnos />} />
            <Route path="alumnos/:id" element={<AlumnoFicha />} />
            <Route path="cono" element={<Cono />} />
            <Route path="lengua" element={<Lengua />} />
            <Route path="clase" element={<Clase />} />
          </Route>
        </Routes>
      </HashRouter>
    </DataProvider>
  );
}

export default App;

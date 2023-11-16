import './App.scss';
import state from './Template.theatre-project-state.json';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SheetProvider } from '@theatre/r3f';
import { getProject } from '@theatre/core';
import { Canvas } from '@react-three/fiber';
import { Leva } from 'leva';
import TemplateProvider from './providers/TemplateProvider';
import SoundProvider from './providers/SoundProvider';
import StadiumScene from './WebGL/Scene/components/StadiumScene/StadiumScene';
import Transition from './WebGL/Scene/components/shared/Transition/Transition';
import AnchorScene from './WebGL/Scene/components/AnchorScene/AnchorScene.jsx';

function App() {
  const project = getProject('Template', { state });
  const globalSheet = project.sheet('global');

  return (
    <div className="mainContainer darkMode">
      <div className="outsideContainer">
        <span className="overlay"></span>
        <header>
          <a href="" className="logo">
            <img src="/img/martell_logo.png" alt="" />
          </a>
        </header>
      </div>

      <Canvas
        style={{
          height: '100vh',
          position: 'fixed',
          background: '#000000 ',
          top: 0,
        }}
        gl={{ preserveDrawingBuffer: true }}
      >
        {/* <Leva ></Leva> */}
        <TemplateProvider project={project}>
          <SoundProvider>
            <Router>
              <SheetProvider sheet={globalSheet}>
                <Transition />
                <Routes>
                  <Route index path="/" element={<StadiumScene />} />
                  <Route path="/anchor" element={<AnchorScene />} />
                  <Route from="*" to="/" />
                </Routes>
              </SheetProvider>
            </Router>
          </SoundProvider>
        </TemplateProvider>
      </Canvas>
    </div>
  );
}

export default App;

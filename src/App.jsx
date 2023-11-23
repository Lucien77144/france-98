import './App.scss';
import state from './Template.theatre-project-state.json';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SheetProvider } from '@theatre/r3f';
import { getProject } from '@theatre/core';
import { Canvas } from '@react-three/fiber';
import { Leva } from 'leva';
import SoundProvider from './providers/SoundProvider';
import Transition from './components/WebGL/Scene/components/shared/Transition/Transition';
import AnchorScene from './components/WebGL/Scene/components/AnchorScene/AnchorScene';
import TemplateProvider from './providers/TemplateProvider';
import DialogsBox from './components/Interface/DialogsBox/DialogsBox';
import InterfaceProvider from './Providers/InterfaceProvider';
import ProgressBar from './components/Interface/ProgressBar/ProgressBar';
import VideoPanel from './components/Interface/VideoPanel/VideoPanel';

export default function App() {
  const project = getProject("Template", { state });
  const globalSheet = project.sheet("global");

  return (
    <InterfaceProvider>
      <div className="mainContainer darkMode">
        <div className="outsideContainer">
          <VideoPanel />
          <DialogsBox />
          <ProgressBar />
        </div>

        <Canvas
          style={{
            height: "100vh",
            position: "fixed",
            background: "#000000 ",
            top: 0,
          }}
          shadows
          // gl={{ preserveDrawingBuffer: true }}
        >
          {/* <Leva ></Leva> */}
          <TemplateProvider project={project}>
            <SoundProvider>
              <Router>
                <SheetProvider sheet={globalSheet}>
                  <Transition />
                  <Routes>
                    {/* <Route index path="/" element={<TestScene />} /> */}
                    <Route index path="/" element={<AnchorScene />} />
                    <Route from="*" to="/" />
                  </Routes>
                </SheetProvider>
              </Router>
              {/* <EffectComposer>
     
                <Noise
                  opacity={0.05}

                />
              </EffectComposer> */}
            </SoundProvider>
          </TemplateProvider>
        </Canvas>
      </div>
    </InterfaceProvider>
  );
}

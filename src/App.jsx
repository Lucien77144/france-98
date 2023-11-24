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
import ProgressBar from './components/Interface/ProgressBar/ProgressBar';
import VideoPanel from './components/Interface/VideoPanel/VideoPanel';
import Menu from './components/Interface/Menu/Menu';
import PlayerPresentation from './components/Interface/PlayerPresentation/PlayerPresentation';
import { Bloom, EffectComposer, Noise } from '@react-three/postprocessing';
import { KernelSize, Resolution } from 'postprocessing';
import { Suspense } from 'react';
import Loading from './components/Interface/Loading/Loading.jsx';
import InfosPanel from './components/Interface/InfosPanel/InfosPanel';
import InterfaceProvider from './Providers/InterfaceProvider';

export default function App() {
  return (
    <InterfaceProvider>
      <Suspense fallback={<Loading />}>
        <div className="mainContainer darkMode">
          <div className="outsideContainer">
            {/* <VideoPanel /> */}
            <DialogsBox />
            <ProgressBar />
            <PlayerPresentation />
            <InfosPanel />
            <Menu />
            {/* <Menu intro="france_supporters.mp4" /> */}
          </div>

          <Canvas
            style={{
              height: '100vh',
              position: 'fixed',
              background: '#000000 ',
              top: 0,
            }}
            shadows
            linear
            // gl={{ preserveDrawingBuffer: true }}
          >
            <Leva hidden></Leva>
            <TemplateProvider>
              <SoundProvider>
                <Router>
                  <Transition />
                  <Routes>
                    {/* <Route index path="/" element={<TestScene />} /> */}
                    <Route index path="/" element={<AnchorScene />} />
                    <Route from="*" to="/" />
                  </Routes>
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
      </Suspense>
    </InterfaceProvider>
  );
}

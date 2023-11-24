import './App.scss';
import state from './Template.theatre-project-state.json';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SheetProvider } from '@theatre/r3f';
import { getProject } from '@theatre/core';
import { Canvas } from '@react-three/fiber';
import { Leva } from 'leva';
import SoundProvider from './providers/SoundProvider';
import Transition from './components/webgl/scene/components/shared/transition/Transition';
import AnchorScene from './components/webgl/scene/components/anchor-scene/anchor-scene';
import TemplateProvider from './providers/TemplateProvider';
import DialogsBox from './components/interface/dialogs-box/DialogsBox';
import ProgressBar from './components/interface/progress-bar/ProgressBar';
import VideoPanel from './components/interface/video-panel/VideoPanel';
import Menu from './components/interface/menu/Menu';
import PlayerPresentation from './components/interface/player-presentation/PlayerPresentation';
import { Bloom, EffectComposer, Noise } from '@react-three/postprocessing';
import { KernelSize, Resolution } from 'postprocessing';
import { Suspense } from 'react';
import Loading from './components/interface/loading/Loading.jsx';
import InfosPanel from './components/interface/Infos-panel/InfosPanel';
import InterfaceProvider from './Providers/InterfaceProvider.jsx';

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

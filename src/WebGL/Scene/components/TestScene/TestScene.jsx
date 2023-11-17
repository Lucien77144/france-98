import React, { useContext, useEffect, useRef } from 'react';
import { PerspectiveCamera, Plane, ScrollControls } from '@react-three/drei';
import { editable as e } from '@theatre/r3f';
import { useThree } from '@react-three/fiber';
import { TemplateContext } from '../../../../providers/TemplateProvider';
import { SoundContext } from '../../../../providers/SoundProvider';
import SceneManager from '../../SceneManager';
import RailCameraController from '../shared/RailCamera/RailCameraController';
import DynamicSpotLight from './components/DynamicSpotLight/DynamicSpotLight';

function TestScene() {
  const { camera } = useThree();
  const planeWidth = 3; // J'utilise 3 pour la largeur pour que les cubes soient posés à 1/3 et 2/3
  const plane = useRef();
  const { setTransEnter, setRedirectionLink } = useContext(TemplateContext);
  const { audioListener, audioScene } = useContext(SoundContext);

  useEffect(() => {
    camera.add(audioListener.current);
    window.addEventListener('click', playMusic);
    return () => {
      camera.remove(audioListener.current);
      window.removeEventListener('click', playMusic);
      if (audioScene.mapScene.ambient.audio) {
        audioScene.mapScene.ambient.audio.stop();
      }
    };
  }, [audioScene]);
  function playMusic() {
    if (audioScene.mapScene.ambient.audio) {
      audioScene.mapScene.ambient.audio.play();
    }
  }
  function renderInteractObjects() {
    return (
      <>
        {/* <e.mesh
          theatreKey={'cube1'}
          position={[planeWidth / 3 - 0.25, 0.25, 0]}
        >
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial color="blue" />
        </e.mesh>

        <e.mesh
          theatreKey={'cube2'}
          position={[-(planeWidth / 3) - 0.25, 0.25, 0]}
        >
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial attach="material" color="red" />
        </e.mesh> */}
      </>
    );
  }

  function fctEmpty(ref) {
    return <mesh position={[10, 10, 10]} ref={ref}></mesh>;
  }

  function redirectionPage() {
    setTimeout(() => {
      setTransEnter(true);
      setRedirectionLink('/curve');
    }, 250);
  }

  return (
    <ScrollControls pages={0}>
      <SceneManager
        fctEmpty={fctEmpty}
        interactObjects={renderInteractObjects()}
        focusMechanic={'map'}
        rotationSpeed={100}
        clickHandler={redirectionPage}
        flyAround={false}
      >
        <PerspectiveCamera makeDefault far={1000} />
        <RailCameraController lookAtPos={[0, 0, 0]}></RailCameraController>
        {/* <Plane
          ref={plane}
          args={[5, 5]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
        >
          <meshBasicMaterial attach="material" color="lightgrey" side={2} />
        </Plane> */}
        <DynamicSpotLight />
      </SceneManager>
    </ScrollControls>
  );
}

export default TestScene;

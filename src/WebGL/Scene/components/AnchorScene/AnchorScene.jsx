// AlambicScene.js
import React, { useContext, useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  PerspectiveCamera,
  ScrollControls,
  useAnimations,
  useGLTF,
} from '@react-three/drei';
import { editable as e } from '@theatre/r3f';
import { useThree, useLoader } from '@react-three/fiber';
import { TemplateContext } from '../../../../providers/TemplateProvider';
import { SoundContext } from '../../../../providers/SoundProvider';
import SceneManager from '../../SceneManager';
import AnchorController from '../shared/RailCamera/AnchorController';

function TestAnchor(props) {
  const { camera } = useThree();
  const group = useRef();
  const anchors = useRef([]);
  const { nodes, materials, animations } = useGLTF('/src/assets/models/stade.glb');
  const { nodes: n2, materials: m2 } = useGLTF('/src/assets/models/supporter.glb');
  const { actions } = useAnimations(animations, group);

  const { canScroll } = useContext(TemplateContext);
  const { audioListener, audioScene } = useContext(SoundContext);

  useEffect(() => {
    camera.add(audioListener.current);
    return () => {
      camera.remove(audioListener.current);
    };
  }, [audioScene]);
  const matcapTexture = useLoader(THREE.TextureLoader, '/src/assets/img/spectator.png');
  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  // const material = new THREE.MeshNormalMaterial()

  function fctEmpty(ref) {
    return (
      <mesh
        ref={ref}
        name="EMPTY"
        geometry={nodes.EMPTY.geometry}
        material={materials.Material}
        position={[-46.263, 0, -0.998]}
        rotation={[Math.PI, -1.24, Math.PI]}
        visible={false}
      />
    );
  }

  function renderInteractObjects() {
    return (
      <>
        <e.mesh
          visible
          theatreKey={'interactObj'}
          position={[1, 2, 3]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="hotpink" transparent />
        </e.mesh>
      </>
    );
  }

  return (
    <>
      <ScrollControls
        pages={canScroll.current ? 5 : 0}
        enabled={canScroll}
        damping={0.33}
        distance={2}
      >
        {/*<e.pointLight theatreKey="Light" position={[10, 10, 10]} intensity={10}/>*/}
        <group ref={group} {...props} dispose={null}>
          <group name="Scene">
            <SceneManager
              fctEmpty={fctEmpty}
              interactObjects={renderInteractObjects()}
              actions={actions}
              focusMechanic={'default'}
            >
              <ambientLight intensity={0.025} />
              <PerspectiveCamera makeDefault far={1000} />
              <AnchorController
                anchorsRef={anchors}
                lookAtPos={[0, 0, 0]}
              ></AnchorController>
              <group name="NurbsPath" />
              <group
                name="anchors"
                position={[-0.03, 0.334, -0.087]}
                ref={anchors}
              >
                <mesh
                  name="Anchors_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.Anchors_1.geometry}
                  material={nodes.Anchors_1.material}
                  position={[0.919, 0, -0.014]}
                  rotation={[-Math.PI, 1.555, -Math.PI]}
                  visible={false}
                />
                <mesh
                  name="Anchors_2"
                  castShadow
                  receiveShadow
                  geometry={nodes.Anchors_2.geometry}
                  material={nodes.Anchors_2.material}
                  position={[-0.017, 0, -1.145]}
                  rotation={[Math.PI, -0.071, Math.PI]}
                />
                <mesh
                  name="Anchors_3"
                  castShadow
                  receiveShadow
                  geometry={nodes.Anchors_3.geometry}
                  material={nodes.Anchors_3.material}
                  position={[-0.922, 0, 0.015]}
                  rotation={[0, -1.544, 0]}
                />
                <mesh
                  name="Anchors_4"
                  castShadow
                  receiveShadow
                  geometry={nodes.Anchors_4.geometry}
                  material={nodes.Anchors_4.material}
                  position={[0.02, 0, 1.143]}
                  rotation={[0, 0.003, 0]}
                />
                <mesh
                  name="Anchors_5"
                  castShadow
                  receiveShadow
                  geometry={nodes.Anchors_5.geometry}
                  material={nodes.Anchors_5.material}
                  position={[0.919, 0, -0.014]}
                  rotation={[-Math.PI, 1.555, -Math.PI]}
                />
              </group>
              <mesh
                name="SPECTATEURS1"
                castShadow
                receiveShadow
                geometry={nodes.SPECTATEURS1.geometry}
                material={nodes.SPECTATEURS1.material}
                position={[0, 0.016, 0]}
              />
              <group name="STADE1">
                <group name="STADE1-_1">
                  <mesh
                    name="STADE1-_1001"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001'].geometry}
                    material={materials['_1.002']}
                  />
                  <mesh
                    name="STADE1-_1001_1"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_1'].geometry}
                    material={materials['_2_1.002']}
                  />
                  <mesh
                    name="STADE1-_1001_2"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_2'].geometry}
                    material={materials['_11_2.002']}
                  />
                  <mesh
                    name="STADE1-_1001_3"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_3'].geometry}
                    material={materials['_12_1.002']}
                  />
                  <mesh
                    name="STADE1-_1001_4"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_4'].geometry}
                    material={materials['_11_1.002']}
                  />
                  <mesh
                    name="STADE1-_1001_5"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_5'].geometry}
                    material={materials['_11.002']}
                  />
                  <mesh
                    name="STADE1-_1001_6"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_6'].geometry}
                    material={materials['_12.002']}
                  />
                  <mesh
                    name="STADE1-_1001_7"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_7'].geometry}
                    material={materials['_10.002']}
                  />
                  <mesh
                    name="STADE1-_1001_8"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_8'].geometry}
                    material={materials['_14.002']}
                  />
                  <mesh
                    name="STADE1-_1001_9"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_9'].geometry}
                    material={materials['_3.002']}
                  />
                  <mesh
                    name="STADE1-_1001_10"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_10'].geometry}
                    material={materials['Asphalt_New.002']}
                  />
                  <mesh
                    name="STADE1-_1001_11"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_11'].geometry}
                    material={materials['_7.002']}
                  />
                  <mesh
                    name="STADE1-_1001_12"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_12'].geometry}
                    material={materials['_Charcoal_.002']}
                  />
                  <mesh
                    name="STADE1-_1001_13"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_13'].geometry}
                    material={materials['_6.002']}
                  />
                  <mesh
                    name="STADE1-_1001_14"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_14'].geometry}
                    material={materials['__0137_Black__1.002']}
                  />
                  <mesh
                    name="STADE1-_1001_15"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_15'].geometry}
                    material={materials['Metal_Aluminum_Anodized.002']}
                  />
                  <mesh
                    name="STADE1-_1001_16"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_16'].geometry}
                    material={materials['_2.002']}
                  />
                  <mesh
                    name="STADE1-_1001_17"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_17'].geometry}
                    material={materials['_8.002']}
                  />
                  <mesh
                    name="STADE1-_1001_18"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_18'].geometry}
                    material={materials['_16.002']}
                  />
                  <mesh
                    name="STADE1-_1001_19"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_19'].geometry}
                    material={materials['Material85.002']}
                  />
                  <mesh
                    name="STADE1-_1001_20"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_20'].geometry}
                    material={materials['_17.002']}
                  />
                  <mesh
                    name="STADE1-_1001_21"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_21'].geometry}
                    material={materials['_0137_Black_.002']}
                  />
                  <mesh
                    name="STADE1-_1001_22"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_22'].geometry}
                    material={materials['FrontColor.004']}
                  />
                  <mesh
                    name="STADE1-_1001_23"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_23'].geometry}
                    material={materials['Color_005.002']}
                  />
                  <mesh
                    name="STADE1-_1001_24"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_24'].geometry}
                    material={materials['jean_blue.002']}
                  />
                  <mesh
                    name="STADE1-_1001_25"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_25'].geometry}
                    material={materials['Color_006.002']}
                  />
                  <mesh
                    name="STADE1-_1001_26"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_26'].geometry}
                    material={materials['Color_002.002']}
                  />
                  <mesh
                    name="STADE1-_1001_27"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_27'].geometry}
                    material={materials['_0128_White_.002']}
                  />
                  <mesh
                    name="STADE1-_1001_28"
                    castShadow
                    receiveShadow
                    geometry={nodes['STADE1-_1001_28'].geometry}
                    material={materials['FrontColor.005']}
                  />
                </group>
              </group>
            </SceneManager>
          </group>
        </group>
      </ScrollControls>
    </>
  );
}

export default TestAnchor;

{
  /*<group name={'anchors'} ref={anchors}>*/
}
{
  /*  <mesh*/
}
{
  /*    name="anchors-0"*/
}
{
  /*    geometry={nodes['anchors-0'].geometry}*/
}
{
  /*    material={materials.Material}*/
}
{
  /*    position={[-46.263, 0, -0.998]}*/
}
{
  /*    rotation={[Math.PI, -1.24, Math.PI]}*/
}
{
  /*    scale={[0.1, 0.1, 0.1]}*/
}
{
  /*    visible={false}*/
}
{
  /*  />*/
}
{
  /*  <mesh*/
}
{
  /*    name="anchors-1"*/
}
{
  /*    geometry={nodes['anchors-1'].geometry}*/
}
{
  /*    material={materials['Material.001']}*/
}
{
  /*    position={[-31.488, 0, 0.771]}*/
}
{
  /*    rotation={[0, -1.535, 0]}*/
}
{
  /*    scale={[0.1, 0.1, 0.1]}*/
}
{
  /*  />*/
}
{
  /*  <mesh*/
}
{
  /*    name="anchors-2"*/
}
{
  /*    geometry={nodes['anchors-2'].geometry}*/
}
{
  /*    material={materials['Material.002']}*/
}
{
  /*    position={[-16.579, 0, 0.136]}*/
}
{
  /*    rotation={[Math.PI, -1.553, Math.PI]}*/
}
{
  /*    scale={[0.1, 0.1, 0.1]}*/
}
{
  /*  ></mesh>*/
}
{
  /*  <mesh*/
}
{
  /*    name="anchors-3"*/
}
{
  /*    geometry={nodes['anchors-3'].geometry}*/
}
{
  /*    material={materials['Material.003']}*/
}
{
  /*    position={[-3.845, 0, 0.21]}*/
}
{
  /*    rotation={[0, -1.492, 0]}*/
}
{
  /*    scale={[0.1, 0.1, 0.1]}*/
}
{
  /*  />*/
}
{
  /*  <mesh*/
}
{
  /*    name="anchors-4"*/
}
{
  /*    geometry={nodes['anchors-4'].geometry}*/
}
{
  /*    material={materials['Material.004']}*/
}
{
  /*    position={[2, 0, 0]}*/
}
{
  /*    rotation={[0, -1.571, 0]}*/
}
{
  /*    scale={[0.1, 0.1, 0.1]}*/
}
{
  /*  />*/
}
{
  /*</group>*/
}

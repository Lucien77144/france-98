import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { useScroll } from '@react-three/drei';
import InteractGroup from './components/shared/InteractGroup/InteractGroup';
import AnchorController from './components/shared/RailCamera/AnchorController.jsx';
import RailCameraController from './components/shared/RailCamera/RailCameraController';
import { TemplateContext } from '../../providers/TemplateProvider';

function SceneManager({
  children,
  fctEmpty,
  htmlRefs = null,
  flyAround = true,
  interactObjects = null,
  actions = null,
  focusMechanic = 'default',
  clickHandler = null,
  onMissHandler = null,
  rotationObjFocus = false,
  rotationSpeed = 1,
}) {
  const { camera } = useThree();
  const empty = useRef();
  const rotationGroup = useRef();
  const stateAnim = useRef('classic');
  const groupInteract = useRef();
  const speedRot = useRef({ value: rotationSpeed });
  const pointerSignOnFocus = useRef(1);

  const [emptyElt, setEmptyElt] = useState();
  const { interactObjs, itemFocus } = useContext(TemplateContext);
  const [camComponent, setCamComponent] = useState(null);
  const [newChildren, setNewChildren] = useState(null);
  const { pointer } = useThree();
  const data = useScroll();

  useEffect(() => {
    const childArray = React.Children.toArray(children);

    // Trouvez l'enfant que vous souhaitez retirer
    const camChild = childArray.find(
      (child) =>
        React.isValidElement(child) &&
        (child.type === RailCameraController || child.type === AnchorController)
    );

    // Mettez à jour l'état avec l'enfant retiré
    if (camChild) {
      setCamComponent(
        React.cloneElement(camChild, {
          empty,
          actions,
          stateAnim,
          pointerSignOnFocus,
        })
      );
    }

    // Créez un nouveau tableau d'enfants sans l'enfant retiré
    const filteredChildren = childArray.filter((child) => child !== camChild);

    setNewChildren(filteredChildren);

    setEmptyElt(fctEmpty(empty));

    // function showPos(){
    //     console.log(empty.current.position.toArray(),data.offset)
    // }
    //
    // window.addEventListener("click", showPos)
    // return () => {
    //     window.removeEventListener("click",showPos)
    // }
  }, [fctEmpty]);
  useFrame((state, delta, frame) => {
    if (flyAround) {
      rotationGroup.current.rotation.x =
        pointer.y * ((Math.PI / 1800) * speedRot.current.value);
      rotationGroup.current.rotation.y =
        pointer.x * ((Math.PI / 1800) * speedRot.current.value);
    }
    // if(itemFocus.current && rotationObjFocus){
    //     itemFocus.current.rotation.x += Math.sign(pointer.x) *  (Math.PI/1800) ;
    //     itemFocus.current.rotation.y +=  Math.sign(pointer.y) * (Math.PI/1800) ;
    // }
  });

  const interactsObjectsRender = useMemo(() => {
    return (
      <InteractGroup groupInteractRef={groupInteract}>
        {interactObjects}
      </InteractGroup>
    );
  }, [interactObjects]);

  return (
    <>
      {camComponent}
      {emptyElt}
      <group ref={rotationGroup}>
        {newChildren}
        {interactObjects && (
          <group
            onClick={(e) => {
              if (
                (focusMechanic === 'map' || focusMechanic === 'default') &&
                stateAnim.current === 'classic'
              ) {
                let clickedObject = e.object;

                // Vérifiez si l'objet cliqué correspond à un objet interactif directement
                let directInteract = interactObjs.current.find(
                  (obj) => obj.id === clickedObject.id
                );

                // Si ce n'est pas le cas, vérifiez si l'objet parent est un objet interactif
                if (!directInteract && clickedObject.parent) {
                  clickedObject = clickedObject.parent;
                  directInteract = interactObjs.current.find(
                    (obj) => obj.id === clickedObject.id
                  );
                }

                if (directInteract) {
                  itemFocus.current = clickedObject;
                  stateAnim.current = 'enter';
                  pointerSignOnFocus.current = Math.sign(pointer.x);
                  gsap.to(speedRot.current, { value: 0.15, duration: 0.25 });
                  clickHandler && clickHandler(e, Math.sign(pointer.x));
                }
              }
            }}
            onPointerMissed={(e) => {
              if (focusMechanic == 'default') {
                if (itemFocus.current && stateAnim.current == 'enter') {
                  stateAnim.current = 'exit';
                  itemFocus.current = null;
                  gsap.to(speedRot.current, { value: 1, duration: 0.25 });
                  console.log('lipip');
                  onMissHandler && onMissHandler();
                }
              }
            }}
            ref={groupInteract}
          >
            {interactsObjectsRender}
          </group>
        )}
      </group>
    </>
  );
}

export default SceneManager;

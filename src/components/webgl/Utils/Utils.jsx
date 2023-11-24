import React from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Prend en argument un tableau d'objets correspondant aux données à présenter, un Object de fonctions correspondant aux types de sortie  pour les convertir en HTML.
 * renvoie un JSX Object contenant toutes les objets HTML et un tableau d'objets correspondant aux Refs assignés pour les objets HTML.'
 *
 * @param data : {content : String/Array, position : Vector3, size: {width, height}, classes : String/Array, wrapperClass : String, type : String}
 * @param functionsList : Array of Object with functions as values
 * @returns Array : [JSX Object, React.ref[]]
 */
export function renderContent(data, functionsList, refs) {
  const jsxContent = data.map((item, i) => {
    let items = [];
    if (functionsList['text'] && item.type === 'text') {
      items = functionsList['text'](item, i);
    } else if (functionsList['img'] && item.type === 'img') {
      items = functionsList['img'](item, i);
    }

    if (item.hasOwnProperty('position')) {
      return (
        <Html
          key={i}
          position={item.position}
          transform
          wrapperClass={item.wrapperClass}
          ref={refs.current[i]}
        >
          {items}
        </Html>
      );
    } else {
      return (
        <Html key={i} wrapperClass={item.wrapperClass} ref={refs.current[i]}>
          {items}
        </Html>
      );
    }
  });

  return jsxContent;
}

/**
 * Prend en argument un tableau d'objets HTML et assigne à chacune d'entre elles la fonction "animationFunction"
 * et renvoie un tableau d'objet composé de la timeline et de son état
 *
 * @param group
 * @param animationFunction
 * @returns {*[]}
 */
export function generateAnimationGroup(refs, animationFunction) {
  const tab = [];
  refs.forEach((elt) => {
    const tl = animationFunction(elt.current, refs);
    tab.push({ timeline: tl, nextStateEnter: true });
  });
  return tab;
}

function updateAnimationState(animations, nextState, index) {
  const tmp = [...animations];
  tmp[index].nextStateEnter = nextState;
  return tmp;
}

/**
 * Gestion de l'animation en fonction de la progression pour l'entré et la sortie d'un élément de sa limite fixé'
 *
 * @param animations
 * @param scrollProgress
 * @param keyMoments
 * @param setState
 * @param limitOffset
 */
export function animateGroupOnProgress(
  animations,
  scrollProgress,
  keyMoments,
  setState,
  limitOffset
) {
  animations.forEach((animation, index) => {
    const isInInterval =
      scrollProgress >= keyMoments[index] - limitOffset &&
      scrollProgress <= keyMoments[index] + limitOffset;
    if (index === 1) {
      // console.log(scrollProgress,keyMoments[index],isInInterval)
    }
    if (isInInterval && animation.nextStateEnter) {
      animation.timeline.play();
      // console.log(animation.timeline)
      setState(updateAnimationState(animations, false, index));
    } else if (!isInInterval && !animation.nextStateEnter) {
      animation.timeline.reverse();
      setState(updateAnimationState(animations, true, index));
    }
  });
}

export function initMeshes(fctList, setMeshes) {
  const meshesTab = [];
  fctList.forEach((elt, index) => {
    if (elt.hasOwnProperty('fct') && elt.hasOwnProperty('nb')) {
      for (let i = 0; i < elt.nb; i++) {
        const mesh = elt.fct(index + '_' + i);
        meshesTab.push(mesh);
      }
    } else {
      const mesh = elt(index);
      meshesTab.push(mesh);
    }
  });
  setMeshes(meshesTab);
}

export function dampVec3(v1, v2, lambda, delta) {
  return new THREE.Vector3(
    THREE.MathUtils.damp(v1.x, v2.x, lambda, delta),
    THREE.MathUtils.damp(v1.y, v2.y, lambda, delta),
    THREE.MathUtils.damp(v1.z, v2.z, lambda, delta)
  );
}

export function equalQuat(quat1, quat2, epsilon = 0.0001) {
  return (
    Math.abs(quat1.x - quat2.x) < epsilon &&
    Math.abs(quat1.y - quat2.y) < epsilon &&
    Math.abs(quat1.z - quat2.z) < epsilon &&
    Math.abs(quat1.w - quat2.w) < epsilon
  );
}

export function objToTargetPos(obj, target, delta, lambda = 10) {
  const newPos = dampVec3(
    obj.position.clone(),
    target.position.clone(),
    lambda,
    delta
  );
  obj.position.set(newPos.x, newPos.y, newPos.z);
  return obj.position.distanceTo(target.position); // retournez la distance restante
}

export function getVecDirItemToTarget(item, target) {
  let itemDir = new THREE.Vector3();
  target.getWorldPosition(itemDir);

  const itemPos = new THREE.Vector3();
  item.getWorldPosition(itemPos);
  itemDir = itemDir.sub(itemPos).normalize();
  const targetDir = new THREE.Vector3();
  item.getWorldDirection(targetDir);
  const dot = targetDir.dot(itemDir);

  return [targetDir, itemDir, dot];
}
export function objToTargetRot(vecDirection, obj, speed = 0.0005) {
  const [camDir, itemDir, dot] = vecDirection;

  if (Math.abs(dot + 1) > 0) {
    let quatDir = new THREE.Quaternion();
    quatDir.setFromUnitVectors(camDir, itemDir);
    obj.quaternion.slerp(quatDir, speed);
  }
}
export function objectALookAtObjectBWithLerp(
  objectA,
  objectB,
  lerpFactor,
  offset = 0,
  offsetDir = 1
) {
  let targetPosition = new THREE.Vector3();
  const clone = objectA.clone();
  objectB.getWorldPosition(targetPosition);

  const dirBtoA = objectA.position.clone().sub(objectB.position).normalize();

  // Obtenez le rapport hauteur/largeur de l'écran
  const width = window.innerWidth;
  const height = window.innerHeight;
  const aspectRatio = width / height;

  // Calculez le facteur de réduction en fonction du rapport largeur/hauteur
  let reductionFactor = Math.min(aspectRatio * 0.8, 1.0); // Plafonner à 1.0 pour ne pas augmenter l'offset

  if (reductionFactor < 9 / 16) {
    reductionFactor = 0;
  }

  // Appliquez le facteur de réduction à l'offset
  const reducedOffset = offset * reductionFactor;

  const crossProd = dirBtoA.cross(new THREE.Vector3(0, 1, 0));
  targetPosition = targetPosition.add(
    crossProd.multiplyScalar(reducedOffset * offsetDir)
  );

  // Créez un quaternion cible en utilisant lookAt
  clone.lookAt(targetPosition);

  const endQuaternion = clone.quaternion.clone(); // Quaternion cible

  // Utilisez l'interpolation slerp pour effectuer la transition en douceur
  objectA.quaternion.slerp(endQuaternion, lerpFactor);
}

export function generateRandomKey() {
  return Math.random().toString(36).substring(2, 10); // Génère une chaîne aléatoire
}


export default function cloneGltf(gltf) {
  const clone = {
      animations: gltf.animations,
      scene: gltf.scene.clone(true)
  };

  const skinnedMeshes = {};

  gltf.scene.traverse(node => {
      if (node.isSkinnedMesh) {
          skinnedMeshes[node.name] = node;
      }
  });

  const cloneBones = {};
  const cloneSkinnedMeshes = {};

  clone.scene.traverse(node => {
      if (node.isBone) {
          cloneBones[node.name] = node;
      }

      if (node.isSkinnedMesh) {
          cloneSkinnedMeshes[node.name] = node;
      }
  });

  for (let name in skinnedMeshes) {
      const skinnedMesh = skinnedMeshes[name];
      const skeleton = skinnedMesh.skeleton;
      const cloneSkinnedMesh = cloneSkinnedMeshes[name];

      const orderedCloneBones = [];

      for (let i = 0; i < skeleton.bones.length; ++i) {
          const cloneBone = cloneBones[skeleton.bones[i].name];
          orderedCloneBones.push(cloneBone);
      }

      cloneSkinnedMesh.bind(
          new THREE.Skeleton(orderedCloneBones, skeleton.boneInverses),
          cloneSkinnedMesh.matrixWorld);
  }

  return clone;
}
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useLocation, useNavigate } from 'react-router-dom';
import { TemplateContext } from '../../../../../../providers/TemplateProvider';

const MyShaderMaterial = shaderMaterial(
  // uniforms
  { uProgress: 0, uTotalImages: 0, uTexture: null },

  // vertex shader
  `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  // fragment shader
  `
    precision mediump float;
    
    uniform sampler2D uTexture; // Votre succession d'images
    uniform float uProgress; // Pour animer la séquence
    uniform float uTotalImages; // Nombre total d'images
    
    varying vec2 vUv;
    
    void main() {
        float imageWidth = 1.0 / uTotalImages; // Largeur de chaque image en coordonnées UV
        float imagePosition = mod(uProgress, uTotalImages) * imageWidth; // Position horizontale de l'image actuelle
    
        vec2 offset = vec2(imagePosition, 0.0);
        vec2 scaledUv = vec2(vUv.x * imageWidth, vUv.y); 
    
        gl_FragColor = texture2D(uTexture, scaledUv + offset);
    }
    `
);

extend({ MyShaderMaterial });

function TransitionMaterial({
  meshRef,
  videoSrc = 'null',
  src,
  type,
  delayMs = 1000,
}) {
  const {
    transEnter,
    setTransEnter,
    canScroll,
    redirectionLink,
    setRedirectionLink,
    inAnimTrans,
    setInAnimTrans,
    itemFocus,
  } = useContext(TemplateContext);
  const [duration, setDuration] = useState(0);
  const [nbFrames, setNbFrames] = useState(0);
  const [currentStateEnter, setCurrentStateEnter] = useState(false);
  const [transitionSource, setTransitionSource] = useState(null);
  const [textureVideo, setTextureVideo] = useState(null);

  const triggerPauseVid = useRef(false);
  const materialRef = useRef(null);
  const progress = useRef(0);
  const currentFrame = useRef(0);
  const delayInProgress = useRef(false); // État pour vérifier si un délai est en cours
  const lastProgress = useRef(0); // Conserver l'ancienne valeur de progress

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (transEnter && location.pathname != redirectionLink) {
      setTransEnter(false);
      setRedirectionLink(location.pathname);
      setCurrentStateEnter(false);
      setInAnimTrans(false);
      canScroll.current = true;
    }
  }, [location]);

  useEffect(() => {
    setSource();
  }, []);

  useEffect(() => {
    if (!inAnimTrans && currentStateEnter != transEnter) {
      meshRef.current.visible = true;
      meshRef.current.receiveShadow = true;
      setInAnimTrans(true);
      canScroll.current = false;
      progress.current = 0;
      currentFrame.current = 0;
      delayInProgress.current = false; // État pour vérifier si un délai est en cours
      lastProgress.current = 0; // Conserver l'ancienne valeur de progress            setCanScroll(false);
      setCurrentStateEnter(transEnter);
      setTransitionSource(redirectionLink);
      if (type === 'video') {
        const videoElement = textureVideo.image;
        videoElement.currentTime = 0;
        setDuration(videoElement.duration);
        videoElement.preload = 'auto';
        videoElement.play().catch((error) => {
          console.error('Erreur lors de la lecture de la vidéo:', error);
        });
      }
    } else {
      meshRef.current.visible = false;
      meshRef.current.receiveShadow = false;
      itemFocus.current = null;
    }
  }, [transEnter]);

  useEffect(() => {
    if (type === 'video' && textureVideo) {
      const videoElement = textureVideo.image;

      const handleVideoEnded = () => {
        setInAnimTrans(false);
        meshRef.current.visible = false;
        meshRef.current.receiveShadow = false;
        canScroll.current = true;
        setCurrentStateEnter(false);
        setTransEnter(false);
        triggerPauseVid.current = false;
      };

      videoElement.addEventListener('ended', handleVideoEnded);
      // Nettoyez l'écouteur d'événement lorsque le composant est démonté
    }
  }, [src]);

  useFrame((state, delta) => {
    if (inAnimTrans) {
      if (!delayInProgress.current) {
        if (type === 'shader') {
          updateShader(delta);
        } else if (type === 'animationFrame') {
          updateAnimationFrame();
        } else if (type === 'video') {
          updateVideo();
        }
        lastProgress.current = progress.current;
      }
    }
  });

  function updateShader(delta) {
    checkShader(() => {
      const increment = delta / duration;
      progress.current += increment;
      progress.current = THREE.MathUtils.clamp(progress.current, 0, 1);
      materialRef.current.uniforms.uProgress.value = progress.current;
    });

    if (lastProgress.current < 0.5 && progress.current >= 0.5) {
      delayInProgress.current = true;
      setTimeout(() => {
        delayInProgress.current = false;
        navigate(transitionSource);
      }, delayMs);
    }

    if (progress.current === 1) {
      resetAll();
    }
  }

  function updateAnimationFrame() {
    checkShader(() => {
      materialRef.current.uniforms.uProgress.value =
        currentFrame.current / nbFrames;
      currentFrame.current = currentFrame.current + (1 % nbFrames);
    });
    if (Math.ceil(nbFrames / 2) - 1 === currentFrame.current) {
      delayInProgress.current = true;
      navigate(transitionSource);

      setTimeout(() => {
        delayInProgress.current = false;
      }, delayMs);
    }

    if (currentFrame.current === nbFrames) {
      resetAll();
    }
  }

  function updateVideo() {
    const epsilon = 0.1; // Petite marge d'erreur

    if (
      Math.abs(textureVideo.image.currentTime - duration / 2) < epsilon &&
      triggerPauseVid.current == false
    ) {
      textureVideo.image.pause();
      delayInProgress.current = true;
      triggerPauseVid.current = true;

      navigate(transitionSource);
      setTimeout(() => {
        delayInProgress.current = false;
        textureVideo.image.play();
      }, delayMs);
    }
  }

  function resetAll() {
    setInAnimTrans(false);
    meshRef.current.visible = false;
    meshRef.current.receiveShadow = false;
    canScroll.current = true;
    setCurrentStateEnter(false);
    setTransEnter(false);
  }

  function checkShader(callback) {
    try {
      callback();
    } catch (e) {
      if (e instanceof TypeError) {
        console.error("L'uniform uProgress n'a pas été assigné au material");
      } else {
        console.error("Une autre erreur s'est produite:", e.message);
      }
    }
  }

  function setSource() {
    try {
      switch (type) {
        case 'shader':
          if (
            !(
              src.hasOwnProperty('fragmentShader') &&
              src.hasOwnProperty('vertexShader') &&
              src.hasOwnProperty('duration')
            )
          ) {
            throw new Error(
              'src doit avoir des propriétés fragmentShader, vertexShader et duration'
            );
          }
          materialRef.current.fragmentShader = src.fragmentShader;
          materialRef.current.vertexShader = src.vertexShader;
          setDuration(src.duration);
          break;
        case 'animationFrame':
          if (
            !(src.hasOwnProperty('image') && src.hasOwnProperty('nbImages'))
          ) {
            throw new Error('src doit avoir des propriétés image et nbImages');
          }
          MyShaderMaterial.uniforms.uTexture.value = src.image;
          MyShaderMaterial.uniforms.uTotalImages.value = src.nbImages;
          setNbFrames(src.nbImages);
          break;
        case 'video':
          if (!src.hasOwnProperty('textureVideo')) {
            throw new Error('src doit avoir la propriété textureVideo');
          }
          setTextureVideo(src.textureVideo);
          break;
      }
      MyShaderMaterial.needsUpdate = true;
    } catch (e) {
      console.error(e.message);
    }
  }

  switch (type) {
    case 'video':
      return (
        <meshBasicMaterial
          attach="material"
          map={textureVideo}
          ref={materialRef}
          transparent={true}
          opacity={0.5}
        />
      );
    case 'shader':
    case 'animationFrame':
      return (
        <myShaderMaterial
          attach="material"
          ref={materialRef}
          transparent={true}
          opacity={0.5}
        />
      );
  }
}

export default TransitionMaterial;

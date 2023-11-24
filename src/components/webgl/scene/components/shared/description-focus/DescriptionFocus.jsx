// AlambicScene.js
import React, { useEffect, useState } from 'react';
import { Html } from '@react-three/drei';
import FrontPlane from './components/FrontPlane';
import { generateRandomKey } from '../../utils/Utils';

function DescriptionFocus({
  htmlData,
  associatedNames,
  dimension,
  haveBg = false,
  shader = null,
  fctRender = null,
}) {
  const [descriptions, setDescriptions] = useState();

  useEffect(() => {
    if (htmlData && associatedNames) {
      const renderedContent = [];
      htmlData.forEach((data, idxDesc) => {
        renderedContent.push(generateEltRender(data, idxDesc));
      });
      setDescriptions(renderedContent);
    }
  }, [htmlData, associatedNames, fctRender]);

  function generateEltRender(data, idxDesc) {
    const content = renderContent(data, idxDesc);
    const key = generateRandomKey();
    return (
      <Html
        wrapperClass={`container description ${associatedNames[idxDesc]}`}
        style={{
          width: dimension + 'vw !important',
          height: dimension + 'vh !important',
        }}
        key={key}
      >
        <div className={'content'}>{content}</div>
      </Html>
    );
  }

  function renderContent(data, idxDesc) {
    if (fctRender) {
      return fctRender(data, idxDesc);
    }
    const content = [];
    data.content.forEach((elt, currentEltIndex) => {
      content.push(renderSingleContent(data, currentEltIndex));
    });
    return content;
  }

  function renderSingleContent(data, currentEltIndex) {
    const key = generateRandomKey();
    switch (data.types[currentEltIndex]) {
      case 'title':
        return (
          <h1
            className={data.classes[currentEltIndex]}
            key={generateRandomKey()}
          >
            {data.content[currentEltIndex]}
          </h1>
        );
      case 'text':
        return (
          <p
            className={data.classes[currentEltIndex]}
            key={generateRandomKey()}
          >
            {data.content[currentEltIndex]}
          </p>
        );
      case 'img':
        return (
          <img
            className={data.classes[currentEltIndex]}
            key={generateRandomKey()}
            src={data.content[currentEltIndex]}
            alt={data.content[currentEltIndex]}
          />
        );
    }
  }

  return (
    <>
      {haveBg && (
        <FrontPlane shader={shader} dimension={dimension}></FrontPlane>
      )}
      {descriptions}
    </>
  );
}
export default DescriptionFocus;

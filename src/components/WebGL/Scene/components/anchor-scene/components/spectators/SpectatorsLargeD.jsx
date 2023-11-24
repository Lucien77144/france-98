import React, { useEffect, useState } from "react";
import Spectators from "./Spectators";

export default function SpectatorsLargeD({rotation = [0,0,0], position  = [0,0,0],  material }) {

  const [data, setData] = useState([]);

  const column = 27;
  const row = 27;
  const length = 0.28;
  const depth = 0.175;
  const total = row * column;

  useEffect(() => {
    const stepCol = column > length ? length / column : column / length;
    const stepRow = row > depth ? depth / row : row / depth;

    const tab = Array.from({ length: total }, (elt = 0, i) => {
      const randScale = Math.random() * 0.05 + 0.15;
      const randomX = (Math.random() - 0.5 * 2) * stepCol;
      const randomZ = (Math.random() - 0.5 * 2) * stepRow;
      const x = (i % row) * stepCol + randomX;
      const z = Math.floor(i / column) * stepRow + randomZ;
      const y = -Math.sin(z * 0.35);
      return {
        position: [x, y, z],
        random: Math.random(),
        scale: [randScale, randScale, randScale],
      };
    });
    setData(tab);
  }, []);

  return (
    <>
      {data.length > 0 && (
        <group name="spectatorsGroup" rotation={rotation} position={position}>
          <Spectators
            material={material}
            data={data}
            total={total}
            // pivot
            config={{
              position: [
                0.7837884346809572, 0.08749327258112437, -0.4572542945135929,
              ],
              quaternion: [
                0.0008296058841095553, -0.707026910800659,
                0.0008297337540564418, 0.7071856691843037,
              ],
            }}
          ></Spectators>

          <Spectators
            material={material}
            data={data}
            total={total}
            config={{
              position: [
                0.7928487899141583, 0.09285310323000791, -0.17513634559565286,
              ],
              quaternion: [
                -0.0006309799685383546, -0.7072022055758853,
                0.0006308096706383638, 0.7070107809447053,
              ],
            }}
          ></Spectators>

          <Spectators
            material={material}
            data={data}
            total={total}
            // pivot
            config={{
              position: [
                0.7991913360917767, 0.09493334932288296, 0.11120580198552714,
              ],
              quaternion: [
                -0.0005994413818647407, -0.7283273210766027,
                0.0006375623160986733, 0.6852288286096129,
              ],
            }}
          ></Spectators>
        </group>
      )}
    </>
  );
}

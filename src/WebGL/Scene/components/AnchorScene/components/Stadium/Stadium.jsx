import React, { useEffect, useRef } from "react";

export default function Stadium({ nodes, materials, material,actions }) {
  const action = useRef();


useEffect(() => {
  // console.log(actions);
  // action.current = Object.values(actions)[1];
  // console.log(action.current);
  // action.current.timeScale = 100;

  // action.current.play()
},[])

  return (
    <group>
      <group name="STADE1" position={[0, 0, -0.043]}>
        <group
          name="STADE1-_1"
          position={[0.037, 0, 0.088]}
          rotation={[0, 0.022, 0]}
        >
          <mesh
            name="STADE1-_1001"
            geometry={nodes["STADE1-_1001"].geometry}
            material={materials["_1.002"]}
          />
          <mesh
            name="STADE1-_1001_1"
            geometry={nodes["STADE1-_1001_1"].geometry}
            material={materials["_2_1.002"]}
          />
          <mesh
            name="STADE1-_1001_2"
            geometry={nodes["STADE1-_1001_2"].geometry}
            material={materials["_11_2.002"]}
          />
          <mesh
            name="STADE1-_1001_3"
            geometry={nodes["STADE1-_1001_3"].geometry}
            material={materials["_12_1.002"]}
          />
          <mesh
            name="STADE1-_1001_4"
            geometry={nodes["STADE1-_1001_4"].geometry}
            material={materials["_11_1.002"]}
          />
          <mesh
            name="STADE1-_1001_5"
            geometry={nodes["STADE1-_1001_5"].geometry}
            material={materials["_11.002"]}
          />
          <mesh
            name="STADE1-_1001_6"
            geometry={nodes["STADE1-_1001_6"].geometry}
            material={materials["_12.002"]}
          />
          <mesh
            name="STADE1-_1001_7"
            geometry={nodes["STADE1-_1001_7"].geometry}
            material={materials["_10.002"]}
          />
          <mesh
            name="STADE1-_1001_8"
            geometry={nodes["STADE1-_1001_8"].geometry}
            material={materials["_14.002"]}
          />
          <mesh
            name="STADE1-_1001_9"
            geometry={nodes["STADE1-_1001_9"].geometry}
            material={materials["_3.002"]}
          />
          <mesh
            name="STADE1-_1001_10"
            geometry={nodes["STADE1-_1001_10"].geometry}
            material={materials["Asphalt_New.002"]}
          />
          <mesh
            name="STADE1-_1001_11"
            geometry={nodes["STADE1-_1001_11"].geometry}
            material={materials["_7.002"]}
          />
          <mesh
            name="STADE1-_1001_12"
            geometry={nodes["STADE1-_1001_12"].geometry}
            material={materials["_Charcoal_.002"]}
          />
          <mesh
            name="STADE1-_1001_13"
            geometry={nodes["STADE1-_1001_13"].geometry}
            material={materials["_6.002"]}
          />
          <mesh
            name="STADE1-_1001_14"
            geometry={nodes["STADE1-_1001_14"].geometry}
            material={materials["__0137_Black__1.002"]}
          />
          <mesh
            name="STADE1-_1001_15"
            geometry={nodes["STADE1-_1001_15"].geometry}
            material={materials["Metal_Aluminum_Anodized.002"]}
          />
          <mesh
            name="STADE1-_1001_16"
            geometry={nodes["STADE1-_1001_16"].geometry}
            material={materials["_2.002"]}
          />
          <mesh
            name="STADE1-_1001_17"
            geometry={nodes["STADE1-_1001_17"].geometry}
            material={materials["_8.002"]}
          />
          <mesh
            name="STADE1-_1001_18"
            geometry={nodes["STADE1-_1001_18"].geometry}
            material={materials["_16.002"]}
          />
          <mesh
            name="STADE1-_1001_19"
            geometry={nodes["STADE1-_1001_19"].geometry}
            material={materials["Material85.002"]}
          />
          <mesh
            name="STADE1-_1001_20"
            geometry={nodes["STADE1-_1001_20"].geometry}
            material={materials["_17.002"]}
          />
          <mesh
            name="STADE1-_1001_21"
            geometry={nodes["STADE1-_1001_21"].geometry}
            material={materials["_0137_Black_.002"]}
          />
          <mesh
            name="STADE1-_1001_22"
            geometry={nodes["STADE1-_1001_22"].geometry}
            material={materials["FrontColor.004"]}
          />
          <mesh
            name="STADE1-_1001_23"
            geometry={nodes["STADE1-_1001_23"].geometry}
            material={materials["Color_005.002"]}
          />
          <mesh
            name="STADE1-_1001_24"
            geometry={nodes["STADE1-_1001_24"].geometry}
            material={materials["jean_blue.002"]}
          />
          <mesh
            name="STADE1-_1001_25"
            geometry={nodes["STADE1-_1001_25"].geometry}
            material={materials["Color_006.002"]}
          />
          <mesh
            name="STADE1-_1001_26"
            geometry={nodes["STADE1-_1001_26"].geometry}
            material={materials["Color_002.002"]}
          />
          <mesh
            name="STADE1-_1001_27"
            geometry={nodes["STADE1-_1001_27"].geometry}
            material={materials["_0128_White_.002"]}
          />
          <mesh
            name="STADE1-_1001_28"
            geometry={nodes["STADE1-_1001_28"].geometry}
            material={materials["FrontColor.005"]}
          />
        </group>
      </group>

      <mesh
        name="Cage1"
        geometry={nodes.Cage1.geometry}
        material={material}
        position={[0, 0.048, 0.607]}
      />
      <mesh
        name="Cage2"
        geometry={nodes.Cage2.geometry}
        material={material}
        position={[0, 0.049, -0.691]}
      />
      <mesh
        name="Plane"
        geometry={nodes.Plane.geometry}
        material={material}
      />



      <group name="but_3">
        <mesh
          name="Ball3"
          geometry={nodes.Ball3.geometry}
          material={nodes.Ball3.material}
          position={[0, 0.026, 0.37]}
          rotation={[2.552, 0.765, -2.708]}
          scale={0.004}
        />
      </group>
    </group>
  );
}

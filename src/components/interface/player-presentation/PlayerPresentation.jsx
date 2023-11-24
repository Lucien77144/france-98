import { useContext } from "react";
import { InterfaceContext } from "../../../providers/InterfaceProvider";

import "./PlayerPresentation.scss";
import { useEffect } from "react";

export default function PlayerPresentation() {
  //   const { activeAudio } = useContext(InterfaceContext);

const ev = (event) => {
  if (event.keyCode === 69 ) {
    if(document.querySelector(".playerPres").classList.contains("active")){
      document.querySelector(".playerPres").classList.remove("active");
      console.log("plip")
    }
    else{
      document.querySelector(".playerPres").classList.add("active");
      console.log("plop")

    }
    // Le code 69 correspond à la touche "E"
  }
}
  
  useEffect(() => {


    window.addEventListener("keydown", ev);
    return () => window.removeEventListener("keydown", ev);

  }, []);

  return (
    <>
      <div className="playerPres">
        <div className="firstName">
          <h3>Zinedine</h3>
        </div>
        <div className="lastName">
          <h2>Zidane</h2>
        </div>
        <div className="number">
          <h4>N°10</h4>
        </div>
        <div className="imgContainer">
          <img src="/src/assets/img/ui/france.png" alt="" />
        </div>
      </div>
    </>
  );
}

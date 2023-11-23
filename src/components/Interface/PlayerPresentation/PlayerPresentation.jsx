import { useContext } from "react";
import { InterfaceContext } from "../../../Providers/InterfaceProvider";

import "./PlayerPresentation.scss";

export default function PlayerPresentation() {
  //   const { activeAudio } = useContext(InterfaceContext);

  return (
    <>
      <div className="playerPres-container">
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

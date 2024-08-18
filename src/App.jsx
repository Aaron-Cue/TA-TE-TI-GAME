import { useState } from 'react';
import Turno from './components/Turno';
import ButtonReset from './components/ButtonReset';
import Modal from './components/Modal';
import { TURNOS, COMBINACIONES_GANADORAS } from './constantes';
import confetti from 'canvas-confetti';
import './styles/App.css';

const App = () => {
  const [tablero, setTablero] = useState(Array(9).fill(null));
  const [turno, setTurno] = useState(TURNOS.x);
  const [ganador, setGanador] = useState(null);

  const handleClick = (indice) => {
    actualizarTablero(indice);
  };

  const actualizarTablero = (indice) => {
    const nuevoTablero = [...tablero];

    if (nuevoTablero[indice] === null) {
      // si no hay una jugada previa
      nuevoTablero[indice] = turno;
      setTablero(nuevoTablero);
      setTurno(turno === TURNOS.x ? TURNOS.o : TURNOS.x);
    }

    // chequear si gano con esa jugada
    chequeoGanador(nuevoTablero);
  };

  const chequeoGanador = (tablero) => {
    for (let i = 0; i < COMBINACIONES_GANADORAS.length; i++) {
      const [a, b, c] = COMBINACIONES_GANADORAS[i];
      if (
        tablero[a] &&
        tablero[a] === tablero[b] &&
        tablero[a] === tablero[c]
      ) {
        setGanador(turno);
        confetti();
      }
    }
  };

  const reiniciar = () => {
    setTablero(Array(9).fill(null));
    setTurno(TURNOS.x);
    setGanador(null);
  };

  const empate = !tablero.includes(null) && !ganador;

  return (
    <>
      <Turno turno={turno} />

      <section>
        <div className="tablero">
          {tablero.map((_, indice) => (
            <div
              key={indice}
              className="cuadrado"
              onClick={() => handleClick(indice)}
            >
              <span>{tablero[indice]}</span>
            </div>
          ))}
        </div>
      </section>

      <ButtonReset reiniciar={reiniciar}>reiniciar</ButtonReset>

      <Modal ganador={ganador} reiniciar={reiniciar} />
      <Modal empate={empate} reiniciar={reiniciar} />
    </>
  );
};

export default App;

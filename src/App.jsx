import { useState } from 'react';
import './styles/App.css';
import confetti from 'canvas-confetti';

const TURNOS = {
  x: '❌',
  o: '⭕',
};

const COMBINACIONES_GANADORAS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [0, 4, 8],
];

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
      <section>
        <div className="turno">
          <h2>Turno de:</h2>
          <h3>{turno}</h3>
        </div>
      </section>

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

      <section>
        <button className="reset" onClick={reiniciar}>
          reiniciar
        </button>
      </section>

      <section>
        <div className={ganador ? 'modal-box' : 'no-view'}>
          <div className="modal-content">
            <h3>GANADOR: {ganador}</h3>
            <p>felicitaciones papa, ganaste como hermanes fc maniana!</p>
            <button className="reset" onClick={reiniciar}>
              reiniciar
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className={empate ? 'modal-box' : 'no-view'}>
          <div className="modal-content">
            <h2>EMPATE</h2>
            <button className="reset" onClick={reiniciar}>
              reiniciar
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default App;

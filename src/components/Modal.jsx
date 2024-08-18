import ButtonReset from './ButtonReset';


const Modal = ({ ganador, empate, reiniciar }) => {
  return (
    (ganador && (
      <section>
        <div className={ganador ? 'modal-box' : 'no-view'}>
          <div className="modal-content">
            <h3>GANADOR: {ganador}</h3>
            <p>felicitaciones has ganado!</p>
            <ButtonReset reiniciar={reiniciar}>Nueva Partida</ButtonReset>
          </div>
        </div>
      </section>
    )) ||
    (empate && (
      <section>
        <div className={empate ? 'modal-box' : 'no-view'}>
          <div className="modal-content">
            <h2>EMPATE</h2>
            <ButtonReset reiniciar={reiniciar}>Reiniciar</ButtonReset>
          </div>
        </div>
      </section>
    ))
  );
};

export default Modal;

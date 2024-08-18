const ButtonReset = ({children, reiniciar}) => {
  return (
    <button className="reset" onClick={reiniciar}>
      {children}
    </button>
  );
}

export default ButtonReset
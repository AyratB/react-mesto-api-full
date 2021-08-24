function Button(props) {
  return (
    <button
      type={props.type}
      className={props.className}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onClick={props.onClick}
      style={props.style}
    >
      {props.buttonText}
    </button>
  );
}

export default Button;

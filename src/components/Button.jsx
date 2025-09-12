function Button({ text, type = "button", onClick, className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-primary w-auto px-4 ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;
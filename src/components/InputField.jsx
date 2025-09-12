function InputField({ type, id, placeholder }) {
  return (
    
      <input
        type={type}
        id={id}
        className="form-control"
        placeholder={placeholder}
      />
    
  );
}

export default InputField;

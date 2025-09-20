function InputField({ type, id, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      id={id}
      value={value}          
      onChange={onChange}    
      className="form-control"
      placeholder={placeholder}
    />
  );
}

export default InputField;
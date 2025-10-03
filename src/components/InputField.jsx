function InputField({ type, id, name, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      id={id}
      name={name}   
      value={value}
      onChange={onChange}
      className="form-control"
      placeholder={placeholder}
    />
  );
}

export default InputField;

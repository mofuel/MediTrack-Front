function SelectField({ id, name, value, onChange, options, placeholder = "Seleccione uno" }) {
  return (
    <select
      id={id}
      name={name} 
      value={value}
      onChange={onChange}
      className="form-control"
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default SelectField;

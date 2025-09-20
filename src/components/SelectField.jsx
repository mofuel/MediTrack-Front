function SelectField({ id, value, onChange, options, placeholder = "Seleccione uno" }) {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="form-control"
    >
      {/* Opción inicial deshabilitada */}
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default SelectField;

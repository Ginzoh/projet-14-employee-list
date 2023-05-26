import PropTypes from 'prop-types';

export const SelectInput = ({ data, label, onChange, value }) => {
  return (
    <div className='entrySelect'>
      <label htmlFor="select">{label}: </label>
      <select onChange={onChange} value={value}>
        {data.map((item, i) => (
          <option key={i} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

SelectInput.propTypes = {
  data: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
};
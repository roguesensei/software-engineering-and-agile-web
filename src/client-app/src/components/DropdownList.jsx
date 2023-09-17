import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function DropDownList ({
		data,
		value,
		onChange = () => {},
		getItemLabel = (item) => {},
		getItemValue= (item) => {},
		label = undefined,
		labelId = undefined,
		fullWidth = false,
		required = false,
		size =  undefined,
		style = undefined,
		error = undefined
}) {
	return (
		<FormControl required={required} fullWidth={fullWidth} size={size} style={style}>
			<InputLabel id={labelId}>
				{label}
			</InputLabel>
			<Select
				required={required}
				labelId={labelId}
				label={label}
				value={value}
				fullWidth={fullWidth}
				size={size}
				onChange={(e) => onChange(e.target.value)}
				error={error}
			>
				{data.map((x, i) => <MenuItem value={getItemValue(x)}>{getItemLabel(x)}</MenuItem>)}
			</Select>
		</FormControl>
	)
}
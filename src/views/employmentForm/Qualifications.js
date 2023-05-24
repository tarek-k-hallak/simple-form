/** @format */

import React from 'react';

// ** MUI Imports
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

// ** Third Party
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from 'react-datepicker';
import { useFieldArray } from 'react-hook-form';

import {
	ADDRESS,
	EXPERIENCES_CLASS,
	EXPERIENCES_SUBJECT,
	CURRENT_SITUATION,
	FAMILIAL_STATUS,
	GENDER,
	OBLIGATORY_SERVICE,
} from 'src/const/dropDownList';

const schema = yup.object().shape({
	Certificate: yup.string().required('هذا الحقل مطلوب'),
	grant_year: yup.date().typeError('يرجى ادخال تاريخ صحيح').required('هذا الحقل مطلوب'),
});

const defaultValues = {
	Certificate: '',
	grant_year: '',
};

const Qualifications = ({ control, register, errors }) => {
	// ** Hooks
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'qualifications',
	});

	// ** FUNCTIONS
	const addNewTechSkill = () => {
		append({
			Certificate: '',
			grant_year: '',
		});
	};

	const deleteCard = (i) => {
		remove(i);
	};

	return (
		<Card sx={{ p: 2 }}>
			<Grid container justifyContent={'space-between'}>
				<Grid item xs={10}>
					<Typography variant='h4' sx={{ fontWeight: 'bold' }}>
						المؤهلات العلمية
					</Typography>
				</Grid>

				<Grid item xs={1}>
					<Button variant='contained' color='success' onClick={addNewTechSkill}>
						+
					</Button>
				</Grid>
			</Grid>

			{fields.map((field, i) => (
				<Card key={field.id} sx={{ padding: 2, mt: 5 }}>
					<Grid container justifyContent={'space-between'} rowGap={5}>
						{/* Certificate */}
						<Grid item xs={5}>
							<TextField
								{...register(`qualifications.${i}.Certificate`)}
								fullWidth
								label={'الشهادة'}
								type='text'
								variant='filled'
							/>
						</Grid>

						{/* grant_year */}
						<Grid item xs={5}>
							<Controller
								name={`qualifications.${i}.grant_year`}
								control={control}
								render={({ field: { value, onChange } }) => (
									<DatePicker
										selected={value}
										showYearDropdown
										showMonthDropdown
										onChange={(e) => onChange(e)}
										placeholderText='MM/DD/YYYY'
										customInput={
											<TextField
												fullWidth
												value={value}
												icon={'ic:round-access-time'}
												label={'سنة المنح'}
												error={Boolean(errors.grant_year)}
											/>
										}
									/>
								)}
							/>
						</Grid>

						<Grid item xs={10}></Grid>
						<Grid item xs={1}>
							<Button variant='contained' color='error' onClick={() => deleteCard(i)}>
								x
							</Button>
						</Grid>
					</Grid>
				</Card>
			))}
			{errors.qualifications && (
				<FormHelperText sx={{ color: 'error.main' }}>
					{errors.qualifications.message}
				</FormHelperText>
			)}
		</Card>
	);
};

export default Qualifications;

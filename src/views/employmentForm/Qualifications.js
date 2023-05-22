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

const Qualifications = ({ setEmploymentFrom, employmentFrom }) => {
	// ** Hooks
	const {
		handleSubmit,
		control,
		getValues,
		reset,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema),
		defaultValues,
	});

	const addNewQualifications = () => {
		const newQualArray = [];
		newQualArray.push(...employmentFrom.qualifications);
		newQualArray.push(getValues());
		setEmploymentFrom({
			...employmentFrom,
			qualifications: newQualArray,
		});
		reset();
	};

	const deleteCard = (Certificate) => {
		let newQualArray = [];
		newQualArray = employmentFrom.qualifications.filter(
			(card) => card.Certificate !== Certificate
		);
		setEmploymentFrom({
			...employmentFrom,
			qualifications: newQualArray,
		});
	};

	return (
		<Box mt={5}>
			<Grid container justifyContent={'space-between'}>
				<Grid item xs={10}>
					<Typography variant='h6' sx={{ fontWeight: 'bold' }}>
						المؤهلات العلمية:
					</Typography>
				</Grid>

				<Grid item xs={1}>
					<Button variant='contained' color='success' onClick={addNewQualifications}>
						+
					</Button>
				</Grid>
			</Grid>

			<Card sx={{ padding: 2, mb: 5 }}>
				<Grid container justifyContent={'space-between'} rowGap={5}>
					{/* Certificate */}
					<Grid item xs={5}>
						<Controller
							name={`Certificate`}
							control={control}
							render={({ field: { onChange, onBlur, value, ref } }) => (
								<TextField
									fullWidth
									label={'الشهادة'}
									onBlur={onBlur}
									onChange={onChange}
									value={value}
									type='text'
									variant='filled'
									ref={ref}
									error={Boolean(errors.Certificate)}
								/>
							)}
						/>
						{errors.Certificate && (
							<FormHelperText sx={{ color: 'error.main' }}>
								{errors.Certificate.message}
							</FormHelperText>
						)}
					</Grid>

					{/* grant_year */}
					<Grid item xs={5}>
						<Box>
							<Controller
								name='grant_year'
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
												onChange={onChange}
												icon={'ic:round-access-time'}
												label={'سنة المنح'}
												error={Boolean(errors.grant_year)}
											/>
										}
									/>
								)}
							/>
							{errors.grant_year && (
								<FormHelperText
									sx={{
										color: 'error.main',
									}}>
									{errors.grant_year.message}
								</FormHelperText>
							)}
						</Box>
					</Grid>
				</Grid>
			</Card>

			{employmentFrom.qualifications.map((card, index) => (
				<Card key={index} sx={{ padding: 2, mt: 5 }}>
					<Grid container justifyContent={'space-between'} rowGap={5}>
						<Grid item xs={12}>
							<Button
								variant='contained'
								color='error'
								onClick={() => deleteCard(card.Certificate)}>
								x
							</Button>
						</Grid>
						{/* Certificate */}
						<Grid item xs={5}>
							<TextField
								fullWidth
								disabled
								label={'الشهادة'}
								value={card.Certificate}
								type='text'
								variant='filled'
							/>
						</Grid>

						{/* grant_year */}
						<Grid item xs={5}>
							<Box>
								<DatePicker
									disabled
									selected={card.grant_year}
									showYearDropdown
									showMonthDropdown
									onChange={(e) => onChange(e)}
									placeholderText='MM/DD/YYYY'
									customInput={
										<TextField
											fullWidth
											value={card.grant_year}
											icon={'ic:round-access-time'}
											label={'سنة المنح'}
										/>
									}
								/>
							</Box>
						</Grid>
					</Grid>
				</Card>
			))}
		</Box>
	);
};

export default Qualifications;

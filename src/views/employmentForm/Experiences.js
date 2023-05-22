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
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

// ** Third Party
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from 'react-datepicker';

import { EXPERIENCES_CLASS, EXPERIENCES_SUBJECT } from 'src/const/dropDownList';

const schema = yup.object().shape({
	subject: yup.array().min(1, 'اضف مادة واحدة على الاقل'),
	classes: yup.array().min(1, 'اضف صف واحد على الاقل'),
	school: yup.string().required('هذا الحقل مطلوب'),
	years_count: yup.number().typeError('يرجى ادخال رقم صحيح').required('هذا الحقل مطلوب'),
});

const defaultValues = {
	subject: [],
	classes: [],
	school: '',
	years_count: '',
};

const Experiences = ({ setEmploymentFrom, employmentFrom }) => {
	// ** Hooks
	const {
		register,
		control,
		getValues,
		reset,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema),
		defaultValues,
	});

	const addNewExperience = () => {
		console.log('v', getValues());

		const newExpArray = [];
		newExpArray.push(...employmentFrom.experiences);
		newExpArray.push(getValues());
		setEmploymentFrom({
			...employmentFrom,
			experiences: newExpArray,
		});
		reset();
	};

	const deleteCard = (school) => {
		let newExpArray = [];
		newExpArray = employmentFrom.experiences.filter((card) => card.school !== school);
		setEmploymentFrom({
			...employmentFrom,
			experiences: newExpArray,
		});
	};

	return (
		<Box mt={5}>
			<Grid container justifyContent={'space-between'}>
				<Grid item xs={10}>
					<Typography variant='h6' sx={{ fontWeight: 'bold' }}>
						الخبرات
					</Typography>
				</Grid>

				<Grid item xs={1}>
					<Button variant='contained' color='success' onClick={addNewExperience}>
						+
					</Button>
				</Grid>
			</Grid>

			<Card sx={{ padding: 2, mb: 5 }}>
				<Grid container justifyContent={'space-between'} rowGap={5}>
					{/* school */}
					<Grid item xs={5}>
						<TextField
							{...register('school')}
							fullWidth
							label={'المدرسة'}
							type='text'
							variant='filled'
							error={Boolean(errors.school)}
						/>
						{errors.school && (
							<FormHelperText sx={{ color: 'error.main' }}>
								{errors.school.message}
							</FormHelperText>
						)}
					</Grid>

					{/* years_count */}
					<Grid item xs={5}>
						<TextField
							{...register('years_count')}
							fullWidth
							label={'عدد السنوات'}
							type='number'
							variant='filled'
							error={Boolean(errors.years_count)}
						/>
						{errors.years_count && (
							<FormHelperText sx={{ color: 'error.main' }}>
								{errors.years_count.message}
							</FormHelperText>
						)}
					</Grid>

					{/* subject */}
					<Grid item xs={12}>
						<FormControl fullWidth>
							<FormLabel id={`subject`}>المادة</FormLabel>
							<FormGroup
								row
								sx={{
									display: 'grid',
									gridTemplateColumns: 'auto auto auto auto auto auto',
								}}>
								{EXPERIENCES_SUBJECT.map((item) => (
									<FormControlLabel
										key={item.value}
										value={item.value}
										label={item.label}
										labelPlacement='start'
										control={<input {...register('subject')} type='checkbox' />}
									/>
								))}
							</FormGroup>
						</FormControl>
					</Grid>

					{/* classes */}
					<Grid item xs={12}>
						<FormControl fullWidth>
							<FormLabel id={`classes`}>الصف</FormLabel>
							<FormGroup
								row
								sx={{
									display: 'grid',
									gridTemplateColumns: 'auto auto auto auto auto auto',
								}}>
								{EXPERIENCES_CLASS.map((item) => (
									<FormControlLabel
										key={item.value}
										value={item.value}
										label={item.label}
										labelPlacement='start'
										control={<input {...register('classes')} type='checkbox' />}
									/>
								))}
							</FormGroup>
							{errors.classes && (
								<FormHelperText sx={{ color: 'error.main' }}>
									{errors.classes.message}
								</FormHelperText>
							)}
						</FormControl>
					</Grid>
				</Grid>
			</Card>
			{employmentFrom.experiences.map((card, index) => (
				<Card key={index} sx={{ padding: 2, mt: 5 }}>
					<Grid container justifyContent={'space-between'} rowGap={5}>
						<Grid item xs={12}>
							<Button
								variant='contained'
								color='error'
								onClick={() => deleteCard(card.school)}>
								x
							</Button>
						</Grid>

						{/* school */}
						<Grid item xs={5}>
							<TextField
								disabled
								fullWidth
								label={'المدرسة'}
								value={card.school}
								type='text'
								variant='filled'
							/>
						</Grid>

						{/* years_count */}
						<Grid item xs={5}>
							<TextField
								fullWidth
								disabled
								label={'عدد السنوات'}
								value={card.years_count}
								type='number'
								variant='filled'
							/>
						</Grid>

						{/* subject */}
						<Grid item xs={12}>
							<FormControl fullWidth>
								<FormLabel id={`subject`}>المادة</FormLabel>
								<FormGroup
									row
									sx={{
										display: 'grid',
										gridTemplateColumns: 'auto auto auto auto auto auto',
									}}>
									{EXPERIENCES_SUBJECT.map((item) => (
										<FormControlLabel
											key={item.value}
											value={item.value}
											label={item.label}
											labelPlacement='start'
											control={
												<input
													type='checkbox'
													disabled
													checked={card.subject.includes(item.value)}
												/>
											}
										/>
									))}
								</FormGroup>
							</FormControl>
						</Grid>

						{/* classes */}
						<Grid item xs={12}>
							<FormControl fullWidth>
								<FormLabel id={`classes`}>الصف</FormLabel>
								<FormGroup
									row
									sx={{
										display: 'grid',
										gridTemplateColumns: 'auto auto auto auto auto auto',
									}}>
									{EXPERIENCES_CLASS.map((item) => (
										<FormControlLabel
											key={item.value}
											value={item.value}
											label={item.label}
											labelPlacement='start'
											control={
												<input
													type='checkbox'
													disabled
													checked={card.classes.includes(item.value)}
												/>
											}
										/>
									))}
								</FormGroup>
								{errors.classes && (
									<FormHelperText sx={{ color: 'error.main' }}>
										{errors.classes.message}
									</FormHelperText>
								)}
							</FormControl>
						</Grid>
					</Grid>
				</Card>
			))}
		</Box>
	);
};

export default Experiences;

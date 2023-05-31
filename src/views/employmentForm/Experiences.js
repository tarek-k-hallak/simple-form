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
import { useFieldArray } from 'react-hook-form';

import { EXPERIENCES_CLASS, EXPERIENCES_SUBJECT } from 'src/const/dropDownList';

const Experiences = ({ control, register, errors }) => {
	// ** Hooks
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'experiences',
	});

	// ** FUNCTIONS
	const addNewTechSkill = () => {
		append({
			subject: EXPERIENCES_SUBJECT,
			classes: EXPERIENCES_CLASS,
			school: '',
			years_count: '',
		});
	};

	const deleteCard = (i) => {
		remove(i);
	};

	return (
		<Box>
			<Grid container justifyContent={'space-between'}>
				<Grid item xs={10}>
					<Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
						الخبرات
					</Typography>
				</Grid>
				<Grid item xs={1}>
					<Button variant='contained' color='success' onClick={addNewTechSkill}>
						+
					</Button>
				</Grid>
			</Grid>

			{fields.map((field, i) => (
				<Card key={field.id} sx={{ p: 1, mt: 3 }}>
					<Grid container justifyContent={'space-between'} rowGap={5}>
						{/* school */}
						<Grid item xs={5}>
							<TextField
								{...register(`experiences.${i}.school`)}
								fullWidth
								label={'المدرسة'}
								type='text'
								variant='filled'
							/>
							{/* {errors.experiences[i].school && (
								<FormHelperText sx={{ color: 'error.main' }}>
									{errors.experiences[i].school.message}
								</FormHelperText>
							)} */}
						</Grid>

						{/* years_count */}
						<Grid item xs={5}>
							<TextField
								{...register(`experiences.${i}.years_count`)}
								fullWidth
								label={'عدد السنوات'}
								type='number'
								variant='filled'
							/>
							{/* {errors.experiences[0].years_count && (
								<FormHelperText sx={{ color: 'error.main' }}>
									{errors.experiences[i].years_count.message}
								</FormHelperText>
							)} */}
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
									{field.subject.map((item, j) => (
										<Box
											key={item.title}
											sx={{
												display: 'flex',
												flexDirection: 'row',
												alignItems: 'center',
											}}>
											<input
												type='checkbox'
												{...register(`experiences.${i}.subject.${j}.state`)}
											/>
											<Typography>{item.title}</Typography>
										</Box>
									))}
								</FormGroup>
							</FormControl>
							{/* {errors.experiences[0].subject && (
								<FormHelperText sx={{ color: 'error.main' }}>
									{errors.experiences[i].subject.message}
								</FormHelperText>
							)} */}
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
									{field.classes.map((item, j) => (
										<Box
											key={item.title}
											sx={{
												display: 'flex',
												flexDirection: 'row',
												alignItems: 'center',
											}}>
											<input
												type='checkbox'
												{...register(`experiences.${i}.classes.${j}.state`)}
											/>
											<Typography>{item.title}</Typography>
										</Box>
									))}
								</FormGroup>
							</FormControl>
							{/* {errors.experiences[0].classes && (
								<FormHelperText sx={{ color: 'error.main' }}>
									{errors.experiences[i].classes.message}
								</FormHelperText>
							)} */}
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
			{errors.experiences && (
				<FormHelperText sx={{ color: 'error.main' }}>
					{errors.experiences.message}
				</FormHelperText>
			)}
		</Box>
	);
};

export default Experiences;

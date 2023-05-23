/** @format */

// ** React
import { useEffect, useState } from 'react';

// ** MUI Imports
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
import FormGroup from '@mui/material/FormGroup';

// ** Third Party
import axios from 'axios';
import * as yup from 'yup';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from 'react-datepicker';

// ** Styles
import 'react-datepicker/dist/react-datepicker.css';

// ** Views
import Experiences from 'src/views/employmentForm/Experiences';
import Qualifications from 'src/views/employmentForm/Qualifications';

// ** Const
import {
	EXPERIENCES_CLASS,
	EXPERIENCES_SUBJECT,
	CURRENT_SITUATION,
	FAMILIAL_STATUS,
	GENDER,
	OBLIGATORY_SERVICE,
	YES_NO_QUESTION,
	TECH_SKILLS,
} from 'src/const/dropDownList';
import { Checkbox } from '@mui/material';

// Styled component for the upload image inside the dropzone area
const Column = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
}));

const schema = yup.object().shape({
	f_name: yup.string().required('هذا الحقل مطلوب'),
	l_name: yup.string().required('هذا الحقل مطلوب'),
	phone_number1: yup
		.string()
		.min(10, 'يجب ان يتألف الحقل من عشرة ارقام بالضبط')
		.max(10, 'يجب ان يتألف الحقل من عشرة ارقام بالضبط'),
	phone_number2: yup
		.string()
		.min(10, ' يجب ان يتألف الحقل من عشرة ارقام بالضبط')
		.max(10, 'يجب ان يتألف الحقل من عشرة ارقام بالضبط'),
	birth: yup.date().typeError('يرجى ادخال تاريخ صحيح').required('هذا الحقل مطلوب'),
	gender: yup.string().required('هذا الحقل مطلوب'),
	familial_status: yup.string().required('هذا الحقل مطلوب'),
	Obligatory_service: yup.string().required('هذا الحقل مطلوب'),
	count_of_years: yup.string().required('هذا الحقل مطلوب'),
	current_situation: yup.string().required('هذا الحقل مطلوب'),
	position_type: yup.string().required('هذا الحقل مطلوب'),
	related_add: yup.number().required('هذا الحقل مطلوب'),
	tech_skills: yup.array(),
	experiences: yup.array().min(1, 'اضف خبرة واحدة على الاقل'),
	qualifications: yup.array().min(1, 'اضف مهارة واحدة على الاقل'),
});

const defaultValues = {
	f_name: '',
	l_name: '',
	phone_number1: '',
	phone_number2: '',
	birth: '',
	gender: 'ذكر',
	familial_status: '',
	related_add: '',
	Obligatory_service: '',
	count_of_years: '',
	current_situation: '',
	position_type: '',
	tech_skills: TECH_SKILLS,
	other_tech_skills: { title: '', state: false },
	experiences: [],
	qualifications: [],
	question1: 'لا',
	sch: '',
	y_count: '',
	question2: 'لا',
	question3: 'لا',
	Question: 'لا',
};

export default function EmploymentFrom() {
	// ** State
	const [employmentFrom, setEmploymentFrom] = useState(defaultValues);
	const [allAddress, setAllAddress] = useState([]);

	// ** Hooks
	const {
		register,
		handleSubmit,
		setValue,
		control,
		getValues,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema),
		defaultValues,
	});
	console.log(getValues().tech_skills);

	const { fields, append } = useFieldArray({
		control,
		name: 'tech_skills',
	});

	// ** Functions
	// Submit to API
	const onSubmit = (data) => {
		console.log('POSTing...', {
			params: { ...data },
		});
		const postData = async () => {
			const res = await axios.post('http://172.16.1.219:8069/recruitment/create', {
				params: { ...data },
			});
			console.log(res);
		};
		postData();
	};

	const addNewTechSkill = () => {
		append({
			title: getValues().title,
			state: getValues().state ? true : false,
		});
		setValue('other_tech_skills', { title: '', state: false });
	};

	useEffect(() => {
		setValue('experiences', employmentFrom.experiences);
		setValue('qualifications', employmentFrom.qualifications);
	}, [employmentFrom]);

	useEffect(() => {
		fetch('http://172.16.1.219:8069/recruitment/website')
			.then((response) => response.json())
			.then((data) => setAllAddress(data.address));
	}, []);

	return (
		<form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
			<Container>
				<Grid container columnGap={5} rowGap={2}>
					<Grid item xs={12}>
						<Typography variant='h4'>طلب توظيف</Typography>
						<Typography variant='h6'>
							قم بإدخال المعلومات المطلوبة للحصول على فرصة عمل لدينا
						</Typography>
					</Grid>

					{/* f_name */}
					<Grid item xs={2.5}>
						<Controller
							name='f_name'
							control={control}
							render={({ field: { onChange, onBlur, value, ref } }) => (
								<TextField
									fullWidth
									label={'الاسم الاول'}
									onBlur={onBlur}
									onChange={onChange}
									value={value}
									type='text'
									variant='filled'
									ref={ref}
									error={Boolean(errors.f_name)}
								/>
							)}
						/>
						{errors.f_name && (
							<FormHelperText sx={{ color: 'error.main' }}>
								{errors.f_name.message}
							</FormHelperText>
						)}
					</Grid>

					{/* l_name */}
					<Grid item xs={2.5}>
						<Controller
							name='l_name'
							control={control}
							render={({ field: { onChange, onBlur, value, ref } }) => (
								<TextField
									fullWidth
									label={'اسم العائلة'}
									onBlur={onBlur}
									onChange={onChange}
									value={value}
									type='text'
									variant='filled'
									ref={ref}
									error={Boolean(errors.l_name)}
								/>
							)}
						/>
						{errors.l_name && (
							<FormHelperText sx={{ color: 'error.main' }}>
								{errors.l_name.message}
							</FormHelperText>
						)}
					</Grid>

					{/* phone_number1 */}
					<Grid item xs={2.5}>
						<Box>
							<Controller
								name='phone_number1'
								control={control}
								render={({ field: { onChange, onBlur, value, ref } }) => (
									<TextField
										fullWidth
										label={'رقم الموبايل الاول'}
										onBlur={onBlur}
										onChange={onChange}
										value={value}
										type='text'
										variant='filled'
										ref={ref}
										error={Boolean(errors.phone_number1)}
									/>
								)}
							/>
							{errors.phone_number1 && (
								<FormHelperText sx={{ color: 'error.main' }}>
									{errors.phone_number1.message}
								</FormHelperText>
							)}
						</Box>
					</Grid>

					{/* phone_number2 */}
					<Grid item xs={2.5}>
						<Box>
							<Controller
								name='phone_number2'
								control={control}
								render={({ field: { onChange, onBlur, value, ref } }) => (
									<TextField
										fullWidth
										label={'رقم الموبايل الثاني'}
										onBlur={onBlur}
										onChange={onChange}
										value={value}
										type='text'
										variant='filled'
										ref={ref}
										error={Boolean(errors.phone_number2)}
									/>
								)}
							/>
							{errors.phone_number2 && (
								<FormHelperText sx={{ color: 'error.main' }}>
									{errors.phone_number2.message}
								</FormHelperText>
							)}
						</Box>
					</Grid>

					{/* familial_status */}
					<Grid item xs={2.5}>
						<FormControl fullWidth>
							<InputLabel id='familial_status'>الحالة العائلية</InputLabel>
							<Controller
								name='familial_status'
								control={control}
								render={({ field: { value, onChange } }) => (
									<Select
										value={value}
										label={'الحالة العائلية'}
										onChange={onChange}
										error={Boolean(errors.familial_status)}
										aria-describedby='familial_status'>
										{FAMILIAL_STATUS.map((item) => (
											<MenuItem key={item.label} value={item.value}>
												{item.label}
											</MenuItem>
										))}
									</Select>
								)}
							/>
							{errors.gender && (
								<FormHelperText sx={{ color: 'error.main' }} id='gender'>
									{errors.gender.message}
								</FormHelperText>
							)}
						</FormControl>
					</Grid>

					{/* related_add */}
					<Grid item xs={2.5}>
						<FormControl fullWidth>
							<InputLabel id='related_add'>مكان السكن</InputLabel>
							<Controller
								name='related_add'
								control={control}
								render={({ field: { value, onChange } }) => (
									<Select
										value={value}
										label={'مكان السكن'}
										onChange={onChange}
										error={Boolean(errors.related_add)}
										aria-describedby='related_add'>
										{allAddress.map((item) => (
											<MenuItem key={item.id} value={item.id}>
												{item.name}
											</MenuItem>
										))}
									</Select>
								)}
							/>
							{errors.related_add && (
								<FormHelperText sx={{ color: 'error.main' }} id='related_add'>
									{errors.related_add.message}
								</FormHelperText>
							)}
						</FormControl>
					</Grid>

					{/* birth */}
					<Grid item xs={2.5}>
						<Box>
							<Controller
								name='birth'
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
												label={'سنة الميلاد'}
												error={Boolean(errors.birth)}
												aria-describedby='birth'
											/>
										}
									/>
								)}
							/>
							{errors.birth && (
								<FormHelperText
									sx={{
										mx: 3.5,
										color: 'error.main',
									}}
									id='birth'>
									{errors.birth.message}
								</FormHelperText>
							)}
						</Box>
					</Grid>

					{/* gender */}
					<Grid item xs={2.5}>
						<FormControl
							fullWidth
							sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
							<FormLabel id='gender'>الجنس</FormLabel>
							<Controller
								name='gender'
								control={control}
								render={({ field: { value, onChange } }) => (
									<RadioGroup
										row
										name='gender'
										value={value}
										label={'الجنس'}
										onChange={onChange}
										aria-describedby='gender'>
										{GENDER.map((item) => (
											<FormControlLabel
												key={item.value}
												value={item.value}
												control={<Radio />}
												label={item.label}
											/>
										))}
									</RadioGroup>
								)}
							/>
							{errors.gender && (
								<FormHelperText sx={{ color: 'error.main' }} id='gender'>
									{errors.gender.message}
								</FormHelperText>
							)}
						</FormControl>
					</Grid>

					{/* Obligatory_service */}
					<Grid item xs={5}>
						<FormControl fullWidth>
							<InputLabel id='Obligatory_service'>الخدمة الإلزامية</InputLabel>
							<Controller
								name='Obligatory_service'
								control={control}
								render={({ field: { value, onChange } }) => (
									<Select
										value={value}
										label={'الخدمة الإلزامية'}
										onChange={onChange}
										error={Boolean(errors.Obligatory_service)}
										aria-describedby='Obligatory_service'>
										{OBLIGATORY_SERVICE.map((item) => (
											<MenuItem key={item.label} value={item.value}>
												{item.label}
											</MenuItem>
										))}
									</Select>
								)}
							/>
							{errors.Obligatory_service && (
								<FormHelperText
									sx={{ color: 'error.main' }}
									id='Obligatory_service'>
									{errors.Obligatory_service.message}
								</FormHelperText>
							)}
						</FormControl>
					</Grid>

					{/* Obligatory_service ? count_of_years */}
					<Grid item xs={5}>
						<FormControl fullWidth>
							<InputLabel id='count_of_years'>عدد السنوات</InputLabel>
							<Controller
								name='count_of_years'
								control={control}
								render={({ field: { value, onChange } }) => (
									<Select
										value={value}
										label={'عدد السنوات'}
										onChange={onChange}
										error={Boolean(errors.Obligatory_service)}
										aria-describedby='Obligatory_service'>
										{OBLIGATORY_SERVICE[4].type.map((item) => (
											<MenuItem key={item.label} value={item.value}>
												{item.label}
											</MenuItem>
										))}
									</Select>
								)}
							/>
							{errors.count_of_years && (
								<FormHelperText sx={{ color: 'error.main' }} id='count_of_years'>
									{errors.count_of_years.message}
								</FormHelperText>
							)}
						</FormControl>
					</Grid>

					{/* current_situation */}
					<Grid item xs={5}>
						<FormControl fullWidth>
							<InputLabel id='current_situation'>الوضع الوظيفي الحالي</InputLabel>
							<Controller
								name='current_situation'
								control={control}
								render={({ field: { value, onChange } }) => (
									<Select
										value={value}
										label={'الوضع الوظيفي الحالي'}
										onChange={onChange}
										error={Boolean(errors.current_situation)}
										aria-describedby='current_situation'>
										{CURRENT_SITUATION.map((item) => (
											<MenuItem key={item.label} value={item.value}>
												{item.label}
											</MenuItem>
										))}
									</Select>
								)}
							/>
							{errors.current_situation && (
								<FormHelperText sx={{ color: 'error.main' }} id='current_situation'>
									{errors.current_situation.message}
								</FormHelperText>
							)}
						</FormControl>
					</Grid>

					{/* position_type */}
					<Grid item xs={5}>
						<FormControl fullWidth>
							<InputLabel id='position_type'>متفرغ جزئياً</InputLabel>
							<Controller
								name='position_type'
								control={control}
								render={({ field: { value, onChange } }) => (
									<Select
										value={value}
										label={'متفرغ جزئياً'}
										onChange={onChange}
										error={Boolean(errors.position_type)}
										aria-describedby='position_type'>
										{CURRENT_SITUATION[1].type.map((item) => (
											<MenuItem key={item.label} value={item.value}>
												{item.label}
											</MenuItem>
										))}
									</Select>
								)}
							/>
							{errors.current_situation && (
								<FormHelperText sx={{ color: 'error.main' }} id='current_situation'>
									{errors.current_situation.message}
								</FormHelperText>
							)}
						</FormControl>
					</Grid>

					{/* tech_skills */}
					<Grid item xs={5}>
						<FormControl fullWidth>
							<FormLabel id={`tech_skills`}>مهارات تقنية اخرى</FormLabel>
							<FormGroup>
								{fields.map((field, index) => (
									<Box key={index}>
										<Checkbox
											{...register(`tech_skills.${index}.state`)}
											type='checkbox'
										/>
										<TextField
											disabled
											placeholder='Other Tech'
											{...register(`tech_skills.${index}.title`)}
										/>
									</Box>
								))}
								{errors.tech_skills && (
									<FormHelperText sx={{ color: 'error.main' }}>
										{errors.tech_skills.message}
									</FormHelperText>
								)}
							</FormGroup>
							<Box>
								<Checkbox {...register(`other_tech_skills.state`)} />
								<TextField
									placeholder='Other'
									{...register(`other_tech_skills.title`)}
								/>
							</Box>
							<Button
								variant='contained'
								type='button'
								onClick={addNewTechSkill}
								sx={{ mt: 5, width: 80 }}>
								Append
							</Button>
						</FormControl>
					</Grid>

					{/* Experiences */}
					<Grid item xs={12}>
						<Experiences
							setEmploymentFrom={setEmploymentFrom}
							employmentFrom={employmentFrom}
						/>
					</Grid>

					{/* question3 */}
					<Grid item xs={12}>
						<FormControl
							fullWidth
							sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
							<FormLabel id='question3'>هل لديك شهادة ICDL؟</FormLabel>
							<Controller
								name='question3'
								control={control}
								render={({ field: { value, onChange } }) => (
									<RadioGroup
										row
										name='question3'
										value={value}
										label={'هل لديك شهادة ICDL؟'}
										onChange={onChange}
										aria-describedby='question3'>
										{YES_NO_QUESTION.map((item) => (
											<FormControlLabel
												key={item.value}
												value={item.value}
												control={<Radio />}
												label={item.label}
											/>
										))}
									</RadioGroup>
								)}
							/>
							{errors.question3 && (
								<FormHelperText sx={{ color: 'error.main' }} id='question3'>
									{errors.question3.message}
								</FormHelperText>
							)}
						</FormControl>
					</Grid>

					{/* question2 */}
					<Grid item xs={12}>
						<FormControl
							fullWidth
							sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
							<FormLabel id='question2'>هل لديك خبرة باستخدام الكومبيوتر؟</FormLabel>
							<Controller
								name='question2'
								control={control}
								render={({ field: { value, onChange } }) => (
									<RadioGroup
										row
										name='question2'
										value={value}
										label={'هل لديك خبرة باستخدام الكومبيوتر؟'}
										onChange={onChange}
										aria-describedby='question2'>
										{YES_NO_QUESTION.map((item) => (
											<FormControlLabel
												key={item.value}
												value={item.value}
												control={<Radio />}
												label={item.label}
											/>
										))}
									</RadioGroup>
								)}
							/>
							{errors.question2 && (
								<FormHelperText sx={{ color: 'error.main' }} id='question2'>
									{errors.question2.message}
								</FormHelperText>
							)}
						</FormControl>
					</Grid>

					{/* question1 */}
					<Grid item xs={12}>
						<FormControl
							fullWidth
							sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
							<FormLabel id='question1'>هل سبق لك التعليم عن بعد ؟</FormLabel>
							<Controller
								name='question1'
								control={control}
								render={({ field: { value, onChange } }) => (
									<RadioGroup
										row
										name='question1'
										value={value}
										label={'هل سبق لك التعليم عن بعد ؟'}
										onChange={onChange}
										aria-describedby='question1'>
										{YES_NO_QUESTION.map((item) => (
											<FormControlLabel
												key={item.value}
												value={item.value}
												control={<Radio />}
												label={item.label}
											/>
										))}
									</RadioGroup>
								)}
							/>
							{errors.question1 && (
								<FormHelperText sx={{ color: 'error.main' }} id='question1'>
									{errors.question1.message}
								</FormHelperText>
							)}
						</FormControl>
					</Grid>

					{/* sch */}
					<Grid item xs={3.5}>
						<Controller
							name={`sch`}
							control={control}
							render={({ field: { onChange, onBlur, value, ref } }) => (
								<TextField
									fullWidth
									label={'المدرسة'}
									onBlur={onBlur}
									onChange={onChange}
									value={value}
									type='text'
									variant='filled'
									ref={ref}
									error={Boolean(errors.sch)}
								/>
							)}
						/>
						{errors.sch && (
							<FormHelperText sx={{ color: 'error.main' }}>
								{errors.sch.message}
							</FormHelperText>
						)}
					</Grid>

					{/* y_count */}

					<Grid item xs={3.5}>
						<Controller
							name={`y_count`}
							control={control}
							render={({ field: { onChange, onBlur, value, ref } }) => (
								<TextField
									fullWidth
									label={'عدد السنوات'}
									onBlur={onBlur}
									onChange={onChange}
									value={value}
									type='number'
									variant='filled'
									ref={ref}
									error={Boolean(errors.y_count)}
								/>
							)}
						/>
						{errors.y_count && (
							<FormHelperText sx={{ color: 'error.main' }}>
								{errors.y_count.message}
							</FormHelperText>
						)}
					</Grid>

					{/* Qualifications */}
					<Grid item xs={12}>
						<Qualifications
							setEmploymentFrom={setEmploymentFrom}
							employmentFrom={employmentFrom}
						/>
					</Grid>

					{/* Question */}
					<Grid item xs={12}>
						<FormControl
							fullWidth
							sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
							<FormLabel id='Question'>
								هل لديك إمكانية العمل المأجور يوم الجمعة والسبت؟
							</FormLabel>
							<Controller
								name='Question'
								control={control}
								render={({ field: { value, onChange } }) => (
									<RadioGroup
										row
										name='Question'
										value={value}
										label={'هل لديك إمكانية العمل المأجور يوم الجمعة والسبت؟'}
										onChange={onChange}
										aria-describedby='Question'>
										{YES_NO_QUESTION.map((item) => (
											<FormControlLabel
												key={item.value}
												value={item.value}
												control={<Radio />}
												label={item.label}
											/>
										))}
									</RadioGroup>
								)}
							/>
							{errors.Question && (
								<FormHelperText sx={{ color: 'error.main' }} id='Question'>
									{errors.Question.message}
								</FormHelperText>
							)}
						</FormControl>
					</Grid>

					<Grid item xs={12} justifyContent={'center'} alignItems={'center'}>
						<Button variant='contained' type='submit' color='primary'>
							<Typography px={5} mx={5}>
								إرسال الطلب
							</Typography>
						</Button>
					</Grid>
				</Grid>
			</Container>
		</form>
	);
}

// https://github.com/react-hook-form/react-hook-form/tree/master/examples
// https://codesandbox.io/s/controlled-field-array-forked-svct5t?file=/src/App.tsx

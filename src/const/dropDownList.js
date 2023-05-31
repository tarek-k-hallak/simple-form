/** @format */

export const GENDER = [
	{ value: 'ذكر', label: 'ذكر' },
	{ value: 'انثى', label: 'انثى' },
];

export const YES_NO_QUESTION = [
	{ value: 'نعم', label: 'نعم' },
	{ value: 'لا', label: 'لا' },
];

export const FAMILIAL_STATUS = [
	{ value: 'عازب', label: 'عازب' },
	{ value: 'متزوج', label: 'متزوج' },
];

export const OBLIGATORY_SERVICE = [
	{ value: 'معفى', label: 'معفى' },
	{ value: 'احتياط', label: 'احتياط' },
	{ value: 'بالخدمة', label: 'بالخدمة' },
	{ value: 'أتم الخدمة', label: 'أتم الخدمة' },
	{
		value: 'مؤجل',
		label: 'مؤجل',
		type: [
			{ value: 'سنة واحدة', label: 'سنة واحدة' },
			{ value: 'سنتان', label: 'سنتان' },
			{ value: 'ثلاث سنوات', label: 'ثلاث سنوات' },
			{ value: 'اربع سنوات', label: 'اربع سنوات' },
			{ value: 'خمس سنوات', label: 'خمس سنوات' },
		],
	},
];

export const CURRENT_SITUATION = [
	{ value: 'متفرغ', label: 'متفرغ' },
	{
		value: 'متفرغ جزئيا',
		label: 'متفرغ جزئيا',
		type: [
			{ value: 'مدرس في مدرسة حكومية', label: 'مدرس في مدرسة حكومية' },
			{ value: 'مدرس في مدرسة خاصة', label: 'مدرس في مدرسة خاصة' },
		],
	},
];

export const TECH_SKILLS = [
	{ title: 'تصميم فيديوهات', state: false },
	{ title: 'تصميم صور', state: false },
	{ title: 'تصميم العاب إلكترونية', state: false },
	{ title: 'تصميم اختبارات إلكترونية', state: false },
];

export const EXPERIENCES_SUBJECT = [
	{ title: 'علوم', state: false },
	{ title: 'فيزياء', state: false },
	{ title: 'كيمياء', state: false },
	{ title: 'رياضيات', state: false },
	{ title: 'جغرافيا', state: false },
	{ title: 'تاريخ', state: false },
	{ title: 'فلسفة', state: false },
	{ title: 'معلوماتية', state: false },
	{ title: 'تربية وطنية', state: false },
	{ title: 'لغة عربية', state: false },
	{ title: 'لغة فرنسية', state: false },
	{ title: 'لغة إنجليزية', state: false },
	{ title: 'لغة روسية', state: false },
	{ title: 'ديانة مسيحية', state: false },
	{ title: 'ديانة إسلامية', state: false },
	{ title: 'موسيقى', state: false },
	{ title: 'فنون', state: false },
];

export const EXPERIENCES_CLASS = [
	{ title: 'الأول', state: false },
	{ title: 'الثاني', state: false },
	{ title: 'الثالث', state: false },
	{ title: 'الرابع', state: false },
	{ title: 'الخامس', state: false },
	{ title: 'السادس', state: false },
	{ title: 'السابع', state: false },
	{ title: 'الثامن', state: false },
	{ title: 'التاسع', state: false },
	{ title: 'العاشر العلمي', state: false },
	{ title: 'العاشر الأدبي', state: false },
	{ title: 'الحادي عشر العلمي', state: false },
	{ title: 'الحادي عشر الأدبي', state: false },
	{ title: 'البكالوريا العلمي', state: false },
	{ title: 'البكالوريا الأدبي', state: false },
];

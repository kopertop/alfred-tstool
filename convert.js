const { default: alfy } = await import('alfy');
const chrono = await import('chrono-node');
const { default: dayjs } = await import('dayjs');

let d;
if (isNaN(+process.argv[2])) {
	d = dayjs(chrono.parseDate(process.argv[2]));
} else {
	d = dayjs.unix(+process.argv[2]);
}
if (d && d.isValid()) {
	const formatted = {
		Unix: d.unix(),
		Local: d.toDate().toLocaleString(),
		Day: d.format('YYYY-MM-DD'),
		ISO: d.toISOString(),
	};
	const items = [];
	for (const key in formatted) {
		items.push({
			title: key,
			subtitle: formatted[key],
			arg: formatted[key],
			text: {
				copy: formatted[key],
				largetype: `${process.argv[2]}
____________________________________
Unix: ${formatted.Unix}
Local: ${formatted.Local}
Day: ${formatted.Day}
ISO: ${formatted.ISO}
`,
			},
		});
	}

	alfy.output(items);
} else {
	alfy.output([{
		title: 'Invalid Date',
		subtitle: process.argv[2],
	}]);
}

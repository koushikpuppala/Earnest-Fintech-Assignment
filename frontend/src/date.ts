export const readableDateTime = (data: Date) => {
	return new Date(data).toLocaleString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	})
}

export const readableDate = (data: Date) => {
	return new Date(data).toLocaleString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	})
}

export const ultimatumDateTime = (date: string | number | Date) => {
	return new Date(date).toLocaleString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
		weekday: 'long',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		timeZoneName: 'longGeneric',
	})
}

export const getStartOfDay = (date: Date) => {
	const startOfDay = new Date(date)
	startOfDay.setHours(0, 0, 0, 0)
	return startOfDay
}

export const getEndOfDay = (date: Date) => {
	const endOfDay = new Date(date)
	endOfDay.setHours(23, 59, 59, 999)
	return endOfDay
}

import React from 'react';
import { useParams } from 'react-router-dom';

const CheckDate = () => {
	const { date } = useParams();

	const isDate = /^\d{4}([./-])\d{2}\1\d{2}$/;
	const checkDate = isDate.test(date);

	const enterDate = new Date(date);
	const nowDate = new Date();

	const year = nowDate.getFullYear();
	const currentMonth = nowDate.getMonth() + 1;
	const month = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
	const dayOfMonth = nowDate.getDate();
	console.log(enterDate);
	console.log(nowDate.getTime());
	console.log(enterDate.getTime());

	if (checkDate) {
		if (nowDate.getTime() > enterDate.getTime()) {
			return (
				<div>
					Today: {year}-{month}-{dayOfMonth}. You enter: {date}
				</div>
			);
		}
		return <div>You enter incorrect Date</div>;
	}
	return <div>You enter Date in incorrect format</div>;
};

export default CheckDate;

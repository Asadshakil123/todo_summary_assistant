import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSlackMessage, selectSlackSuccess, clearSlackMessage } from '../features/slack/slackSlice';

function SlackMessage() {
	const message = useSelector(selectSlackMessage);
	const success = useSelector(selectSlackSuccess);
	const dispatch = useDispatch();

	useEffect(() => {
		if (message) {
			const timer = setTimeout(() => {
				dispatch(clearSlackMessage());
			}, 5000); // Clear message after 5 seconds
			return () => clearTimeout(timer);
		}
	}, [message, dispatch]);

	if (!message) return null;

	const style = {
		padding: '10px',
		borderRadius: '5px',
		marginTop: '20px',
		textAlign: 'center',
		color: 'white',
		backgroundColor: success ? '#28a745' : '#dc3545', // Green for success, red for failure
	};

	return (
		<div style={style}>
			{message}
		</div>
	);
}

export default SlackMessage;
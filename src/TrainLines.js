import React from "react"

const TrainLines = props => {
	const lines = ['R','M','Q','W','1','2','3','F','7','E','N','A','B','C','J','6'];
	const urlParams = new URLSearchParams(document.location.search);

	let li, liArr = [];
	lines.forEach(l => {
		let aHref = urlParams.get('lang') === null ? `?line=${l}` : `?line=${l}&lang=${urlParams.get('lang')}`;
		let currentLine = urlParams.get('line');
		li = (
		<li key={l} id={l}>
			<a href={aHref}><img className={currentLine === l ? 'currLine lineImg':'lineImg'} async alt={l} src={`https://new.mta.info/themes/custom/bootstrap_mta/images/icons/${l}.svg`} /></a>
		</li>
		);
		liArr.push(li);
	})
	return (
	<>
	<ul id="ul">{liArr}</ul>
	</>
	);
}

export default TrainLines;
import React, { useContext } from "react";
import Styles from "./Answer.module.scss";
import { StatesContext } from "../../App";
import Context from "../../Interfaces/Components.interface";

function Answer() {
	const { states, setStates } = useContext(StatesContext);

	const currentWord = states.data[states.currentWord];

	function toggleShowAns() {
		setStates((prev: Context) => ({ ...prev, showAns: !states.showAns }));
	}

	return (
		<div className={Styles.answer} onClick={toggleShowAns}>
			<h1>{currentWord.word}</h1>
			<h3>({currentWord.meaning})</h3>
			<div className={Styles.meanings_div}>
				<div className={Styles.on_readings}>
					<h3>On-Readings</h3>
					<p>
						<strong>Reading:</strong> {currentWord.on_reading.reading}
					</p>
					<p>
						<strong>As in:</strong> {currentWord.on_reading.example.eg}(
						{currentWord.on_reading.example.pronounciation})
					</p>
					<p>
						<strong>Meaning:</strong> {currentWord.on_reading.example.meaning}
					</p>
				</div>
				<div className={Styles.kun_readings}>
					<h3>Kun-Readings</h3>
					{currentWord.kun_reading.reading?<>
						<p>
							<strong>Reading:</strong> {currentWord.kun_reading.reading}
						</p>
						<p>
							<strong>As in:</strong> {currentWord.kun_reading.example.eg}(
							{currentWord.kun_reading.example.pronounciation})
						</p>
						<p>
							<strong>Meaning:</strong>{" "}
							{currentWord.kun_reading.example.meaning}
						</p>
					</>:<p>No kun Readings</p>}
				</div>
			</div>
		</div>
	);
}

export default Answer;

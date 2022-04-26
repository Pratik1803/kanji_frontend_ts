import React, { useContext } from "react";
import Styles from "./Kanji.module.scss";
import { StatesContext } from "../../App";
import Context from "../../Interfaces/Components.interface";

function Kanji() {
	const { states, setStates } = useContext(StatesContext);

	function toggleShowAns() {
		setStates((prev: Context) => ({ ...prev, showAns: !states.showAns }));
	};
  
	return (
		<div className={Styles.kanji} onClick={toggleShowAns}>
			<h1>{states.data[states.currentWord].word}</h1>
		</div>
	);
}

export default Kanji;

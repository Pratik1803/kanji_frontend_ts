import KanjiResponse from "./KanjiResponse.interface";
export default interface Context {
	states: {
		showAns: boolean;
		currentWord:number;
        data:KanjiResponse[],
	};
	setStates: any;
}

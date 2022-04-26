export default interface KanjiResponse {
	word: string;
	meaning: string;
	level: number;
	on_reading: {
		reading: string;
		example: {
			eg: string;
			meaning: string;
			pronounciation: string;
		};
	};
	kun_reading: {
		reading: string;
		example: {
			eg: string;
			meaning: string;
			pronounciation: string;
		};
	};
}

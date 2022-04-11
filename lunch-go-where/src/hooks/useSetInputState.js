import { useState } from "react";

const useSetInputState = (initialVal = "") => {
	const [ state, setState ] = useState(initialVal);
	const handleChange = (evt) => {
		setState(evt.target.value);
	};
	const reset = () => {
		setState(initialVal);
	};

	return [ state, setState, handleChange, reset ];
};

export default useSetInputState;

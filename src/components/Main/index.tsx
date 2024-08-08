import { useEffect, useReducer } from "react";

const initialState = {
  questions: [],
  loading: true,
  start: false,
  index: 0,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "received":
      return { ...state, loading: false, questions: action.payload };
    case "start":
      return { ...state, start: true };
    case "nextQuestion":
      return { ...state, index: state.index + 1 };
  }
};

export default function Main() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((json) => dispatch({ type: "received", payload: json }))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {state.loading && (
        <h1 className="text-white text-center text-3xl font-bold">Loading</h1>
      )}
      <div className="flex justify-center">
        {state.start === false && (
          <button
            onClick={() => dispatch({ type: "start" })}
            className="rounded-lg bg-white font-bold h-10 w-20"
          >
            Start
          </button>
        )}
      </div>
    </>
  );
}

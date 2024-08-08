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

  if (state.questions[0]) console.log(state.questions[0]);

  return (
    <div className="flex justify-center">
      <div className="w-4/6">
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
          {state.start === true && (
            <p className="text-white mt-10">{state.questions[0].question}</p>
          )}
        </div>
        <div className="flex justify-between">
          {state.start === true && (
            <>
              <button className="rounded-lg bg-white font-bold h-10 w-20">
                Previous
              </button>
              <button className="rounded-lg bg-white font-bold h-10 w-20">
                Next
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

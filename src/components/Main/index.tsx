import { useEffect, useReducer } from "react";

const initialState = {
  questions: [],
  loading: false,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "received":
      return { ...state, loading: false, questions: action.payload };
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

  return <h1>oi</h1>;
}

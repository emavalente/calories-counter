import { useEffect, useReducer } from "react";
import Form from "./components/Form";
import { initialState, activitytReducer } from "./reducers/activity-reducer";
import ActivityList from "./components/ActivityList";

function App() {
  const [state, dispatch] = useReducer(activitytReducer, initialState);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center font-bold text-white uppercase">
            Contador de Calorías
          </h1>
          <button
            className="bg-gray-800 hover:bg-gray-900 p-2 text-sm uppercase text-white cursor-pointer rounded-lg disabled:opacity-10 disabled:cursor-default"
            disabled={!(state.activities.length > 0)}
            onClick={() => dispatch({ type: "restart-app" })}
          >
            Reiniciar App
          </button>
        </div>
      </header>
      <section className="bg-lime-500 py-20 px5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;

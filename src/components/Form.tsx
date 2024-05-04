import { Dispatch, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Activity } from "../types";
import { categories } from "../data/categories";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

function Form({ dispatch, state }: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (activity) => activity.id === state.activeId
      )[0];
      // usamos [0] ya que filter retorna un arreglo nuevo y solo queremos el único valor del mismo.
      setActivity(selectedActivity);
    }
  }, [state.activeId]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    // Compruebo el input en el que se esta escribiendo: si el valor de id esta incluido en el array retorna true.
    const isNumberField = ["category", "calories"].includes(e.target.id);

    setActivity({
      ...activity,
      // Si el valor del input es "number" lo transformo a number.
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    // Reseteo formulario generando un nuevo id.
    setActivity({ ...initialState, id: uuidv4() });
  };

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoría:
        </label>
        <select
          name="categoria"
          id="category"
          value={activity.category}
          onChange={handleChange}
          className="border-slate-300 p-2 rounded-lg w-full bg-white"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Actividad:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={activity.name}
          onChange={handleChange}
          className="border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Bicicleta, Pesas..."
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias:
        </label>
        <input
          type="number"
          name="calories"
          id="calories"
          value={activity.calories}
          onChange={handleChange}
          className="border-slate-300 p-2 rounded-lg"
          placeholder="Ej. 300 o 500..."
        />
      </div>
      <input
        type="submit"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        disabled={!isValidActivity()}
      />
    </form>
  );
}

export default Form;

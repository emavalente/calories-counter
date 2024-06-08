import { ReactNode, useMemo, useReducer } from "react";
import { ActivityContext } from "./ActivityContext";
import { activitytReducer, initialState } from "../reducers/activity-reducer";
import { Activity } from "../types";
import { categories } from "../data/categories";

type ActivityProviderProps = {
  children: ReactNode;
};

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  // Logic code
  const [state, dispatch] = useReducer(activitytReducer, initialState);

  // Si la categoria del item recorrido es 1 total suma el valor de calorias de lo contrario el total sigue tal cual se encuentra.
  const caloriesConsumed = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [state.activities]
  );

  const caloriesBurned = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [state.activities]
  );

  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [state.activities]
  );

  // Usamos useMemo para guardar el nombre de la categoria calculado segun su valor
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [state.activities]
  );

  // usamos useMemo para corroborar que las actividades no esten vacías cada vez que cambien las actividades
  const isEmptyActivity = useMemo(
    () => state.activities.length > 0,
    [state.activities]
  );

  return (
    <ActivityContext.Provider
      value={{
        state,
        dispatch,
        caloriesConsumed,
        caloriesBurned,
        netCalories,
        categoryName,
        isEmptyActivity,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

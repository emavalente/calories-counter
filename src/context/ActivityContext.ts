import { Dispatch, createContext } from "react";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";
import { Activity } from "../types";

// Declaramos un type para los valores que retorna el provider del contexto.
type ActivityContextProps = {
  state: ActivityState;
  dispatch: Dispatch<ActivityActions>;
  caloriesConsumed: number;
  caloriesBurned: number;
  netCalories: number;
  categoryName: (category: Activity["category"]) => string[];
  isEmptyActivity: boolean;
};

export const ActivityContext = createContext<ActivityContextProps>(null!);

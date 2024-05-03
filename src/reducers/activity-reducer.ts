import { Activity } from "../types";

// Definimos un tipo para el estado inicial.
type ActivityState = {
  activities: Activity[];
};

// Aplicamos el tipo al estado inicial.
export const initialState: ActivityState = {
  activities: [],
};

// Definimos un tipo para los actions.
export type ActivityActions = {
  type: "save-activity";
  payload: { newActivity: Activity };
};

// Definición del reducer
export const activitytReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "save-activity") {
    // Este código maneja la lógica para modificar el state.
    console.log(action.payload.newActivity);

    return {
      //retorno una copia del estado actual que ingresa al reducer
      ...state,
      // sobreescribo la propiedad a modificar.
      activities: [...state.activities, action.payload.newActivity],
    };
  }

  return state;
};

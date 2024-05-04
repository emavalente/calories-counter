import { Activity } from "../types";

// Definimos un tipo para el estado inicial.
export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

// Aplicamos el tipo al estado inicial.
export const initialState: ActivityState = {
  activities: [],
  activeId: "",
};

// Definimos un tipo para los actions, cada action es un objeto donde definimos el type y payload que recibirá.
export type ActivityActions =
  | { type: "save-activity"; payload: { newActivity: Activity } }
  | { type: "set-activeId"; payload: { id: Activity["id"] } };

// Definición del reducer
export const activitytReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "save-activity") {
    let updatedActivities: Activity[] = [];

    if (state.activeId) {
      // Estamos editando.
      updatedActivities = state.activities.map((activity) =>
        activity.id === state.activeId ? action.payload.newActivity : activity
      );
    } else {
      // Es una actividad nueva.
      updatedActivities = [...state.activities, action.payload.newActivity];
    }

    return {
      // retorno una copia del estado actual que ingresa al reducer
      // y sobreescribo la propiedad a modificar.
      ...state,
      activities: updatedActivities,
      activeId: "", // agrego una copia del estado.activities y sumo la nueva actividad.
    };
  }

  if (action.type === "set-activeId") {
    // Este código maneja la lógica para modificar el state.
    return {
      ...state,
      activeId: action.payload.id,
    };
  }

  return state;
};

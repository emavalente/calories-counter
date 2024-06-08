import { Activity } from "../types";

// Definimos un tipo para el estado inicial.
export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

// Recupero los datos del localstorage
const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
};

// Declaramos un estado inicial y aplicamos el tipo al estado inicial.
export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: "",
};

// Definimos un tipo para cada action, cada action es un objeto donde el type y payload que recibe con diferentes valores.
export type ActivityActions =
  | { type: "save-activity"; payload: { newActivity: Activity } }
  | { type: "set-activeId"; payload: { id: Activity["id"] } }
  | { type: "remove-activity"; payload: { id: Activity["id"] } }
  | { type: "restart-app" };

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

  if (action.type === "remove-activity") {
    return {
      ...state,
      activities: state.activities.filter(
        (activity) => activity.id !== action.payload.id
      ),
    };
  }

  if (action.type === "restart-app") {
    return {
      activities: [],
      activeId: "",
    };
  }

  return state;
};

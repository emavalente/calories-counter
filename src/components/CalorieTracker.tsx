import { useMemo } from "react";
import { Activity } from "../types";
import CaloriesDisplay from "./CaloriesDisplay";

type CalorieTrackerProps = {
  activities: Activity[];
};

function CalorieTracker({ activities }: CalorieTrackerProps) {
  // Contadores

  // Si la categoria del item recorrido es 1 total suma el valor de calorias de lo contrario el total sigue tal cual se encuentra.
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [activities]
  );
  return (
    <>
      <h2 className="text-4xl font-black text-white text-center mb-10">
        Resumen de Calorias
      </h2>
      <div className="flex flex-col item-center md:flex-row md:justify-between gap-5 mt-10">
        <CaloriesDisplay
          calories={caloriesConsumed}
          text="Consumidas"
          color="text-lime-500"
        />
        <CaloriesDisplay
          calories={netCalories}
          text="Diferencia"
          color="text-white-500"
        />
        <CaloriesDisplay
          calories={caloriesBurned}
          text="Quemadas"
          color="text-orange-500"
        />
      </div>
    </>
  );
}

export default CalorieTracker;

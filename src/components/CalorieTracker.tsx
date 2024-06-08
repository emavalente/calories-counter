import CaloriesDisplay from "./CaloriesDisplay";
import { useActivity } from "../hooks/useActivity";

function CalorieTracker() {
  const { caloriesConsumed, caloriesBurned, netCalories } = useActivity();

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

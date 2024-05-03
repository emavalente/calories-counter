import { Activity } from "../types/index";
import { categories } from "../data/categories";
import { useMemo } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

type ActivityListProps = {
  activities: Activity[];
};

function ActivityList({ activities }: ActivityListProps) {
  // Usamos useMemo para guardar el nombre de la categoria calculado segun su valor
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [activities]
  );

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Comida y Actividades
      </h2>
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="px-5 py-10 bg-white mt-5 flex justify-between"
        >
          <div className="space-y-2 relative">
            <p
              className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold rounded-lg ${
                activity.category === 1 ? "bg-lime-500" : "bg-orange-500"
              }`}
            >
              {categoryName(+activity.category)}
            </p>
            <p className="text-2xl font-bold pt-5">{activity.name}</p>
            <p className="text-4xl font-black text-lime-500">
              {activity.calories} {""}
              <span>Calorias</span>
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <button>
              <PencilSquareIcon className="h-8 w-8 text-gray-800" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default ActivityList;
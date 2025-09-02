import React from "react";
import SectionWrapper from "./SectionWrapper";
import { SCHEMES, WORKOUTS } from "../utils/swoldier";
import Button from "./button";
function Header(props) {
  const { index, title, description } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 justify-center">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">
          {index}
        </p>
        <h4 className="text-xl sm:text-2xl md:text-3xl">{title}</h4>
      </div>
      <p className="text-sm sm:text-base mx-auto">{description}</p>
    </div>
  );
}

export default function Generator(props) {
  const {
    poison,
    setPoison,
    muscles = [],
    setMuscles,
    goal,
    setGoal,
    updateWorkout,
  } = props;
  const [showMode, setShowMode] = React.useState(false);

  function toggleMode() {
    setShowMode(!showMode);
  }

  function updateMuscle(selected) {
    if (muscles.includes(selected)) {
      setMuscles(muscles.filter((val) => val !== selected));

      return;
    }
    if (muscles.length > 2) {
      return;
    }

    if (poison !== "individual") {
      setMuscles([selected]);
      setShowMode(false);

      return;
    }
    setMuscles([...muscles, selected]);

    if (muscles.length === 2) {
      setShowMode(false);
      return;
    }
  }
  return (
    <SectionWrapper
      id={"generate"}
      header={"generate your workout"}
      title={["It's", "Huge", "o'clock"]}
    >
      <Header
        index={"01"}
        title={"Pick your poison"}
        description={"select the workout you wish to endure"}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.keys(WORKOUTS).map((type, typeIndex) => {
          return (
            <button
              onClick={() => {
                setMuscles([]);
                setPoison(type);
              }}
              className={
                "bg-slate-950 border border-blue-400 py-4 rounded-lg hover:border-blue-600" +
                (type === poison ? " border-blue-600" : " border-blue-400")
              }
              key={typeIndex}
            >
              <p className="capitalize">{type.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>

      <Header
        index={"02"}
        title={"Lock on target"}
        description={"select the muscle you wish to kill today"}
      />
      <div className="bg-slate-950 py-3 border border-solid border-blue-400 flex flex-col rounded-lg">
        <button
          onClick={toggleMode}
          className="relative px-4 flex items-center justify-center"
        >
          <p className="capitalize">
            {muscles.length == 0 ? "Select a muscle group" : muscles.join(" ")}
          </p>
          <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down"></i>
        </button>
        {showMode && (
          <div className="flex flex-col p-3">
            {(poison === "individual"
              ? WORKOUTS[poison]
              : Object.keys(WORKOUTS[poison])
            ).map((muscleGroup, muscleIndex) => {
              return (
                <button
                  onClick={() => updateMuscle(muscleGroup)}
                  key={muscleIndex}
                  className={
                    " px-4 hover:text-blue-400 duration-200" +
                    (muscles.includes(muscleGroup) ? " text-blue-400" : " ")
                  }
                >
                  <p className="uppercase">
                    {muscleGroup.replaceAll("_", " ")}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <Header
        index={"03"}
        title={"Become the beast"}
        description={"select your ultimate objective."}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
          return (
            <button
              onClick={() => setGoal(scheme)}
              className={
                "bg-slate-950 px-4 border border-blue-400 py-4 rounded-lg hover:border-blue-600" +
                (scheme === goal ? " border-blue-600" : " border-blue-400")
              }
              key={schemeIndex}
            >
              <p className="capitalize">{scheme.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>
      <Button func={updateWorkout} text={["Forumlate"]} />
    </SectionWrapper>
  );
}

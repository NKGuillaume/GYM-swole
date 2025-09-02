import React from "react";

import "./index.css";
import Hero from "./components/Hero";
import Workout from "./components/Workout";
import Generator from "./components/Generator";
import { generateWorkout } from "./utils/function";

export default function App() {
  const [workout, setWorkout] = React.useState(null);
  const [poison, setPoison] = React.useState("individual");
  const [muscle, setMuscle] = React.useState([]);
  const [goal, setGoal] = React.useState("strength_Power");

  function updateWorkout() {
    if (muscle.length < 1) {
      return;
    }
    let newWorkout = generateWorkout({ poison, muscle, goal });
    console.log(newWorkout);
    setWorkout(newWorkout);
    window.location.href = "#workout";
  }
  return (
    <main
      className="min-h-screen flex 
    flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base"
    >
      <Hero />
      <Generator
        poison={poison}
        setPoison={setPoison}
        muscle={muscle}
        setMuscle={setMuscle}
        goal={goal}
        setGoal={setGoal}
        updateWorkout={updateWorkout}
      />
      {workout && <Workout workou={workout} />}
    </main>
  );
}

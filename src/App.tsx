import { useEffect, useState } from "react";
import Equation from "./components/Equation";
import GraphCanvas from "./components/GraphCanvas";
import GridCanvas from "./components/GridCanvas";
import Link from "./components/Link";
import LossGraph from "./components/LossGraph";
import Settings from "./components/Settings";
import SettingsSection from "./components/SettingsSection";
import UserCanvas from "./components/UserCanvas";

const App = () => {
  const [coefficients, setCoefficients] = useState<number[]>([]);
  const [epochs, setEpochs] = useState(0);
  const [points, setPoints] = useState<[number, number][]>([]);

  const [degrees, setDegrees] = useState(1);
  const [learningRateLevel, setLearningRateLevel] = useState(-6);
  const [epochsLevel, setEpochsLevel] = useState(1);

  const [losses, setLosses] = useState<number[]>([]);

  useEffect(() => {
    const newCoefficients = [];
    for (let i = 0; i < degrees; i++) newCoefficients.push(Math.random() * 2 - 1);
    setCoefficients(newCoefficients);
    setEpochs(Math.pow(10, epochsLevel));
    setLosses([]);
  }, [points, degrees, epochsLevel, learningRateLevel]);

  useEffect(() => {
    if (epochs > 0) {
      setEpochs(epochs => epochs - 1);
      const loss = polyRegressionStep();
      setLosses(losses => isNaN(loss) ? losses : [...losses, loss]);
    }
  }, [epochs, coefficients]);

  const computePred = (x: number) => {
    let pred = 0;
    let xi = 1;

    for (let coefficient of coefficients) {
        pred += coefficient * xi;
        xi *= x;
    }

    return pred;
  };

  const polyRegressionStep = () => {
    let totalLoss = 0;
    const newCoefficients = [...coefficients];
    const n = points.length;

    for (let [x, y] of points) {
      const pred = computePred(x);
      totalLoss += Math.pow(pred - y, 2);

      for (let i = 0; i < coefficients.length; i++) {
        newCoefficients[i] -= (2 / n) * (pred - y) * Math.pow(x, i) * Math.pow(10, learningRateLevel);
      }
    }

    setCoefficients(newCoefficients);

    return totalLoss / n;
  };

  const clear = () => {
    setPoints([]);
    setCoefficients([]);
    setLosses([]);
  };

  return (
    <div className="flex-col p-12 flex justify-center items-center">
      <h1 className="text-transparent p-1 text-5xl font-bold w-[500px] bg-clip-text bg-gradient-to-tr from-indigo-500 to-teal-400">Poly-Regressor</h1>
      <p className="text-gray-500 w-[500px] mt-4">Click the graph to make points, play with the <Link href="https://en.wikipedia.org/wiki/Degree_of_a_polynomial">degree</Link>, <Link href="https://en.wikipedia.org/wiki/Learning_rate">learning rate (l.r.)</Link>, and <Link href="https://en.wikipedia.org/wiki/Epoch">epochs</Link> of the model in the settings, and measure the model's <Link href="https://en.wikipedia.org/wiki/Mean_squared_error">mean squared error (m.s.e.)</Link> in the loss graph</p>
      <div className="relative mt-8 border-8 box-content rounded-xl border-black shadow-lg h-[500px] w-[500px]">
        <GridCanvas />
        <GraphCanvas coefficients={coefficients} pointsExist={points.length > 0} />
        <UserCanvas points={points} setPoints={setPoints} />
        <Equation coefficients={coefficients} pointsExist={points.length > 0} />
      </div>
      <Settings clear={clear} >
        <SettingsSection 
            label="degrees"
            min={1}
            max={5}
            value={degrees}
            setValue={setDegrees}
        />
        <SettingsSection 
            label="l.r."
            min={-6}
            max={0}
            value={learningRateLevel}
            setValue={setLearningRateLevel}
            base10={true}
        />
        <SettingsSection 
            label="epochs"
            min={1}
            max={5}
            value={epochsLevel}
            setValue={setEpochsLevel}
            base10={true}
        />
      </Settings>
      <LossGraph losses={losses} />
    </div>
  );
};

export default App;
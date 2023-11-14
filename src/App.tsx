import React, { Suspense } from "react";
import "./App.css";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const AlwaysSuspend: React.FC = () => {
  console.log("AlwaysSuspend");
  throw sleep(1000);
};

export const SometimesSuspend: React.FC = () => {
  if (Math.random() < 0.5) {
    throw sleep(1000);
  }
  return <p>Hello, world!</p>;
};

type Props = {
  name: string;
};

export const RenderingNotifier: React.FC<Props> = ({ name }) => {
  console.log(`Rendering ${name}`);
  return null;
};

function App() {
  const [count, setCount] = React.useState(0);
  return (
    <div className="text-center">
      <h1 className="text-2xl">React App!</h1>
      <RenderingNotifier name="outside Suspense" />
      <Suspense fallback={<p>Loading...</p>}>
        <SometimesSuspend />
        <RenderingNotifier name="inside Suspense" />
        <button className="border p-1" onClick={() => setCount((c) => c + 1)}>
          {count}
        </button>
      </Suspense>
    </div>
  );
}

export default App;

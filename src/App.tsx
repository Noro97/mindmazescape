import Home from "./components/Home";

const App = () => {
  return (
    <div className="overflow-y-hidden flex flex-col justify-around bg-center-layer gap-2 bg-contain bg-bottom w-full h-[100vh] px-[20px]">
      <Home />
    </div>
  );
};

export default App;

import "./App.css";
import Chart from "./Containers/Chart";
import Map from "./Containers/Map";
import Navbar from "./Layouts/Navbar";
import List from "./Containers/List";

function App() {
  return (
    <>
      <Navbar />
      <div className="app-display">
        <div style={{height: "800px"}}>
          <Chart />
          <Map />
        </div>
        <List />
      </div>
    </>
  );
}

export default App;

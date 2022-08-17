import './App.css';
import { 
  MimickAndTransformText,
  UseLocalStorageHook,
  UseIntervalHook,
  FetchDataFromApi,
  ShowTabularData1,
  ShowTabularData2,
  ShowTabularData3,
  StateUpdateOnAnUnmountedComponent
} 
from './components/index';

function App() {
  return (
    <div className="App">
      <MimickAndTransformText />
      <UseLocalStorageHook />
      <UseIntervalHook />
      <FetchDataFromApi />
      <ShowTabularData1 />
      <ShowTabularData2 />
      <ShowTabularData3 />
      <StateUpdateOnAnUnmountedComponent />
    </div>
  );
}

export default App;

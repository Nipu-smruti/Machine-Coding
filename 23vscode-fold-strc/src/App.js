
import './App.css';
import { files } from './data';
import Folder from './Folder';

function App() {
  return (
    <div className="App">
      <h1>VS Code Folder Structure</h1>
      <Folder
        files={files}
      />
    </div>
  );
}

export default App;

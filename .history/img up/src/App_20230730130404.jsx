import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ImageUploader from './Components/Imgup'

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ImageUploader />
    </>
  );
}

export default App;

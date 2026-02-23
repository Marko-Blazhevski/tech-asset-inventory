import './App.css'
import {useAssets} from "./hook/useAssets.ts";

function App() {
  const { assets, isLoading } = useAssets();

  return (
    <>
        <div>
            {
                isLoading ? <p>Loading...</p>
                    : assets.map((asset) => (<div key={asset.id}>{asset.model}</div>))
            }
        </div>
    </>
  )
}

export default App

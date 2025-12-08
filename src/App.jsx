import './App.css'
import ProductCard from './components/productCard.jsx'

function App() {

  return (
    <>    
      <ProductCard name="LapTop" img="https://picsum.photos/id/6/200" Price="LKR 100,000.00" />

      <ProductCard name="Console" img="https://picsum.photos/id/96/200" Price="LKR 25,000.00" />

      <ProductCard name="Mobile" img="https://picsum.photos/id/160/200" Price="LKR 75,000.00" />
    
    </>
  )

}

export default App

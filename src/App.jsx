import './App.css'
import Header from './components/header.jsx'
import ProductCard from './components/productCard.jsx'

function App() {

  return (
    <div className="w-[600px] h-[600px] border bg-gray-400 relative">
      <div className="w-[500px] h-[500px] bg-yellow-100 flex flex-col justify-center items-center">
        <div className='w-[100px] h-[100px] bg-blue-500'>

        </div>
        <div className='w-[100px] h-[100px] bg-red-500 fixed left-[550px] top-[550px]'>

        </div>
        <div className='w-[100px] h-[100px] bg-green-500'>

        </div>
        <div className='w-[100px] h-[100px] absolute right-[50px] bottom-[50px] bg-orange-500'>

        </div>

      </div>

    </div>
  )

}

export default App

import React from 'react'
import Todo from './components/Todo'

const App = () => {
  return (
    <div className='bg-stone-900 grid py-4 min-h-screen justify-center items-center' >
      <h1>
        <Todo/>
      </h1>
    </div>
  )
}

export default App

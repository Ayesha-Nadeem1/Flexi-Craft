import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import { RefProvider } from './RefContext';

const WithLayout = (ComponentsToBeWrapped) => {
  return (props)=> (
    <RefProvider>
      <div  className='h-screen overflow-auto'>
        <Navbar />
          <div className='max-w-7xl mx-auto pt-20 px-6'>
            <ComponentsToBeWrapped {...props}/>
          </div>
        <Footer />
      </div>
    </RefProvider>
  )
}

export default WithLayout
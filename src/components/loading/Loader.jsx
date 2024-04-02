import React from 'react'
import { lineSpinner } from 'ldrs'

const Loader = () => {

  lineSpinner.register()

  return (
    <div className='container-loader'>
      <l-line-spinner
        size="40"
        stroke="3"
        speed="1"
        color="black"
      ></l-line-spinner>
    </div>
  )
}

export default Loader
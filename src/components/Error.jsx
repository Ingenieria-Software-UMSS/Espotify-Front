

import { size } from 'lodash'
import React from 'react'

const Error = ({mensaje}) => {
  return (
    <div style={{color:'#ffffff', fontSize:'24px', textAlign:'center', marginTop:'30px'}}>
      {mensaje}
    </div>
  )
}

export default Error

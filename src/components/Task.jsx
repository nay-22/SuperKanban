import React from 'react'

import bin from "../assets/bin.png";

const Task = ({id, title, onDelete}) => {
  return (
    <div
        style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: '100%',
        }}
    >
        <h3 style={{textAlign: 'left'}}>{title}</h3>
        <button className='btn-del' onClick={onDelete}><img width='20px' src={bin} alt="" /></button>
    </div>
  )
}

export default Task
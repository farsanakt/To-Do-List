import React from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'

function Todoitems({ text, id, isComplete, deleteTodo, toggle, startEdit, isEditing, editText, setEditText, saveEdit }) {
  return (
    <div className='flex items-center my-3 gap-2'>
      <div onClick={() => { toggle(id) }} className='flex flex-1 items-center cursor-pointer'>
        <img src={isComplete ? tick : not_tick} alt="" className='w-7' />
        {isEditing ? (
          <input 
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="text-slate-700 ml-4 text-[17px] bg-transparent border-b-2 border-slate-500 outline-none"
          />
        ) : (
          <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${isComplete ? 'line-through' : ''}`}>{text}</p>
        )}
      </div>
      {isEditing ? (
        <button onClick={saveEdit} className="text-blue-500">Save</button>
      ) : (
        <button onClick={() => startEdit(id, text)} className="text-blue-500">Edit</button>
      )}
      <img onClick={() => { deleteTodo(id) }} src={delete_icon} alt="" className='w-3.5 cursor-pointer' />
    </div>
  )
}

export default Todoitems;

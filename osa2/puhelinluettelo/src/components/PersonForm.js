import React from 'react'

const PersonForm = ({newName, onNameChange, newNumber, onNumberChange, onClick}) => {
    return (
    <form>
        <div>
          name: 
          <input 
            value={newName} onChange={onNameChange}
          />
        </div>
        <div>
          number: 
          <input value={newNumber} onChange={onNumberChange}/>
        </div>
        <div>
          <button type="submit" onClick={onClick}>add</button>
        </div>
      </form>
    )
}

export default PersonForm
import React, { useState } from 'react'
import Modal from './Modal'
import './addResource.css'
import Notification from './Notification'

function AddResource({toggleModal, setToggleModal}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  const resetState = () => {
    setTitle('')
    setDescription('')
    setUrl('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const some = window.contract.add_resources({title:title, url:url, description:description}).then(() => {
      setToggleModal(true)
      setShowNotification(true)
      resetState()
    })
  }

  return (
    <Modal open={toggleModal} onClose={() => setToggleModal(false)} modalLable="Add resource">
      <form onSubmit={handleSubmit} className='addResource'>

        <div className='addResource__ele'>
          <label>Enter resource title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
          
        <div className='addResource__ele'>
          <label>Enter resource url:</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
        </div>

        <div className='addResource__ele'>
          <label> Enter resource description: </label>
          <input
            type="text"
            max={20}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" className='submit' >Submit</button>
      </form>
      {showNotification && 
        <Notification 
          message={"Added new resource Just now"} 
          show={showNotification}
          remove={() => setShowNotification(false)}
        />
      }
    </Modal>

  )
}

export default AddResource
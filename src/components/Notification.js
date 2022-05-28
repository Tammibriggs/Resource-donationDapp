import React from 'react'
import { useEffect } from 'react'
import './notification.css'

function Notification({message, show, remove}) {

  useEffect(() => {
    if(show === true){
      const timer = setTimeout(() => {
        remove()
      }, 3000)

    return () => clearTimeout(timer)
    }
  }, [show])

  return (
    <aside className={`notification ${show ? "notification-show" : ''}`} >
      <footer>
        <div><i className='not-check'>✔</i> Succeeded </div>
        <div>{message}</div>
      </footer>   
    </aside>
  )
}

export default Notification
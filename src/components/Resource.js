import React, { useState } from 'react';
import Notification from './Notification'
import './resource.css'

const ONE_NEAR = 1_000_000_000_000_000_000_000_000;

function Resource ({ resource, donateNot, voteNot }) {

  const [donationAmount, setDonationAmount] = useState(0)

  const donate = (e) => {
    e.preventDefault()
    window.contract.add_donation({ id: resource.id, amount: donationAmount * 1 }).then(() => {
      setDonationAmount('')
      donateNot()
    })
  }

  const vote = () => {
    window.contract.add_vote({ id: resource.id }).then(() => {
      voteNot()
    })
  }

  return (
    <div className="resource">
      <h2>{resource.title}</h2>
      <div className='resource__desc'>
        <h3>Creator:</h3>
        <p className="resource__creator">{resource.creator}</p>
      </div>

      <div className='resource__desc description'>
        <h3>Description:</h3>
        <p>{resource.description}</p>
      </div>

      <div className='resource__desc'>
        <h3>Link:</h3>
        <a href={resource.url}>{resource.url}</a>
      </div>

      <div className='resource__desc'>
        <h3>Votes:</h3>
        <p> {resource.total_votes}</p> 
      </div>

      <button
        className='voteBtn'
        onClick={vote}
      > 
        Vote 
      </button>

      <div className='resource__desc'>
        <h3>Total donations: </h3>
        <p>{Math.round(resource.total_donations / ONE_NEAR)}</p>
      </div>

      <form onSubmit={donate} className='donationForm'> 
        <input
          type="number"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
        ></input>
        <button onClick={donate}>Donate</button>
      </form>
    </div>
  )
}


export default Resource
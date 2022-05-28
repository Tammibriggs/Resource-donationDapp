import 'regenerator-runtime/runtime'
import { useEffect, useState } from 'react'
import Resource from './components/Resource'
import AddResource from './components/AddResource'
import React from 'react'
import { login, logout } from './utils'
import './app.css'
import getConfig from './config'
import Parallax from 'react-rellax'
import Notification from './components/Notification'

export default function App() {
  const [resources, setResources] = useState([])
  const [toggleModal, setToggleModal] = useState(false)
  const [showDonateNotification, setShowDonateNotification] = useState(false)
  const [showVoteNotification, setShowVoteNotification] = useState(false)
  
  function addResource() {
    setToggleModal(true)
  }

  useEffect(
    () => {
      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {
        // window.contract is set by initContract in index.js
        window.contract.list_resources().then((resources) => {
          const resourceList = [...resources]
          setResources(resourceList)
        })
      }
    },
    [resources],
  )

  // if not signed in, return early with sign-in prompt
  if (!window.walletConnection.isSignedIn()) {
    return (
      <main style={{ textAlign: 'center', marginTop: '2.5em', color: 'white' }}>
        <h1>Welcome to resource sharing dApp</h1>
        <p style={{ textAlign: 'center' }}>
          Click the button below to sign in:
        </p>
        <p>
          <button
            onClick={login}
            style={{padding: '5px 10px', marginTop: '10px'}}
          >Sign in</button>
        </p>
      </main>
    )
  }

  return (
    // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
    <>
      <header>
        <div className='wrapper'>
          <span className="logo"></span>
          <a className="link" onClick={logout}>
            Sign out <span className="id">{window.accountId}</span>
          </a>
        </div>
      </header>

      <div className="background-top">
        <Parallax speed={1}>
          <div className='hero wrapper'>
            <section>
              Rescource Funding
            </section>
            <p>Get donations or donate to your favourite resource</p>
            <div className='rescource-btn'>
              <button onClick={addResource} className="btn add-r">Add a resource</button>
            </div>  
          </div>
        </Parallax>
      </div>
      <Parallax speed={1}>
        <main className='background-stream'>
          <h2>Resources</h2>
          <div className='resources wrapper' id='resources'>
            {resources.map((resource, id) => {
              return (
                <Resource 
                  resource={resource} 
                  key={id}
                  donateNot={() => setShowDonateNotification(true)}
                  voteNot={() => setShowVoteNotification(true)}
                />
              )
            })} 
          </div>
        </main>
      </Parallax>
      {toggleModal && <AddResource toggleModal={toggleModal} setToggleModal={setToggleModal}/>}

      {showDonateNotification && 
        <Notification 
          show={showDonateNotification} 
          message={"You donation has been sent"} 
          remove={() => setShowDonateNotification(false)}
        />
      }
      
      {showVoteNotification && 
        <Notification 
          show={showVoteNotification} 
          message={"You vote has been added"} 
          remove={() => setShowVoteNotification(false)}
        />
      }
    </>
  )
}
import React from 'react'
import './cards.css'
import { Link } from 'react-router-dom'
import cardimg from '../../images/card-img.jpg'
import { useAuth } from '../../jwt_Store/jwtStorage'

export const Cards = () => {

const {card}=useAuth()
 

  return (
    <>


      <div className="custom-container">
        {card.map((cur, ind) => (
          <div key={ind} className="custom-card">
            <img className="custom-card-img-top" src={cardimg} alt="Car" />
            <div className="custom-card-body">
              <h5 className="custom-card-title">{cur.title}</h5>
              <p className="custom-card-description">{cur.description}</p> 
            </div>
          </div>
        ))}
      </div>
      
    </>
  )
}

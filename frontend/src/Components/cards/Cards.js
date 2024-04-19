import React, { useEffect, useState } from 'react'
import './cards.css'
import { Link } from 'react-router-dom'
import cardimg from '../../images/card-img.jpg'

export const Cards = () => {
  const [card, setCard] = useState([])
  const [loading, setLoading] = useState(true)

  const getCard = async () => {
    try {
      const result = await fetch(`http://localhost:5000/newcard/getcard`, {
        method: 'GET'
      })
      if (result.ok) {
        const data = await result.json()
        setCard(data.cardData)
        setLoading(false)
      } else {
        console.error('Received data is not an array:')
      }
    } catch (error) {
      console.log('Error fetching card data:', error.message)
    }
  }

  useEffect(() => {
    getCard()
  }, [loading])

  if (loading) return <h6>loading...</h6>

  return (
    <>


      <div className="custom-container">
        {card.map((cur, ind) => (
          <div key={ind} className="custom-card">
            <img className="custom-card-img-top" src={cardimg} alt="Car" />
            <div className="custom-card-body">
              <h5 className="custom-card-title">{cur.title}</h5>
              <p className="custom-card-description">{cur.description}</p> {/* Add description below the title */}
            </div>
          </div>
        ))}
      </div>
      <Link to='/serviceform'>
        <button className='expl'>Get Started</button></Link>
    </>
  )
}

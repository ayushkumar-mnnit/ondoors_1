import React, { useEffect, useState } from 'react'
import './cards.css'
import { Link } from 'react-router-dom' 


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

    card.map((cur, index) => {
      return (
        <Link to='/serviceform'style={{ textDecoration: 'none', color: 'inherit' }}>
        <div key={index} className="cards-container">
          <div className="card">
            <div  className="card-body">
              <h5 className="card-title">{cur.title}</h5>
              <p className="card-text">{cur.description}</p>
             
            </div>

          </div>
        </div>
        </Link>
      )
    })
  )
}

import 'bootstrap/dist/css/bootstrap.min.css'
import './css/nav.css'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()



  const handleScroll = (sectionId) => {
    navigate('/') // Ensure you navigate to the home route first
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Ondoors</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" onClick={() => handleScroll('sec1')}>Home</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" onClick={() => handleScroll('sec5')}>Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => handleScroll('sec3')}>About Us</a>
            </li>
            <li className="nav-item">
            <a className="nav-link" onClick={() => handleScroll('sec4')}>Get in Touch</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => handleScroll('sec2')}>Login/Signup</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
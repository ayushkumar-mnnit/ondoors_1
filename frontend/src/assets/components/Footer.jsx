import './css/foot.css'
import logo from '../images/logo-1.png'
import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useAuth } from '../context/ContextAPI'
import { FaInstagram, FaLinkedin } from 'react-icons/fa'
import { SiGithub } from 'react-icons/si'
import { Link } from 'react-router-dom'

const api='https://ondoors-1.onrender.com'  // hosted backend url

const Footer = () => {

  const toast = useToast()

  const {card,token}=useAuth()



  const cards=card.slice(0,5)

  const [feedback, setFeedback] = useState({ feedbackMsg: '' })

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.post(`${api}/feedback`, feedback, {
        headers: {
          'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`,
        },withCredentials: true
      })

      if (result.data.success) {
        toast({
          title: result.data.message,
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: 'bottom-right',
        })
        setFeedback({
          feedbackMsg: ''
        })
      }
     
    } catch (error) {

      const x = error.response.data.message || 'server is down'
      toast({
        title: x.length > 40 ? x.split(':')[0] : x,
        description:x!='server is down'?'input field is too short or too long':'',
        status: x.length > 45 ? 'warning' : 'error',
        duration: 4000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFeedback({ ...feedback, [name]: value })
  }



  

  return (
    <>
      <footer className="footer py-3 py-xl-8">
        <div className="container">
          <div className="container-fluid bg-light">
            <div className="row justify-content-center">
              <div className="col-12 col-md-11">
                <section className="py-4 py-md-5 py-xl-8">
                  <div className="container-fluid overflow-hidden">
                    <div className="row gy-4 gy-lg-0 justify-content-xl-between">
                      <div className="col-12 col-md-4 col-lg-3 col-xl-2">
                        <div className="widget">
                          <a href="#!">
                          <a href='#sec1'><img src={logo} alt="BootstrapBrain Logo" width="175" height="57" /></a> 
                          </a>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 col-lg-3 col-xl-2">
                        <div className="widget">
                          <h4 className="widget-title mb-4">Services</h4>
                          <ul className="list-unstyled">

                          {cards.map((item)=>(
                            <li key={item._id} className="mb-2">
                            <a className="link-secondary text-decoration-none">
                              {item.title}
                              </a>
                            </li>
                          ))}
                          <li  className="mb-2">
                            <a className="link-secondary text-decoration-none">
                              and lot more..
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 col-lg-3 col-xl-2">
                        <div className="widget">
                          <h4 className="widget-title mb-4">Company</h4>
                          <ul className="list-unstyled">
                            <li className="mb-2">
                              <a href="#sec1" className="link-secondary text-decoration-none">Home</a>
                            </li>
                            <li className="mb-2">
                              <a href="#sec3" className="link-secondary text-decoration-none">About us</a>
                            </li>
                            <li className="mb-2">
                              <a href="#sec4" className="link-secondary text-decoration-none">Contact us</a>
                            </li>
                            <li className="mb-2">
                              <a href="#!" className="link-secondary text-decoration-none">Terms of Service</a>
                            </li>
                            <li className="mb-0">
                              <a href="#!" className="link-secondary text-decoration-none">Privacy Policy</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-12 col-lg-3 col-xl-4">
                        <div className="widget">
                          <h4 className="widget-title mb-4">Feedback</h4>
                          <p className="mb-4">Leave your valuable feedback here, it really matters</p>
                          <form>
                            <div className="row gy-4">
                              <div className="col-12">
                                <div className="input-group">
                                  <span className="input-group-text" id="email-newsletter-addon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                                    </svg>
                                  </span>
                                  <input type="email" className="form-control" id="email-newsletter" name="feedbackMsg" value={feedback.feedbackMsg} onChange={handleChange} aria-label="email-newsletter" aria-describedby="email-newsletter-addon" required />
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="d-grid">
                                  <button className="btn btn-primary" type="submit" onClick={handleClick}>Send</button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="py-4 py-md-5 py-xl-8 border-top border-light-subtle">
                  <div className="container-fluid overflow-hidden">
                    <div className="row gy-4 gy-md-0 align-items-md-center">
                      <div className="col-xs-12 col-md-7 order-1 order-md-0">
                        <div className="copyright text-center text-md-start">
                          copyright @ 2024-2025. All Rights Reserved.
                        </div>

                        <div className="credits text-secondary text-center text-md-start mt-2 fs-8">
                          Made with love
                        </div>
                      </div>

                      <div className="col-xs-12 col-md-5 order-0 order-md-1">
                        <div className="social-media-wrapper">
                          <ul className="list-unstyled m-0 p-0 d-flex justify-content-center justify-content-md-end">
                            <li className="me-3">
                              <Link to="https://www.instagram.com/hungry_learner.01/?next=%2F&hl=en" className="link-dark link-opacity-75-hover">
                              <FaInstagram size={25} />
                              </Link>
                            </li>

                            <li className="me-3">
                              <Link to="https://www.linkedin.com/in/ayushkumar2025/" className="link-dark link-opacity-75-hover">
                              <FaLinkedin size={25} />

                              </Link>
                            </li>

                            <li className="me-3">
                              <Link to="https://github.com/ayushkumar-mnnit/" className="link-dark link-opacity-75-hover">
                              <SiGithub size={25} />

                              </Link>
                            </li>

                          </ul>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer

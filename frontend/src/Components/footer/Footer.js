
import insta from "../../images/instagram.png";
import linkd from "../../images/icons8-linkedin-48.png";
import git from "../../images/githubimg.png";
import logo from "../../images/logo-1.png";
import mail from "../../images/icons8-gmail.gif";
import send from "../../images/sendbtn.png";
import {toast} from 'react-toastify'

import './footer.css'

import { Link } from "react-router-dom"
import { useState } from "react"


function Footer() {


    const [feed, setFeed] = useState({ feedbackMsg: "" })

    const handleChange = (e) => {
        const {name,value}  = e.target

        setFeed({ ...feed, [name]: value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await fetch('https://ondoors.onrender.com/feedback', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(feed)
            })

            if (result.ok) {
                toast.success('Feedback sent')
                setFeed({feedbackMsg:""})
            } else {
                toast.error('some error occured')
            }

        } catch (error) {
            console.log(error);
        }

    }


    return (
        <>
            <footer className="footer-section">
                <div className="container">
                    <div className="footer-cta pt-5 pb-5">
                        <div className="row">
                            <div className="col-xl-4 col-md-4 mb-30">
                                <div className="single-cta">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <div className="cta-text">
                                        <h4>Find us</h4>
                                        <span>Tandon Hostel,NIT Allahabad, Prayagraj, U.P. (India)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-4 mb-30">
                                <div className="single-cta">
                                    <i className="fas fa-phone"></i>
                                    <div className="cta-text">
                                        <h4>Call us</h4>
                                        <span>+91 8299xxxxxx</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-4 mb-30">
                                <div className="single-cta">
                                    <i className="far fa-envelope-open"></i>
                                    <div className="cta-text">
                                        <h4>Mail us</h4>

                                    <form action="mailto:ayushkumar5167543@gmail.com" method="post">
                                        <button><img src={mail} alt="mail" /></button>
                                    </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-content pt-5 pb-5">
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 mb-50">
                                <div className="footer-widget">
                                    <div className="footer-logo">
                                        <a href="/"><img src={logo} width={600} alt="/" /></a>
                                    </div>
                                    <div className="footer-text">
                                        <p>Healing the world with doorstep services</p>
                                    </div>
                                    <div className="footer-social-icon">
                                        <span>Follow us</span>
                                        <a href="https://www.instagram.com/hungry_learner.01/"><img src={insta} width={34} alt="/" /></a>

                                        <a href="https://www.linkedin.com/in/ayushkumar2025/"><img src={linkd} width={40} alt="/" /></a>
                                        <a href="https://github.com/ayushkumar-mnnit/"><img src={git} width={42} alt="/" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                                <div className="footer-widget">
                                    <div className="footer-widget-heading">
                                        <h3>Useful Links</h3>
                                    </div>
                                    <ul>
                                        <li><a href="/">Home</a></li>
                                        <li><a href="#section1">Services</a></li>
                                        <li><Link to="/about">About us</Link></li>
                                        <li><Link to="/contact">Contact</Link></li>


                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                                <div className="footer-widget">
                                    <div className="footer-widget-heading">
                                        <h3>Feedback</h3>
                                    </div>
                                    <div className="footer-text mb-25">
                                        <p>Don't miss to give your valuable feedback.</p>
                                    </div>

                                    <div className="subscribe-form">
                                        <form onSubmit={handleSubmit}>
                                            <input type="text" placeholder="write your feedback here" onChange={handleChange} name="feedbackMsg" value={feed.feedbackMsg} />
                                            <button><img src={send} width={35} alt="btn" /></button>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                                <div className="copyright-text">
                                    <p>Copyright &copy; 2024 OndoorS | All Rights Reserved</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}


export default Footer;

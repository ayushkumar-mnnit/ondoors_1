import React from 'react'
import './abt.css'
import { useAuth } from '../../jwt_Store/jwtStorage'
import abt from '../../images/abt_img.png'
import { Link } from 'react-router-dom'
import { HiOutlineEmojiHappy } from "react-icons/hi";
import menu1 from '../../images/menu1.png'
import reg1 from '../../images/reg1.png'
import reg2 from '../../images/reg2.png'
import login from '../../images/login.png'
import updmenu from '../../images/updmenu.png'
import serv2 from '../../images/serv2.png'
import selsp1 from '../../images/selsp1.png'
import selsp2 from '../../images/selsp2.png'
import finl from '../../images/finl.png'


export const About = () => {

  const {user}=useAuth()

  return (
    <>

<Link to='/'>
  <button className='cnt_h' style={{ textDecoration: 'none' }}>Back to Home
  </button>
</Link>



<section className="py-3 py-md-5 py-xl-8">
  <div className="container">
  
    <div className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
      <div className="col-12 col-lg-6 col-xl-5">
        <img className="img-fluid rounded" loading="lazy" src={abt}  alt=""/>
      </div>
      <div className="col-12 col-lg-6 col-xl-7">
        <div className="row justify-content-xl-center">
          <div className="col-12 col-xl-11">
            <span className='curUser'>Hey! {user?user.name:'User'}, good to see you here <HiOutlineEmojiHappy id='smile' />
</span>
            <p className="tex1">"Welcome to our innovative web application, where convenience meets reliability! Our platform simplifies your life by effortlessly connecting you with a diverse range of local services right at your fingertips. From electrical maintenance to household chores, carpentry, personalized education, and beyond, we've got you covered. Say goodbye to the frustration of searching for the right service provider—we bring the expertise directly to your doorstep. Join us in revolutionizing the way you access essential services!"

</p>
            <p className="tex2">Meet <Link to='https://www.linkedin.com/in/ayushkumar2025/'><button className='dev'>Ayush Kumar</button></Link>  , the ingenious mind behind this groundbreaking web application. A dynamic engineering undergrad from the prestigious <Link to='http://www.mnnit.ac.in/'><button className='dev'>NIT Allahabad</button></Link>, Ayush specializes in Electronics and Communication Engineering. Fueled by a relentless passion for innovation, Ayush embarked on a mission to redefine service accessibility. With his keen eye for detail and unwavering dedication, he has crafted a seamless platform that brings essential services to your fingertips.</p>
            <div className="row gy-4 gy-md-0 gx-xxl-5X">
              <div className="col-12 col-md-6">
                <div className="d-flex">
                  <div className="me-4 text-primary">
                    
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


    </>
  )
}

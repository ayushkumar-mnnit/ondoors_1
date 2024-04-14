
import React from 'react'
import './cards.css'



export const Cards=()=>{
    return (
        <>
            
<section id="advertisers" className="advertisers-service-sec pt-5 pb-5">
  <div className="container">
    <div className="row">
      <div className="section-header text-center" >
        <h2 className="fw-bold fs-1">
          Our
          <span className="b-class-secondary"> Services</span>
        </h2>
        <p className="sec-icon"><i className="fa-solid fa-gear"></i></p>
      </div>
    </div>
    <div className="row mt-5 mt-md-4 row-cols-1 row-cols-sm-1 row-cols-md-3 justify-content-center">
      <div className="col">
        <div className="service-card">
          
          <h3>Home Services</h3>
          <p>
           Regular cleaning, cooking, gardening, looking after young ones and other household chores.
          </p>
        </div>
      </div>
      <div className="col">
        <div className="service-card">
         
          <h3>General Maintenance</h3>
          <p>
            Electrical repairs ( installations, wiring, lighting fixtures, and circuitry.), Plumbing service, Carpentary, Painting & white-washing Services and other home renovation works.
          </p>
        </div>
      </div>
      <div className="col">
        <div className="service-card">
          
          <h3>Appliance Maintenance</h3>
          <p>
          servicing of home appliances such as refrigerators, washing machines, dishwashers, and ovens.
          Heating, ventilation, and air conditioning repairs, installations, maintenance, and duct cleaning.
          </p>
        </div>
      </div>
      <div className="col">
        <div className="service-card">
          
          <h3>Academic Support</h3>
          <p>
          For students and parents seeking for private tutors to provide personalized instruction and assistance in various subjects
          </p>
        </div>
      </div>
      <div className="col">
        <div className="service-card">
         
          <h3>Grocery</h3>
          <p>
            Fresh grocery accessibility via local vendors and grocers of your locality
          </p>
        </div>
      </div>
      <div className="col">
        <div className="service-card">
          
          <h3>Health Care</h3>
          <p>
            Consult trusted medical practitioners specially in case of emergency situations like during night, when immediate visit to a hospital is not possible.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>



        </>
    )
}




import React from 'react'

const Item = ({each}) => {


    return (
      
    <div className="col-md-4">
        <div className="product-item">
            <img src="" alt="" />
            <div className="">
                <p className="fw-bold h4" style={{ color: "#B33030"}}>{each.name}</p>
                <p className=""><span className="fw-bold">Price:</span> {each.price}</p>
                <p className=""><span className='fw-bold'>Qty:</span> {each.quantity}</p>
                <p className=""><span className="fw-bold">Category:</span> {each.category}</p>
            </div>
        </div>        
    </div>
        
  )
}

export default Item
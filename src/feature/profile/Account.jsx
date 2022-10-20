import React from 'react'
import {  FaPen } from "react-icons/fa"
import { Link } from "react-router-dom"

const Account = ({ each }) => {

    return (

        <div className="allAccounts p-4 mb-4 col-md-6">
            <h5 className="text-primary h5 display-6">Account</h5>
            <h3 className="accountNumber fw-bold">{each.username}</h3>
            <p className="fw-bold price">{each.email}</p>
            <p className="fw-bold price">{each.phone}</p>

            <div className="d-sm-flex justify-content-center align-items-center">
                <Link to={`/update/${each._id}`}>
                    <button className="btn btn-primary me-2 mb-2 mb-sm-0 form-button">
                        <FaPen /> Update
                    </button>
                </Link>
            </div>

        </div>
    )
}

export default Account
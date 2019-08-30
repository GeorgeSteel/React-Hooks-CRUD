import React from 'react'

export default function Error({ msg }) {
    return (
        <div className="alert alert-danger p3 my-5 text-center text-uppercase">
            { msg }
        </div>
    )
}

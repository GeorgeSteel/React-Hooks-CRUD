import React from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import Swal from 'sweetalert2';

export default function ListProduct({ product: { dishName, dishPrice, category, id }, setReload }) {

    const deleteProduct = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
            if (result.value) {
                const url = `http://localhost:4000/restaurant/${id}`;

                try {                    
                    const resp = await axios.delete(url);

                    if (resp.status === 200) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        setReload(true);
                    }
                } catch (error) {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    });
                }
            }
          })
    }

    return (
        <li data-category={ category } className="list-group-item d-flex justify-content-between align-items-center">
            <p>
                { dishName }
                <span className="font-weight-bold"> ${ dishPrice }</span>
            </p>
            <div>
                <Link className="btn btn-success mr-2" to={ `/products/update/${ id }` }>Update</Link>
                <button
                    className="btn btn-danger"
                    onClick={ () => deleteProduct(id) }
                >Delete</button>
            </div>
        </li>
    )
}

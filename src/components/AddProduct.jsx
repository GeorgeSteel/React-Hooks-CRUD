import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import axios from 'axios';
import Swal from 'sweetalert2';

import Error from './Error';

function AddProduct({ history, setReload }) {

    const [ dishName, setDishName ] = useState('');
    const [ dishPrice, setDishPrice ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ error, setError ] = useState(false);

    const readRadioValue = ({ target: { value } }) => {
        setCategory(value)
    }

    const AddProduct = async e => {
        e.preventDefault();
        if (dishName === '' || dishPrice === '' || category === '' ) {
            setError(true);
            return;
        } 
        
        setError(false);

        try {
            const result = await axios.post('http://localhost:4000/restaurant', {
                dishName,
                dishPrice,
                category
            });
            if (result.status === 201) {
                Swal.fire(
                    'Product Added!',
                    'A new product has been created!',
                    'success'
                );
            }
            setReload(true);
            history.push('/products');
        } catch (error) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            });
        }
    }

    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Add New Product</h1>

            {error ? <Error msg="All fields are required"/>  : null }

            <form
                className="mt-5"
                onSubmit={ AddProduct }
            >
                <div className="form-group">
                    <label>Dish Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="name" 
                        placeholder="Dish Name"
                        onChange={ e => setDishName(e.target.value) }
                    />
                </div>

                <div className="form-group">
                    <label>Dish Price</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="price"
                        placeholder="Dish Price"
                        onChange={ e => setDishPrice(e.target.value) }
                    />
                </div>

                <legend className="text-center">Category:</legend>
                <div className="text-center">
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="category"
                        value="dessert"
                        onChange={ readRadioValue }
                    />
                    <label className="form-check-label">
                        Dessert
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="category"
                        value="drinks"
                        onChange={ readRadioValue }
                    />
                    <label className="form-check-label">
                        Drinks
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="category"
                        value="meat"
                        onChange={ readRadioValue }
                    />
                    <label className="form-check-label">
                        Meat
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="category"
                        value="salad"
                        onChange={ readRadioValue }
                    />
                    <label className="form-check-label">
                        Salad
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Add Product" />
            </form>
        </div>
    )
}

export default withRouter(AddProduct);
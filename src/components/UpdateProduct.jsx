import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';

import axios from 'axios';
import Swal from 'sweetalert2';

import Error from './Error';

function UpdateProduct({ product: { dishName, dishPrice, category, id }, history, setReload }) {

    const priceDishRef = useRef('');
    const nameDishRef = useRef('');

    const [ categories, setCategories ] = useState('');
    const [ error, setError ] = useState(false);


    const updateProduct = async e => {
        e.preventDefault();

        if (priceDishRef.current.value === '' || nameDishRef.current.value === '') {
            setError(true);
            return;
        } 

        setError(false);

        let categoryDish = (categories === '') ? category : categories;

        const updateDish = {
            dishPrice: priceDishRef.current.value,
            dishName: nameDishRef.current.value,
            category: categoryDish
        }

        const url = `http://localhost:4000/restaurant/${id}`;

        try {
            const result = await axios.put(url, updateDish);

            if (result.status === 200) {
                Swal.fire(
                    'Product Updated!',
                    'A new product has been changed!',
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

    const readRadioValue = ({ target: { value } }) => {
        setCategories(value)
    }

    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Update Product</h1>

            {error ? <Error msg="All fields are required"/>  : null }

            <form
                className="mt-5"
                onSubmit={ updateProduct }
            >
                <div className="form-group">
                    <label>Dish Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="name" 
                        placeholder="Dish Name"
                        ref={ nameDishRef }
                        defaultValue={ dishName }
                    />
                </div>

                <div className="form-group">
                    <label>Dish Price</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="price"
                        placeholder="Dish Price"
                        ref={ priceDishRef }
                        defaultValue={ dishPrice }
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
                        defaultChecked={ (category === 'dessert') }
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
                        defaultChecked={ (category === 'drinks') }
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
                        defaultChecked={ (category === 'meat') }
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
                        defaultChecked={ (category === 'salad') }
                    />
                    <label className="form-check-label">
                        Salad
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Update Product" />
            </form>
        </div>
    )
}

export default withRouter(UpdateProduct);
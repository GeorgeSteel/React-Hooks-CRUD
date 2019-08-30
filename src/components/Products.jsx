import React, { Fragment } from 'react';
import ListProduct from './ListProduct';

export default function Products({ products, setReload }) {
    return (
        <Fragment>
            <h1 className="text-center">Products</h1>
            <ul className="list-group mt-5">
                { products.map(product => (
                    <ListProduct
                        key={ product.id }
                        product={ product }
                        setReload={ setReload }
                    />
                )) }
            </ul>
        </Fragment>
    )
}

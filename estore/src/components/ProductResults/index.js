import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchProductsStart } from './../../redux/Products/products.actions';
import Product from './Product';
import FormSelect from './../forms/FormSelect';
import LoadMore from './../LoadMore';
import * as FaIcons from 'react-icons/fa';
import './styles.scss';

const mapState = ({ productsData }) => ({
    products: productsData.products
});

const ProductResults = ({ }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { filterType } = useParams();
    const { products } = useSelector(mapState);
    const [searchTerm, setSearchTerm] = useState("");
    // console.log(searchTerm);

    const { data, queryDoc, isLastPage } = products;

    useEffect(() => {
        dispatch(
            fetchProductsStart({ filterType })
        )
    }, [filterType]);

    const handleFilter = (e) => {
        const nextFilter = e.target.value;
        history.push(`/search/${nextFilter}`);
    };
    // console.log("Hello", products)
    if (!Array.isArray(data)) return null;
    if (data.length < 1) {
        return (
            <div className="products">
                <p>
                    No search results.
                </p>
            </div>
        );
    }
    // console.log(products.productName);

    const configFilters = {
        defaultValue: filterType,
        options: [{
            name: 'Show all',
            value: ''
        }, {
            name: 'Sunglasses',
            value: 'sunglasses'
        }, {
            name: 'Round Sunglasses',
            value: 'roundSunglasess'
        }],
        handleChange: handleFilter
    };

    const handleLoadMore = () => {
        dispatch(
            fetchProductsStart({
                filterType,
                startAfterDoc: queryDoc,
                persistProducts: data
            })
        )
    };

    const configLoadMore = {
        onLoadMoreEvt: handleLoadMore,
    };

    return (
        <div className="products">

            <div className="searchBoxAndH1">
                <h1>
                    Browse Products
                </h1>
                <div className="searchBar">
                    <FaIcons.FaSearch className="searchIcon" />
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => { setSearchTerm(e.target.value) }}
                    />
                </div>

            </div>

            <FormSelect {...configFilters} />

            <div className="productResults">
                {data.filter((val) => {
                    if (searchTerm == "") {
                        return val;
                    } else if (val.productName.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val;
                    }
                }).map((product, pos) => {
                    const { productThumbnail, productName, productPrice } = product;
                    if (!productThumbnail || !productName ||
                        typeof productPrice === 'undefined') return null;

                    const configProduct = {
                        ...product
                    };

                    return (
                        <Product key={pos} {...configProduct} />
                    );
                })}
            </div>

            {!isLastPage && (
                <LoadMore {...configLoadMore} />
            )}

        </div>
    );
};

export default ProductResults;
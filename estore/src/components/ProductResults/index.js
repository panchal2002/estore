import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchProductsStart } from './../../redux/Products/products.actions';
import { selectWishlistItems } from '../../redux/Wishlist/wishlist.selectors';
import MultiRangeSlider from '../MultiRangeSlider/MultiRangeSlider.js';
import Product from './Product';
import { createStructuredSelector } from 'reselect';
import FormSelect from './../forms/FormSelect';
import LoadMore from './../LoadMore';
import * as FaIcons from 'react-icons/fa';
import './styles.scss';

const mapState = ({ productsData }) => ({
    products: productsData.products
});

const mapWishlistState = createStructuredSelector({
    wishlistItems: selectWishlistItems
});

const ProductResults = ({ }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { filterType } = useParams();
    const { products } = useSelector(mapState);
    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(5000);
    const [sortCategory, setSortCategory] = useState("");
    const { wishlistItems } = useSelector(mapWishlistState);

    // console.log(searchTerm);

    const { data, queryDoc, isLastPage } = products;

    useEffect(() => {
        dispatch(
            fetchProductsStart({ filterType })
        )
    }, [filterType, wishlistItems.length]);

    const handleFilter = (e) => {
        const nextFilter = e.target.value;
        history.push(`/search/${nextFilter}`);
    };

    const handleSort = (e) => {
        setSortCategory(e.target.value);
    }

    useEffect(() => {
        dispatch(
            fetchProductsStart({ filterType })
        )
    }, [sortCategory == 'default'])

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
            name: 'Rounded Sunglasses',
            value: 'roundSunglasess'
        }],
        handleChange: handleFilter
    };

    const configSort = {
        default: 'Default',
        options: [{
            name: 'Default',
            value: 'default'
        }, {
            name: 'Price Low - High',
            value: 'priceLowToHigh'
        }, {
            name: 'Price High - Low',
            value: 'priceHighToLow'
        }],
        handleChange: handleSort
    }

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

    // console.log(sortCategory)
    if (sortCategory == 'priceLowToHigh') {
        data.sort((a, b) => {
            return a.productPrice - b.productPrice;
        })
    } else if (sortCategory == 'priceHighToLow') {
        data.sort((a, b) => {
            return b.productPrice - a.productPrice;
        })
    }


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
            <div className="filters">
                <button class="filterBtn">Filters {<FaIcons.FaChevronDown />}</button>
                <div class="filterBtn-content">
                    <p>Search By Category :</p>
                    <FormSelect {...configFilters} />
                    <p>Sort By : </p>
                    <FormSelect {...configSort} />
                    <p>Price Range :</p>
                    <MultiRangeSlider
                        min={0}
                        max={5000}
                        onChange={({ min, max }) => {
                            setMaxPrice(max);
                            setMinPrice(min);
                        }}
                    />
                </div>
            </div>


            <div className="productResults">
                {data.filter((val) => {
                    if (searchTerm == "") {
                        if (val.productPrice >= minPrice && val.productPrice <= maxPrice)
                            return val;
                    } else if (val.productName.toLowerCase().includes(searchTerm.toLowerCase())) {
                        if (val.productPrice >= minPrice && val.productPrice <= maxPrice)
                            return val;
                    }
                }).map((product, pos) => {
                    const { productThumbnail, productName, productPrice } = product;
                    if (!productThumbnail || !productName ||
                        typeof productPrice === 'undefined') return null;


                    const configProduct = {
                        ...product,
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
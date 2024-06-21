import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import endPoints from '../../common/configApi';
import toast from 'react-hot-toast';
import SearchVerticalProducts from '../components/SearchVerticalProducts';


const SearchPage = () => {

    const query = useLocation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        const response = await axios.post(endPoints?.searchProducts.url + query.search);
        const responseData = response.data;
        setLoading(false);

        setData(responseData?.data);
    };

    useEffect(() => {
        fetchProducts();
    }, [query]);

    return (
        <div className='mx-auto p-4'>

            {
                loading && (
                    <p className='text-center text-lg'>Loading...</p>
                )
            }

            <p>Search results : {data?.length}</p>
            {
                data?.length === 0 && !loading && (
                    <p className='text-center p-4 text-lg font-semibold'>No Products Found</p>
                )
            }

            {
                data?.length !== 0 && !loading && (
                    <SearchVerticalProducts data={data} loading={loading} />
                )
            }

        </div>
    )
}

export default SearchPage;
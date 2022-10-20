import { useState } from 'react';
import Item from './Item';
import Button from '../../components/Button';
import { FaArrowRight, FaArrowLeft, FaSearch } from "react-icons/fa";
import useDebounce from '../../hooks/useDebounce';
import { useGetProductsQuery } from "./productApiSlice";
import { useGetProductQuery } from './productApiSlice';
import { useFilterProductMutation } from './productApiSlice';
import apiData from "../../constants/apiData";

const Product = () => {


    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const [filterBy, setFilterBy] = useState("");


    const [filteredArr, setFilteredArr] = useState([]);


    const debouncedSearchQuery = useDebounce(search, 500);

    const [filterFunc] = useFilterProductMutation();

    const queryRequest = { page }

    const productSearch = { name: debouncedSearchQuery }

    const {
        data: products,
        isSuccess,
        isError,
        error,
        isLoading
    } = useGetProductsQuery(queryRequest)


    const { data: productSearchResult, isSuccess: searchedForProduct } = useGetProductQuery(productSearch, { skip: debouncedSearchQuery === "" });




    const handlePrevClick = async () => {
        try {
            setPage(prev => parseInt(prev - 1));
        } catch (e) {
            console.log(e.message);
        }
    }

    const handleNextClick = async () => {
        try {
            setPage(prev => parseInt(prev + 1));
        } catch (e) {
            console.log(e.message);
        }
    }

    const handleSubmit = (e) => e.preventDefault();

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }



    return (
        <section className="section">
            <div className="container">

                <div className="row">
                    <div className="col-12 intro text-center">
                        <h3 className="mt-4">Amazon</h3>
                        <p className="lead">Every product in the world on your screen</p>
                    </div>
                </div>

                <div className="row">
                    <form className="col-lg-6 mx-auto" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Search"
                                className="form-control"
                                value={search}
                                onChange={handleSearch}
                            />
                            <button
                                className="btn btn-brand"
                                type="button"
                                id="button" >
                                <FaSearch />
                            </button>
                        </div>
                    </form>
                </div>


                <div className="row">
                    <div className="col-12 intro">
                        <div className="d-flex justify-content-between align-items-center">
                            <button
                                disabled={page <= 1 ? true : false}
                                onClick={handlePrevClick}
                                className="btn btn-danger form-button"
                            >
                                <FaArrowLeft /> Prev
                            </button>

                            <p data-testid="pageNumber" className="font-weight">Page: {page}</p>

                            <button disabled={page >= 3 ? true : false} onClick={handleNextClick} className="btn btn-primary form-button">Next <FaArrowRight /></button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 d-flex flex-wrap align-items-center justify-content-center mt-3 intro">
                        <button className="filter_button" onClick={() => setFilterBy("")}>All</button>
                        {apiData.map((each, i) => (
                            <Button key={i} each={each} setFilterBy={setFilterBy} filterFunc={filterFunc} setFilteredArr={setFilteredArr} />
                        ))}
                    </div>
                </div>

                <div className="row d-flex justify-content-center">
                    <div className="col-12">
                        {isLoading && <div className="mexican-wave text-center my-5"></div>}

                        {isError && (<p className="text-center text-danger">Oh no, there was an error {JSON.stringify(error.error)} </p>)}


                        {
                            isSuccess && (
                                <div className="row">
                                    {!searchedForProduct && !filterBy && products.map((each, i) => (
                                        <Item key={i} each={each} />
                                    ))}

                                    {searchedForProduct && productSearchResult.map((each, i) => (
                                        <Item key={i} each={each} />
                                    ))}

                                    {filterBy && filteredArr.map((each, i) =>
                                        <Item key={i} each={each} />
                                    )}
                                </div>
                            )
                        }

                        {searchedForProduct && productSearchResult.length === 0 && (<p data-testid="coinError" className="text-center font-weight text-danger">Oh no, product not found</p>)}

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Product
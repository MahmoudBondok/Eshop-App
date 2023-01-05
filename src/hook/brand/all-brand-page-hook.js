import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBrand, getAllBrandPage } from '../../redux/actions/brandAction';

const AllBrandHook = () => {
    const dispatch = useDispatch();
    // When First Load
    useEffect(() => {
        dispatch(getAllBrand(4));
    }, [])
    // To Get State From Redux
    const brand = useSelector(state => state.allBrand.brand)
    const loading = useSelector(state => state.allBrand.loading)
    // To Get Page Count
    let pageCount = 0;
    if (brand.paginationResult) {
        pageCount = brand.paginationResult.numberOfPages
    }
    // When Press Pagination
    const getPage = (page) => {
        dispatch(getAllBrandPage(page));
    }
    return [brand, loading, pageCount, getPage]
};
export default AllBrandHook;
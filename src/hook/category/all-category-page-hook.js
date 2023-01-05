import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategory, getAllCategoryPage } from '../../redux/actions/categoryAction';

const AllCategoryHook = () => {
    const dispatch = useDispatch();
    // When First Load
    useEffect(() => {
        const get = async () => {
            await dispatch(getAllCategory(8));
        }
        get();
    }, [])
    // To Get State From Redux
    const category = useSelector(state => state.allCategory.category)
    const loading = useSelector(state => state.allCategory.loading)
    // To Get Page Count
    let pageCount = 0;
    try {
        if (category.paginationResult)
            pageCount = category.paginationResult.numberOfPages
    } catch (e) { }
    // When Press Pagination
    const getPage = (page) => {
        dispatch(getAllCategoryPage(page));
        console.log(page)
    }
    return [category, loading, pageCount, getPage]
};
export default AllCategoryHook;
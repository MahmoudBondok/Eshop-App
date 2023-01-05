import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategory } from '../../redux/actions/categoryAction';

const HomeCategoryHook = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCategory());
    }, [])
    // Get Last Catgeory State From Redux
    const category = useSelector(state => state.allCategory.category)
    //Get Last Loading State From Redux
    const loading = useSelector(state => state.allCategory.loading)
    const colors = ["#FFD3E8", "#F4DBA5", "#55CFDF", "#FF6262", "#0034FF", "#FFD3E8"]
    return [category, loading, colors];
};
export default HomeCategoryHook;
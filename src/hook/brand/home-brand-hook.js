import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBrand } from '../../redux/actions/brandAction';

const HomeBrandHook = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllBrand());
    }, [])
    // Get Last Brand State From Redux
    const brand = useSelector(state => state.allBrand.brand)
    // Get Last Loading State From Redux
    const loading = useSelector(state => state.allBrand.loading)
    return [brand, loading];
};
export default HomeBrandHook;
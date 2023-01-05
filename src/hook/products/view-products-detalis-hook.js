import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getOneProduct, getProductLike } from '../../redux/actions/productsAction';
import mobile from '../../images/mobile.png';
import { getOneCategory } from '../../redux/actions/categoryAction';
import { getOneBrand } from '../../redux/actions/brandAction';

const ViewProductsDetalisHook = (prodID) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOneProduct(prodID))
    }, [])

    const oneProducts = useSelector((state) => state.allproducts.oneProduct)
    const oneCategory = useSelector((state) => state.allCategory.oneCategory)
    const oneBrand = useSelector((state) => state.allBrand.oneBrand)
    const productLike = useSelector((state) => state.allproducts.productLike)

    // To Show Products Item
    let item = [];
    if (oneProducts.data) {
        item = oneProducts.data;
    } else {
        item = []
    }
    useEffect(() => {
        if (item.category)
            dispatch(getOneCategory(item.category))
        if (item.brand)
            dispatch(getOneBrand(item.brand))
        if (item.category)
            dispatch(getProductLike(item.category))
    }, [item])

    // To View Images Gallery
    let images = []
    if (item.images)
        images = item.images.map((img) => { return { original: img } })
    else {
        images = [{ original: `${mobile}` }]
    }

    // To Show Category Item
    let cat = [];
    if (oneCategory.data) {
        cat = oneCategory.data;
    } else {
        cat = []
    }

    // To Show Brand Item
    let brand = [];
    if (oneBrand.data) {
        brand = oneBrand.data;
    } else {
        brand = []
    }
    let prod = []
    if (productLike) {
        prod = productLike.data;
    } else {
        prod = []
    }
    return [item, images, cat, brand, prod];
}
export default ViewProductsDetalisHook;
import { useState, useEffect } from 'react';
import ViewSearchProductsHook from './../products/view-search-products-hook';

const NavbarSearchHook = () => {
    const [, , , getProduct] = ViewSearchProductsHook();
    const [searchWord, setSearchWord] = useState('')
    // When User Type Search Word
    const OnChangeSearch = (e) => {
        localStorage.setItem("searchWord", e.target.value)
        setSearchWord(e.target.value)
        const path = window.location.pathname;
        if (path !== "/products") {
            window.location.href = "/products"
        }
    }
    useEffect(() => {
        setTimeout(() => {
            getProduct();
        }, 1000);
    }, [searchWord])
    return [OnChangeSearch, searchWord]
}
export default NavbarSearchHook;
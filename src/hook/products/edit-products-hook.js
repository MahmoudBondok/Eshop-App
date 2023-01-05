import { useState, useEffect } from 'react';
import { getOneCategory } from '../../redux/actions/subcategoryAction';
import { getOneProduct } from '../../redux/actions/productsAction';
import notify from './../../hook/useNotifaction';
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategory } from '../../redux/actions/categoryAction'
import { getAllBrand } from './../../redux/actions/brandAction';

const AdminEditProductsHook = (id) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const run = async () => {
            await dispatch(getOneProduct(id))
            await dispatch(getAllCategory());
            await dispatch(getAllBrand());
        }
        run();
    }, [])

    // Get One Product Details
    const item = useSelector((state) => state.allproducts.oneProduct)
    // Get Last Catgeory State From Redux
    const category = useSelector(state => state.allCategory.category)
    // Get Last Brand State From Redux
    const brand = useSelector(state => state.allBrand.brand)
    // Get Last Subcat State From Redux
    const subCat = useSelector(state => state.subCategory.subcategory)
    const onSelect = (selectedList) => {
        setSeletedSubID(selectedList)
    }
    const onRemove = (selectedList) => {
        setSeletedSubID(selectedList)
    }
    // Values State
    const [images, setImages] = useState([]);
    const [options, setOptions] = useState([]);
    const [prodName, setProdName] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [priceBefore, setPriceBefore] = useState('السعر قبل الخصم');
    const [priceAftr, setPriceAftr] = useState('السعر بعد الخصم');
    const [qty, setQty] = useState('الكمية المتاحة');
    const [CatID, setCatID] = useState('0');
    const [BrandID, SetBrandID] = useState('0');
    const [subCatID, setSubCatID] = useState([]);
    const [seletedSubID, setSeletedSubID] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (item.data) {
            console.log(item.data.images)
            setImages(item.data.images)
            setProdName(item.data.title)
            setProdDescription(item.data.description)
            setPriceBefore(item.data.price)
            setQty(item.data.quantity)
            setCatID(item.data.category)
            SetBrandID(item.data.brand)
            setColors(item.data.availableColors)
        }
    }, [item])
    // To Change Name State
    const onChangeProdName = (event) => {
        event.persist();
        setProdName(event.target.value)
    }
    // To Change Description State
    const onChangeDesName = (event) => {
        event.persist();
        setProdDescription(event.target.value)
    }
    // To Change PriceBefor State
    const onChangePriceBefor = (event) => {
        event.persist();
        setPriceBefore(event.target.value)
    }
    // To Change PriceAfter State
    const onChangePriceAfter = (event) => {
        event.persist();
        setPriceAftr(event.target.value)
    }
    // To Change Qty State
    const onChangeQty = (event) => {
        event.persist();
        setQty(event.target.value)
    }
    const onChangeColor = (event) => {
        event.persist();
        setShowColor(!showColor)
    }
    // To Show Hide Color Picker
    const [showColor, setShowColor] = useState(false);
    // To Store All Pick Color
    const [colors, setColors] = useState([]);
    // When Choose New Color
    const handelChangeComplete = (color) => {
        setColors([...colors, color.hex])
        setShowColor(!showColor)
    }
    const removeColor = (color) => {
        const newColor = colors.filter((e) => e !== color)
        setColors(newColor)
    }
    // When Select Category Store Id
    const onSeletCategory = async (e) => {
        setCatID(e.target.value)
    }
    useEffect(() => {
        if (CatID != 0) {
            const run = async () => {
                await dispatch(getOneCategory(CatID))
            }
            run();
        }
    }, [CatID])
    useEffect(() => {
        if (subCat) {
            setOptions(subCat.data)
        }
    }, [subCat])
    // When Select Brand Store Id
    const onSeletBrand = (e) => {
        SetBrandID(e.target.value)
    }
    // To Convert Base 64 To File
    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }
    // Convert URL To File
    const convertURLtoFile = async (url) => {
        const response = await fetch(url, { mode: "cors" });
        const data = await response.blob();
        const ext = url.split(".").pop();
        const filename = url.split("/").pop();
        const metadata = { type: `image/${ext}` };
        return new File([data], Math.random(), metadata);
    };
    // To Save Data 
    const handelSubmit = async (e) => {
        e.preventDefault();
        if (CatID === 0 || prodName === "" || prodDescription === "" || images.length <= 0 || priceBefore <= 0) {
            notify("من فضلك اكمل البيانات", "warn")
            return;
        }
        console.log(images[0])
        let imgCover;
        if (images[0].length <= 1000) {
            convertURLtoFile(images[0]).then(val => imgCover = val)
        } else {
            imgCover = dataURLtoFile(images[0], Math.random() + ".png")
        }
        let itemImages = [];
        // Convert Array Of Base 64 Image To File 
        Array.from(Array(Object.keys(images).length).keys()).map(
            (item, index) => {
                if (images[index].length <= 1000) {
                    convertURLtoFile(images[index]).then(val => itemImages.push(val))
                }
                else {
                    itemImages.push(dataURLtoFile(images[index], Math.random() + ".png"))
                }
            })
        const formData = new FormData();
        formData.append("title", prodName);
        formData.append("description", prodDescription);
        formData.append("quantity", qty);
        formData.append("price", priceBefore);
        formData.append("category", CatID);
        formData.append("brand", BrandID);
        setTimeout(() => {
            formData.append("imageCover", imgCover);
            itemImages.map((item) => formData.append("images", item))
        }, 1000);
        setTimeout(() => {
            console.log(imgCover)
            console.log(itemImages)
        }, 1000);
        colors.map((color) => formData.append("availableColors", color))
        seletedSubID.map((item) => formData.append("subcategory", item._id))
        setTimeout(async () => {
            // setLoading(true)
            //   await dispatch(updateProducts(id, formData))
            //  setLoading(false)
        }, 1000);
    }
    // Get Create Meesage
    const product = useSelector(state => state.allproducts.updateProducts)
    useEffect(() => {
        if (loading === false) {
            setColors([])
            setImages([])
            setProdName('')
            setProdDescription('')
            setPriceBefore('السعر قبل الخصم')
            setPriceAftr('السعر بعد الخصم')
            setQty('الكمية المتاحة')
            SetBrandID(0)
            setSeletedSubID([])
            setTimeout(() => setLoading(true), 1500)
            if (product) {
                if (product.status === 200) {
                    notify("تم التعديل بنجاح", "success")
                } else {
                    notify("هناك مشكله", "error")
                }
            }
        }
    }, [loading])
    return [CatID, BrandID, onChangeDesName, onChangeQty,
        onChangeColor, onChangePriceAfter, onChangePriceBefor,
        onChangeProdName, showColor, category, brand, priceAftr,
        images, setImages, onSelect, onRemove, options, handelChangeComplete,
        removeColor, onSeletCategory, handelSubmit, onSeletBrand,
        colors, priceBefore, qty, prodDescription, prodName]
}
export default AdminEditProductsHook;
import React from 'react';
import add from '../../images/add.png';
import { Row, Col } from 'react-bootstrap';
import { CompactPicker } from 'react-color';
import { ToastContainer } from 'react-toastify';
import Multiselect from 'multiselect-react-dropdown';
import MultiImageInput from 'react-multiple-image-input';
import AdminAddProductsHook from './../../hook/products/add-products-hook';

const AdminAddProducts = () => {
    const [onChangeDesName, onChangeQty, onChangeColor,
        onChangePriceAfter, onChangePriceBefor, onChangeProdName,
        showColor, category, brand, priceAftr, images, setImages,
        onSelect, onRemove, options, handelChangeComplete, removeColor,
        onSeletCategory, handelSubmit, onSeletBrand, colors, priceBefore,
        qty, prodDescription, prodName] = AdminAddProductsHook();
    return (
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4"> اضافه منتج جديد</div>
                <Col sm="8">
                    <div className="text-form pb-2"> صور للمنتج</div>
                    <MultiImageInput
                        images={images}
                        setImages={setImages}
                        theme={"light"}
                        allowCrop={false}
                        max={4}
                    />
                    <input
                        value={prodName}
                        onChange={onChangeProdName}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="اسم المنتج"
                    />
                    <textarea
                        className="input-form-area p-2 mt-3"
                        rows="4"
                        cols="50"
                        placeholder="وصف المنتج"
                        value={prodDescription}
                        onChange={onChangeDesName}
                    />
                    <input
                        type="number"
                        className="input-form d-block mt-3 px-3"
                        placeholder="السعر قبل الخصم"
                        value={priceBefore}
                        onChange={onChangePriceBefor}
                    />
                    <input
                        type="number"
                        className="input-form d-block mt-3 px-3"
                        placeholder="السعر بعد الخصم"
                        value={priceAftr}
                        onChange={onChangePriceAfter}
                    />
                    <input
                        type="number"
                        className="input-form d-block mt-3 px-3"
                        placeholder="الكمية المتاحة"
                        value={qty}
                        onChange={onChangeQty}
                    />
                    <select
                        name="cat"
                        onChange={onSeletCategory}
                        className="select input-form-area mt-3 px-2 ">
                        <option value="0">التصنيف الرئيسي</option>
                        {
                            category.data ? (category.data.map((item, index) => {
                                return (
                                    <option key={index} value={item._id}>{item.name}</option>
                                )
                            })) : null
                        }
                    </select>
                    <Multiselect
                        className="mt-2 text-end"
                        placeholder="التصنيف الفرعي"
                        options={options}
                        onSelect={onSelect}
                        onRemove={onRemove}
                        displayValue="name"
                        style={{ color: "red" }}
                    />
                    <select
                        name="brand"
                        onChange={onSeletBrand}
                        className="select input-form-area mt-3 px-2 ">
                        <option value="0">اختر ماركة</option>
                        {
                            brand.data ? (brand.data.map((item, index) => {
                                return (
                                    <option key={index} value={item._id}>{item.name}</option>
                                )
                            })) : null
                        }
                    </select>
                    <div className="text-form mt-3 "> الالوان المتاحه للمنتج</div>
                    <div className="mt-1 d-flex">
                        {
                            colors.length >= 1 ? (
                                colors.map((color, index) => {
                                    return (
                                        <div key={index}
                                            onClick={() => removeColor(color)}
                                            className="color ms-2 border  mt-1"
                                            style={{ backgroundColor: color }}></div>
                                    )
                                })
                            ) : null
                        }
                        <img onClick={onChangeColor} src={add} alt="" width="30px" height="35px" style={{ cursor: 'pointer' }} />
                        {
                            showColor === true ? <CompactPicker onChangeComplete={handelChangeComplete} /> : null
                        }
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="d-flex justify-content-end ">
                    <button onClick={handelSubmit} className="btn-save d-inline mt-2 ">حفظ التعديلات</button>
                </Col>
            </Row>
            <ToastContainer />
        </div>
    )
}
export default AdminAddProducts;
import { useState } from "react";

import "./AddProduct.css";

import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: "",
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({
            ...productDetails,
            [e.target.name]: e.target.value,
        });
    };

    const Add_Product = async () => {
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append("product", image);

        try {
            const response = await fetch("http://localhost:4000/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            responseData = await response.json();

            if (responseData.success) {
                product.image = responseData.image_url;
                console.log(product);

                await fetch("http://localhost:4000/addproduct", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(product),
                })
                    .then((resp) => resp.json())
                    .then((data) => {
                        data.success
                            ? alert("Product Added Successfully")
                            : alert("Failed");
                    });
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return (
        <div className='add-product'>
            <div className='add-product-itemField'>
                <p>Product title</p>
                <input
                    value={productDetails.name}
                    onChange={changeHandler}
                    type='text'
                    name='name'
                    placeholder='Type here'
                />
            </div>
            <div className='add-product-price'>
                <div className='add-product-itemField'>
                    <p>Price</p>
                    <input
                        value={productDetails.old_price}
                        onChange={changeHandler}
                        type='text'
                        name='old_price'
                        placeholder='Type here'
                    />
                </div>
                <div className='add-product-itemField'>
                    <p>Offer Price</p>
                    <input
                        value={productDetails.new_price}
                        onChange={changeHandler}
                        type='text'
                        name='new_price'
                        placeholder='Type here'
                    />
                </div>
            </div>

            <div className='add-product-itemField'>
                <p>Product Category</p>
                <select
                    value={productDetails.category}
                    onChange={changeHandler}
                    name='category'
                    className='add-product-selector'
                >
                    <option value='women'>Women</option>
                    <option value='men'>Men</option>
                    <option value='kid'>Kids</option>
                </select>
            </div>

            <div className='add-product-itemField'>
                <label htmlFor='file-input'>
                    <img
                        src={image ? URL.createObjectURL(image) : upload_area}
                        className='add-product-thumbnail-img'
                        alt=''
                    />
                </label>
                <input
                    onChange={imageHandler}
                    type='file'
                    name='image'
                    id='file-input'
                    hidden
                />
            </div>
            <button onClick={Add_Product} className='add-product-button'>
                ADD
            </button>
        </div>
    );
};

export default AddProduct;

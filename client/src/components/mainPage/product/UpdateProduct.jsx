import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import './CreateProduct.css'; 

function UpdateProduct() {
    const state = useContext(GlobalState);
    const [product, setProduct] = useState({
        title: '',
        product_id: '',
        price: 0,
        description: '',
        content: '',
        category: '',
    });
    const [images, setImages] = useState(null);
    const [token] = state.token;
    const { id } = useParams(); 

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products`, {
                    headers: { Authorization: token },
                });
                setProduct(response.data);
            } catch (error) {
                alert(error.response?.data?.msg || "Something went wrong error while fetching");
            }
        };

        fetchProduct();
    }, [id, token]);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        setImages(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', product.title);
            formData.append('product_id', product.product_id);
            formData.append('price', product.price);
            formData.append('description', product.description);
            formData.append('content', product.content);
            formData.append('category', product.category);
            if (images) formData.append('images', images);

            const response = await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: token,
                },
            });

            alert("Product updated successfully");
        } catch (error) {
            alert(error.response?.data?.msg || "Something went wrong while updating");
        }
    };

    return (
        <div className="create_product">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" value={product.title} onChange={handleChangeInput} required />
                </div>

                <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" name="product_id" value={product.product_id} onChange={handleChangeInput} required />
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" value={product.price} onChange={handleChangeInput} required />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" value={product.description} onChange={handleChangeInput} required />
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea name="content" value={product.content} onChange={handleChangeInput} required />
                </div>

                <div className="row">
                    <label htmlFor="category">Category</label>
                    <input type="text" name="category" value={product.category} onChange={handleChangeInput} required />
                </div>

                <div className="row">
                    <label htmlFor="images">Image</label>
                    <input type="file" name="images" onChange={handleImageChange} />
                </div>

                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdateProduct;

import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, ToggleButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import CustomAlert from "./CustomAlert";

function AddEditProduct() {
    const productTypes = ['Books', 'Electronics', 'Food', 'Furniture', 'Toys']
    const location = useLocation();
    const navigate = useNavigate();
    const productId = location?.state?.productId;
    const newProduct = !(productId !== null && productId !== undefined && productId.length !== 0)
    const heading = newProduct ? 'Add Product' : 'Edit Product';
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [nameErrorText, setNameErrorText] = useState('');
    const [type, setType] = useState('');
    const [typeError, setTypeError] = useState(false);
    const [typeErrorText, setTypeErrorText] = useState('');
    const [price, setPrice] = useState('');
    const [priceError, setPriceError] = useState(false);
    const [priceErrorText, setPriceErrorText] = useState('');
    const [active, setActive] = useState(false);
    const [alertOptions, setAlertOptions] = useState({ enable: false, message: '', alertColor: 'success' });
    useEffect(() => {
        async function fetchUrl(url) {
            const response = await fetch(url);
            const json = await response.json();
            if (json !== null && json !== undefined && json.length !== 0) {
                setName(json.name)
                setType(json.type)
                setPrice(json.price)
                setActive(json.active)
            }
        }
        if (!newProduct) {
            fetchUrl('products/' + productId);
        }
    }, [productId, newProduct]);

    let validate = () => {
        let isValid = []
        setNameError(false)
        setTypeError(false)
        setPriceError(false)
        if (name === '' || name.length === 0) {
            setNameError(true)
            setNameErrorText('Please enter a valid product name!');
            isValid.push(false);
        }
        if (type === '' || type.length === 0) {
            setTypeError(true)
            setTypeErrorText('Please select a valid product type!');
            isValid.push(false);
        }
        if (price === '' || price.length === 0) {
            setPriceError(true)
            setPriceErrorText('Please enter a valid product price!');
            isValid.push(false);
        }
        return !isValid.some(x => x === false)
    }

    let handleSubmit = () => {
        if (!validate())
            return;

        let requestOptions = {
            method: newProduct ? 'POST' : 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id": newProduct ? '00000000-0000-0000-0000-000000000000' : productId,
                "name": name,
                "price": price,
                "type": type,
                "active": active
            })
        };
        let url = newProduct ? 'products/' : 'products/' + productId
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                if ((data.message !== null && data.message === 'success') || (data.id !== null && data.id !== undefined)) {
                    setAlertOptions({ enable: true, message: 'Product saved successfully.', alertColor: 'success', callback: handleBack })

                }
                else if (data.title !== null && data.title === "Not Found")
                    setAlertOptions({ enable: true, message: 'Product does not exist in database.', alertColor: 'error' })
            })
            .catch((error) => {
                setAlertOptions({ enable: true, message: 'Error:' + error, alertColor: 'error' })
            });
    }

    let handleBack = () => {
        navigate('/')
    }

    return (
        <div className="mx-5 px-5 my-5 py-4">
            <Box sx={{ width: '100%', border: 1, p: 2, borderColor: 'rgba(224, 224, 224, 1)' }}>
                <div className='col-12 row mt-1 mb-4 mx-4'>
                    <div className='col-5 m-0 p-0'>
                        <h5>{heading}</h5>
                    </div>
                    <div className='col-6 m-0 p-0'>
                        <button type="button" onClick={handleSubmit} className="btn btn-success align-Item mx-1">Save</button>
                        <button type="button" onClick={handleBack} className="btn btn-secondary align-Item mx-1">Back</button>
                    </div>
                </div>
                <div className='col-12 row mx-4'>
                    <div className='col-11 m-0 p-0 mb-4'>
                        <TextField
                            label="Product Name"
                            fullWidth={true}
                            error={nameError}
                            helperText={nameError ? nameErrorText : ''}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            value={name} type="text" />
                    </div>
                    <div className='col-11 m-0 p-0 mb-4'>
                        <FormControl style={{ m: 1, minWidth: "100%" }} error={typeError}>
                            <InputLabel id="product-type-select-label">Product Type</InputLabel>
                            <Select variant={'outlined'}
                                fullWidth={true}
                                labelId="product-type-select-label"
                                value={type}
                                label="Product Type"
                                id={"product-type-select"}
                                onChange={(e) => {
                                    setType(e.target.value)
                                }}>
                                <MenuItem value="">
                                    Select
                                </MenuItem>
                                {productTypes.map((i, k) => {
                                    return <MenuItem key={k} value={i}>{i}</MenuItem>
                                })}
                            </Select>
                            {typeError && <FormHelperText error={typeError}>{typeErrorText}</FormHelperText>}
                        </FormControl>
                    </div>
                    <div className='col-11 m-0 p-0 mb-4'>
                        <TextField
                            label="Price (in $)"
                            fullWidth={true}
                            error={priceError}
                            helperText={priceError ? priceErrorText : ''}
                            onChange={(e) => {
                                setPrice(e.target.value)
                            }}
                            value={price} type="number" />
                    </div>
                    <div className='col-11 m-0 p-0 pb-3'>
                        <ToggleButton
                            value='check'
                            selected={active}
                            color='primary'
                            size='medium'
                            onChange={() => {
                                setActive(!active)
                            }}>
                            {active ? 'Active' : 'Inactive'}
                        </ToggleButton>
                    </div>
                </div>
            </Box>
            <CustomAlert options={alertOptions}></CustomAlert>
        </div>
    )
}

export default AddEditProduct;
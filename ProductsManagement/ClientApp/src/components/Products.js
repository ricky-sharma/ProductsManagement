import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Checkbox } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import CustomAlert from "./CustomAlert";

export default function Products() {
    const navigate = useNavigate();
    return (
        <ProductsPage navigate={navigate} />
    );
}

class ProductsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: true,
            options: {
                enable: false,
                message: '',
                alertColor: 'success'
            }
        };
    }

    componentDidMount() {
        this.populateData();
    }

    render() {
        const columns = [
            { field: 'ID', headerName: 'ID', hide: true },
            {
                field: 'name',
                headerName: 'Name',
                width: 280,
            },
            {
                field: 'type',
                headerName: 'Type',
                width: 280,
            },
            {
                field: 'price',
                headerName: 'Price',
                width: 240,
                valueGetter: (params) =>
                    `${params.row.price + ' $' || ''}`,
            },
            {
                field: 'active',
                headerName: 'Active',
                width: 150,
                renderCell: (params) => {
                    return (
                        <Checkbox
                            checked={params.row.active}
                            value={params.row.active}
                            disabled
                        />
                    )
                }
            },
            {
                field: 'actions',
                type: 'actions',
                headerName: 'Actions',
                width: 150,
                cellClassName: 'actions',
                getActions: (e) => {
                    return [
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            className="textPrimary"
                            onClick={this.handleEditClick(e)}
                            color="inherit"
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={this.handleDeleteClick(e)}
                            color="inherit"
                        />,
                    ];
                },
            }
        ];
        const rows = this.state.loading ? [] : this.state.products
        return (
            <div className="mx-5 px-5 my-5 py-4">
                <Box sx={{ height: 424, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        editMode='row'
                        loading={this.state.loading}
                        components={{
                            Toolbar: this.EditToolbar,
                        }}
                    />
                </Box>
                <CustomAlert options={this.state.options}></CustomAlert>
            </div>
        );
    }

    EditToolbar = () => {
        return <Box className="row"
            sx={{
                borderBottom: 1,
                borderColor: 'divider',
                p: 1,
                m: 0
            }}>
            <div className="col-6 m-0 p-0"
                style={{
                    display: "flex",
                    alignItems: "center"
                }}>
                <h5 className="m-0 p-0">Product List</h5>
            </div>
            <div
                className="col-6"
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItem: "flex-end",
                }}>
                <Button

                    onClick={this.handleAddClick}
                    variant="outlined">
                    Add
                </Button>
            </div>
        </Box>
    }

    handleAddClick = () => {
        return this.props.navigate("/AddEmployee")
    }

    handleEditClick = (product) => () => {
        return this.props.navigate("/EditEmployee", {
            state: {
                productId: product.id,
            }
        })
    };

    handleDeleteClick = (product) => () => {
        this.setState({ options: { enable: true, message: 'Please confirm?', enableAction: true, fnConfirm: () => this.Delete(product), duration: 0 } })
    }

    Delete = (product) => {
        fetch('products/' + product.id, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                if ((data.message !== null && data.message === 'success'))
                    this.setState({ options: { enable: true, message: 'Product data deleted.', alertColor: 'success' } }, () => {
                        this.populateData();
                    })
                else if (data.title !== null && data.title === "Not Found")
                    this.setState({ options: { enable: true, message: 'Product does not exist in database.', alertColor: 'error' } }, () => {
                        this.populateData();
                    })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    async populateData() {
        const response = await fetch('products');
        const data = await response.json();
        this.setState({ products: data, loading: false });
    }
}



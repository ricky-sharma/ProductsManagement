import AddEditProduct from "./components/AddEditProduct";
import Products from "./components/Products";

const AppRoutes = [
    {
        index: true,
        element: <Products />
    },
    {
        path: '/AddEmployee',
        element: <AddEditProduct />
    },
    {
        path: '/EditEmployee',
        element: <AddEditProduct />
    }
];

export default AppRoutes;

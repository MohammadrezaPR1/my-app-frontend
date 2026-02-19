import { useContext } from 'react';
import { AdminContext } from '../context/context';
import { Navigate, Outlet } from 'react-router-dom';

const Admin = () => {
    const { isAdmin } = useContext(AdminContext)
    return isAdmin ? <Outlet /> : <Navigate to="/admin-dashboard" replace={true} />
}

export default Admin;

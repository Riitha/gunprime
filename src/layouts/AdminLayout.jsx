import { Outlet } from "react-router";

export default function AdminLayout() {
    return (
    <>
    <h1>---Admin Side---</h1>
    <Outlet/>
    </>
    );
}
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";

export function HomePage({ cart, loadCart }) {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchHomeData = async () => {
            const response = search
                ? await axios.get(`/api/products?search=${search}`)
                : await axios.get("/api/products");
            setProducts(response.data);
        };

        fetchHomeData();
    }, [search]);

    return (
        <>
            <link rel='icon' href='home-favicon.png' />
            <title>Ecommerce Project</title>

            <Header cart={cart} />

            <div className='home-page'>
                <ProductsGrid products={products} loadCart={loadCart} />
            </div>
        </>
    );
}

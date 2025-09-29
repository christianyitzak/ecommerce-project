import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";

export function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchHomeData = async () => {
            const response = await axios.get("api/products");
            setProducts(response.data);
        };

        fetchHomeData();
    }, []);

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

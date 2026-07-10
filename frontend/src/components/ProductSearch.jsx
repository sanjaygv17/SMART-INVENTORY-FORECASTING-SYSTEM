import { useState } from "react";
import client from "../api/client";

function ProductSearch({ value, onSelect }) {

    const [products, setProducts] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async (searchTerm) => {

        if (!searchTerm.trim()) {

            setProducts([]);
            setShowSuggestions(false);

            return;

        }

        try {

            setLoading(true);

            const response = await client.get(
                `/products?search=${searchTerm}`
            );

            setProducts(response.data.data);

            setShowSuggestions(true);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        const searchTerm = e.target.value;

        onSelect({
            productName: searchTerm
        });

        fetchProducts(searchTerm);

    };

    const handleSelect = (product) => {

        onSelect(product);

        setShowSuggestions(false);

        setProducts([]);

    };

    return (

        <div className="relative">

            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="Search product..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />

            {showSuggestions && (

                <div className="absolute z-50 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border bg-white shadow-lg">

                    {loading ? (

                        <div className="p-3 text-gray-500">

                            Searching...

                        </div>

                    ) : products.length === 0 ? (

                        <div className="p-3 text-gray-500">

                            No products found

                        </div>

                    ) : (

                        products.map((product) => (

                            <div
                                key={product._id}
                                onClick={() => handleSelect(product)}
                                className="cursor-pointer border-b p-3 transition hover:bg-blue-100"
                            >

                                <div className="font-medium">

                                    {product.productName}

                                </div>

                                <div className="text-sm text-gray-500">

                                    {product.category}

                                </div>

                            </div>

                        ))

                    )}

                </div>

            )}

        </div>

    );

}

export default ProductSearch;
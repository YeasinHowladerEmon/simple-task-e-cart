
import { IProduct, useGetProductsQuery } from "@/redux/features/Product/productSlice";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../input";
import Product from "./Product";


const Products = () => {
    const [product, setProduct] = useState<IProduct[]>([])
    const {data: productData, isLoading} = useGetProductsQuery();
    // setProduct(productData as unknown as IProduct[])

    const [searchTerm, setSearchTerm]  = useState<string>('')

const [filteredProduct, setFilteredProduct] = useState<IProduct[]>([]);

useEffect(() => {
    if(productData){
        setProduct(productData as unknown as IProduct[])
        setFilteredProduct(productData as unknown as IProduct[])
    }
}, [productData])
console.log(product)

const handleSearchBar = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    console.log(searchTerm.toLowerCase())

    const filteredItems = product.filter((data) => 
        data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    setFilteredProduct(filteredItems)
    console.log('filtered',filteredItems)
}

    console.log(product)
    console.log(filteredProduct)
    console.log(isLoading)
    return (
        <div className="container  mx-auto mt-5">
            <div>
<h3 className="text-2xl mb-2">Search Product</h3>
            <Input width={100} height={500} onChange={(e) => handleSearchBar(e)} placeholder="title or category" />
            </div>
            <div className='grid lg:grid-cols-3 lg:gap-4 mt-10 md:grid-cols-2 md:gap-1'>
            {
                isLoading? (<p>Loading....</p>): (
                    filteredProduct.map((data) => <Product key={data.id} {...data} />)
                )
            }
            </div>
        </div>
    );
};

export default Products;
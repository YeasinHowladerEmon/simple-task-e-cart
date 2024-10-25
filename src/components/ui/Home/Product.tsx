import { addToCart } from "@/redux/features/Cart/cartSlice";

import { IProduct } from "@/redux/features/Product/productSlice";
import { useAppDispatch } from "@/redux/hook";
import { Button } from "../button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../card";

const Product = (product: IProduct) => {
  const { category, description, image, rating, title } = product;
  const dispatch = useAppDispatch();
  return (
    <div>
      <Card>
        <CardHeader>
          <img src={image} alt={image} width={200} height={100} />
        </CardHeader>
        <CardContent>
          <CardTitle>
            {title}
          </CardTitle>
          <p>
            {category}
          </p>
          <p>
            {rating.rate}
          </p>
          <CardDescription>
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button onClick={() => dispatch(addToCart(product))}>
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Product;

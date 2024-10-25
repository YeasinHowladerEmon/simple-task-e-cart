import {
  selectCartItems,
  selectCartTotal
} from "@/redux/features/Cart/cartSelector";
import {
  addToCart,
  clearCart,
  removeOneFromCart,
  removeProductFromCart
} from "@/redux/features/Cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ShoppingCart } from "lucide-react";
import { Button } from "../button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../sheet";

const Navbar = () => {
  const cartlength = useAppSelector((state) => state.cart.items);

  // Calculate the number of distinct products in the cart
  const distinctProductCount = cartlength.length; // Example cart items count
  const dispatch = useAppDispatch();
  const cartData = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

console.log(cartData)

  return (
    <div>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          {/* Left Section (Logo / Menu) */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold">Simple Ecomerce</h1>
          </div>

          {/* Center Section (Navigation Links) */}
          <div className="hidden md:flex space-x-6" />

          {/* Right Section (Cart) */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Sheet>
                <SheetTrigger>
                  <Button variant="outline" className="relative p-2">
                    <ShoppingCart className="w-6 h-6" />
                    {distinctProductCount > 0 &&
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                        {distinctProductCount}
                      </span>}
                  </Button>
                </SheetTrigger>
                <SheetContent >
                  <SheetHeader>
                    <SheetTitle>Cart</SheetTitle>
                    <SheetDescription className="max-h-[800px] overflow-y-auto">
                      <ul >
                        {cartData.map(({ product, quantity }) =>
                          <li key={product.id} className="mt-8">
                            <img src={product.image} alt={product.image} width={150} height={160} />
                            <p className="text-1xl">
                              {product.title} - price: ${product.price} X{" "}
                              {quantity}
                            </p>
                            <h4 className="font-bold">
                              Quantity: {quantity}
                            </h4>
                            <Button
                              onClick={() => dispatch(addToCart(product))}
                              className="ml-4 mt-2 text-2xl"
                            >
                              +
                            </Button>
                            <Button
                              className="ml-4 mt-2 text-2xl"
                              onClick={() =>
                                dispatch(removeOneFromCart(product.id))}
                            >
                              -
                            </Button>
                            <Button
                              className="ml-4 mt-2 text-sm"
                              onClick={() =>
                                dispatch(removeProductFromCart(product.id))}
                            >
                              Remove all
                            </Button>
                          </li>
                        )}
                      </ul>
                    </SheetDescription>
                  </SheetHeader>
                  <SheetFooter className="mt-10">
                    <h2>
                      Total: ${total}
                    </h2>
                    <SheetClose asChild>
                      <Button onClick={() => dispatch(clearCart())}>
                        Clear Cart
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/cartProduct";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );


  return (
    <>

      <div className="p-2 mt-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
          Your Cart Items
        </h2>

        {productCartItem[0] ?
          <div className="my-4 md:flex gap-3">
            {/* display cart items  */}
            <div className="w-full max-w-3xl ">
              {productCartItem.map((el) => {
                return (
                  <CartProduct
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    image={el.image}
                    category={el.category}
                    qty={el.qty}
                    total={el.total}
                    price={el.price}
                  />
                );
              })}
            </div>

            {/* total cart item  */}
            <div className="w-full h-48 max-w-md ml-auto ">
              <h2 className="bg-blue-500 text-white p-2 text-lg mt-10 md:mt-0">Summary</h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Qty :</p>
                <p className="ml-auto w-32 font-bold">{totalQty}</p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Price</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-red-500">₹</span> {totalPrice}
                </p>
              </div>
              <button className="bg-red-500 w-full text-lg font-bold py-2 text-white">
                Payment
              </button>
            </div>
          </div>

          :
          <>
            <div className="flex w-full justify-center items-center flex-col">
              <img
                src={"data:image/png;base64,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"}
                alt=""
                className="w-full max-w-sm"
              />
              <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
            </div>
          </>
        }
      </div>

    </>
  );
};

export default Cart;
import axios from "axios";
import React, { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const { cartItems, subTotal, tax, shipping, total } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  console.log("dfsd",cartItems)

  const increment = (id) => {
    dispatch({
      type: "addToCart",
      payload: { id },
    });
    dispatch({ type: "calculatePrice" });
  };
  const decrement = (id) => {
    dispatch({
      type: "decrement",
      payload: id,
    });

    dispatch({ type: "calculatePrice" });
  };
  const deleteHandler = (id) => {
    dispatch({
      type: "deleteFromCart",
      payload: id,
    });
    dispatch({ type: "calculatePrice" });
  };

  // const checkout= async(cartItems)=>{
  //   cartItems.map((cartItem)=>{
  //     console.log({id:cartItem.id,quantity:cartItem.quantity})
  //   })
  // }

  const checkout = async (cartItems) => {
    try {
      const items = cartItems.map((cartItem) => ({
        id: cartItem.id,
        quantity: cartItem.quantity,
      }));
      console.log(items)
      const response = await axios.post(
        "http://localhost:3001/create-checkout-session",
        items
      );
      console.log(response.data)
      window.location.href = response.data.url;

      // Handle the response from the backend
      console.log(response.data); // Replace with your own logic
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i) => (
            <CartItem
              imgSrc={i.imgSrc}
              name={i.name}
              price={i.price}
              qty={i.quantity}
              id={i.id}
              key={i.id}
              decrement={decrement}
              increment={increment}
              deleteHandler={deleteHandler}
            />
          ))
        ) : (
          <h1>No Items Yet</h1>
        )}
      </main>

      <aside>
        <h2>Subtotal: ${subTotal}</h2>
        {/* <h2>Shipping: ${shipping}</h2> */}
        {/* <h2>Tax: ${tax}</h2> */}
        <h2>Total: ${subTotal}</h2>
        <div style={{textAlign:"center"}}>
          <button style={{width:"150px",textAlign:"center",height:"50px",backgroundColor:"orange",color:"#fff"}} onClick={()=>checkout(cartItems)}>Checkout</button>
        </div>
      </aside>
    </div>
  );
};

const CartItem = ({
  imgSrc,
  name,
  price,
  qty,
  decrement,
  increment,
  deleteHandler,
  id,
}) => (
  <div className="cartItem">
    <img src={imgSrc} alt="Item" />
    <article>
      <h3>{name}</h3>
      <p>${price}</p>
    </article>

    <div>
      <button onClick={() => decrement(id)}>-</button>
      <p>{qty}</p>
      <button onClick={() => increment(id)}>+</button>
    </div>

    <AiFillDelete onClick={() => deleteHandler(id)} />
  </div>
);

export default Cart;

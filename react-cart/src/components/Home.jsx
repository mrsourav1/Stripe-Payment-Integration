import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";


const Home = () => {
  const productList = [
    {
      id: 1,
      name: 'Veg Burger',
      category: 'Burgers',
      price: 8.99,
      imgSrc:"https://www.indianhealthyrecipes.com/wp-content/uploads/2016/02/veg-burger-recipe-1.jpg"
    },
    {
      id: 2,
      name: 'Chicken Burger',
      category: 'Burgers',
      price: 9.99,
      imgSrc:"https://www.saltandlavender.com/wp-content/uploads/2016/05/ground-chicken-burgers-1.jpg"
    },
    {
      id: 3,
      name: 'Egg Burger',
      category: 'Burgers',
      price: 7.99,
      imgSrc:"https://bakeitwithlove.com/wp-content/uploads/2023/01/egg-burger-h.jpg"
    },
    {
      id: 4,
      name: 'Onion and Capsicum Pizza',
      category: 'Pizza',
      price: 12.99,
      imgSrc:"https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/classic-onion-capsicum-pan-personal.dad788ecbd3fcc57366462827e31ee05.1.jpg"
    },
    {
      id: 5,
      name: 'Corn Pizza',
      category: 'Pizza',
      price: 11.99,
      imgSrc:"https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/corn.f8baa08ad7f607f1de30f96bb9245b50.1.jpg"
    },
    {
      id: 6,
      name: 'Paneer Pizza',
      category: 'Pizza',
      price: 13.99,
      imgSrc:"https://static.toiimg.com/thumb/54699659.cms?imgsize=2071173&width=800&height=800"
    },
    {
      id: 7,
      name: 'White Sauce Pasta',
      category: 'Pasta',
      price: 10.99,
      imgSrc:"https://www.spiceupthecurry.com/wp-content/uploads/2023/02/white-sauce-pasta-2.jpg"
    },
    {
      id: 8,
      name: 'Mix Sauce Pasta',
      category: 'Pasta',
      price: 11.99,
      imgSrc:"https://static.toiimg.com/thumb/83107712.cms?imgsize=329789&width=800&height=800"
    },
    {
      id: 9,
      name: 'Red Sauce Pasta',
      category: 'Pasta',
      price: 9.99,
      imgSrc:"https://img.buzzfeed.com/thumbnailer-prod-us-east-1/75c25eb5538b4b3c91fdf71e747c1e84/BFV44742_PantryPasta_FB_Final.jpg?resize=1200:*"
    },
  ];

  const dispatch = useDispatch();

  const addToCartHandler = (options) => {
    dispatch({ type: "addToCart", payload: options });
    dispatch({ type: "calculatePrice" });
    toast.success("Added To Cart");
  };
  return (
    <div className="home">
      {productList.map((i) => (
        <ProductCard
          key={i.id}
          imgSrc={i.imgSrc}
          name={i.name}
          price={i.price}
          id={i.id}
          handler={addToCartHandler}
        />
      ))}
    </div>
  );
};

const ProductCard = ({ name, id, price, handler, imgSrc }) => (
  <div className="productCard" style={{width:"350px"}}>
    <img src={imgSrc} alt={name} />
    <p>{name}</p>
    <h4>${price}</h4>
    <button onClick={() => handler({ name, price, id, quantity: 1, imgSrc })}>
      Add to Cart
    </button>
  </div>
);

export default Home;

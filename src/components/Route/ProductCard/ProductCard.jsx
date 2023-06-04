import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import styles from '../../../styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../../redux/actions/wishlist';
import { AiFillHeart, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { addTocart } from '../../../redux/actions/cart';
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx";

const ProductCard = ({data}) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i.id === data.id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i.id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const d = data.name
  const name = d.replace(/\s+/g, "-")
  return (
    <>
      <div className="w-full h-[310px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${name}`}>
          <img
            src={`${data.image_Url[0].url}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to={`/product/${name}`}>
          <h4 className="pb-3 mt-4 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 50) + "..." : data.name}
          </h4>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.pricebold}`}>
                Rp. 
                {data.price}
              </h5>
            </div>
          </div> 
        </Link>

        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(data.id)}
            color="#444"
            title="Add to cart"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  )
}

export default ProductCard

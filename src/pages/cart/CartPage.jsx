"use client"

import { useDispatch, useSelector } from "react-redux"
import Layout from "../../components/layout/Layout"
import { Trash } from "lucide-react"
import { decrementQuantity, deleteFromCart, incrementQuantity, clearCart } from "../../redux/cartSlice"
import toast from "react-hot-toast"
import { useEffect, useState, useRef } from "react"
import { Timestamp, addDoc, collection } from "firebase/firestore"
import { fireDB } from "../../firebase/FirebaseConfig"
import BuyNowModal from "../../components/buyNowModal/BuyNowModal"
import { useNavigate } from "react-router-dom"
import gsap from "gsap"

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Refs for GSAP animations
  const cartContainerRef = useRef(null)
  const cartItemsRef = useRef([])
  const summaryRef = useRef(null)
  const headingRef = useRef(null)

  const deleteCart = (item) => {
    // Create a fade out animation before removing the item
    const itemElement = cartItemsRef.current[cartItems.indexOf(item)]
    if (itemElement) {
      gsap.to(itemElement, {
        opacity: 0,
        y: -20,
        height: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          dispatch(deleteFromCart(item))
          toast.success("Item removed from cart")
        },
      })
    } else {
      dispatch(deleteFromCart(item))
      toast.success("Item removed from cart")
    }
  }

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id))
    // Animate the quantity change
    const itemIndex = cartItems.findIndex((item) => item.id === id)
    const quantityElement = cartItemsRef.current[itemIndex]?.querySelector('input[type="text"]')
    if (quantityElement) {
      gsap.fromTo(
        quantityElement,
        { scale: 1 },
        { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.inOut" },
      )
    }
  }

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id))
    // Animate the quantity change
    const itemIndex = cartItems.findIndex((item) => item.id === id)
    const quantityElement = cartItemsRef.current[itemIndex]?.querySelector('input[type="text"]')
    if (quantityElement) {
      gsap.fromTo(
        quantityElement,
        { scale: 1 },
        { scale: 0.8, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.inOut" },
      )
    }
  }

  const cartItemTotal = cartItems.map((item) => item.quantity).reduce((a, b) => a + b, 0)
  const cartTotal = cartItems.map((item) => item.price * item.quantity).reduce((a, b) => a + b, 0)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))

    // Animate the price summary when cart items change
    if (summaryRef.current) {
      gsap.fromTo(
        summaryRef.current.querySelectorAll("dd"),
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: "power2.out" },
      )
    }
  }, [cartItems])

  // Initial animations when component mounts
  useEffect(() => {
    // Animate heading
    gsap.fromTo(headingRef.current, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })

    // Animate cart items
    gsap.fromTo(
      cartItemsRef.current,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: "power2.out" },
    )

    // Animate summary section
    gsap.fromTo(
      summaryRef.current,
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power2.out" },
    )
  }, [])

  const user = JSON.parse(localStorage.getItem("users"))

  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  })

  const buyNowFunction = async () => {
    if (
      addressInfo.name === "" ||
      addressInfo.address === "" ||
      addressInfo.pincode === "" ||
      addressInfo.mobileNumber === ""
    ) {
      return toast.error("All Fields are required")
    }

    // Create a loading animation
    const timeline = gsap.timeline()
    timeline.to(cartContainerRef.current, {
      opacity: 0.7,
      duration: 0.5,
      ease: "power2.inOut",
    })

    const orderInfo = {
      cartItems,
      addressInfo,
      email: user.email,
      userid: user.uid,
      status: "confirmed",
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    }

    try {
      const orderRef = collection(fireDB, "order")
      await addDoc(orderRef, orderInfo)
      setAddressInfo({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
      })

      // Complete the animation and clear cart
      timeline.to(cartContainerRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => {
          dispatch(clearCart())
          toast.success("Order Placed Successfully")
          navigate("/order-success")
        },
      })
    } catch (error) {
      console.log(error)
      // Revert animation if error
      timeline.to(cartContainerRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-7xl lg:px-0">
        <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl" ref={cartContainerRef}>
          <h1 ref={headingRef} className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            {/* Cart Items */}
            <section className="rounded-lg bg-white lg:col-span-8">
              <ul role="list" className="divide-y divide-gray-200">
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => {
                    const { id, title, price, productImageUrl, quantity, category } = item
                    return (
                      <div key={index} ref={(el) => (cartItemsRef.current[index] = el)} className="cart-item">
                        <li className="flex py-6 sm:py-6">
                          <div className="flex-shrink-0">
                            <img
                              src={productImageUrl || "/placeholder.svg"}
                              alt="img"
                              className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain"
                            />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                              <div>
                                <div className="flex justify-between">
                                  <h3 className="text-sm font-semibold text-black">{title}</h3>
                                </div>
                                <div className="mt-1 flex text-sm">
                                  <p className="text-sm text-gray-500">{category}</p>
                                </div>
                                <div className="mt-1 flex items-end">
                                  <p className="text-sm font-medium text-gray-900">Rs: {price}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <div className="mb-2 flex">
                          <div className="min-w-24 flex">
                            <button
                              onClick={() => handleDecrement(id)}
                              type="button"
                              className="h-7 w-7 transition-transform hover:scale-110"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              className="mx-1 h-7 w-9 rounded-md border text-center"
                              value={quantity}
                              readOnly
                            />
                            <button
                              onClick={() => handleIncrement(id)}
                              type="button"
                              className="h-7 w-7 transition-transform hover:scale-110"
                            >
                              +
                            </button>
                          </div>
                          <div className="ml-6 flex text-sm">
                            <button
                              onClick={() => deleteCart(item)}
                              type="button"
                              className="flex items-center space-x-1 px-2 py-1 pl-0 transition-colors hover:text-red-500"
                            >
                              <Trash size={12} className="text-green-500" />
                              <span className="text-xs font-medium text-green-500">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <h1 className="text-center py-4 text-gray-500">Your cart is empty</h1>
                )}
              </ul>
            </section>

            {/* Price Summary */}
            <section ref={summaryRef} className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0">
              <h2 className="border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4">
                Price Details
              </h2>
              <div>
                <dl className="space-y-1 px-2 py-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-800">Price ({cartItemTotal} item)</dt>
                    <dd className="text-sm font-medium text-gray-900">Rs: {cartTotal}</dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="flex text-sm text-gray-800">
                      <span>Delivery Charges</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-700">Free</dd>
                  </div>
                  <div className="flex items-center justify-between border-y border-dashed py-4">
                    <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                    <dd className="text-base font-medium text-gray-900">Rs: {cartTotal}</dd>
                  </div>
                </dl>
                <div className="px-2 pb-4 font-medium text-green-700">
                  <div className="flex gap-4 mb-6">
                    {user ? (
                      <BuyNowModal
                        addressInfo={addressInfo}
                        setAddressInfo={setAddressInfo}
                        buyNowFunction={buyNowFunction}
                      />
                    ) : (
                      <p>Please login to place order</p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default CartPage

"use client"

import { useContext, useEffect, useState, useRef } from "react"
import Layout from "../../components/layout/Layout"
import myContext from "../../context/myContext"
import { useParams } from "react-router"
import { fireDB } from "../../firebase/FirebaseConfig"
import { doc, getDoc } from "firebase/firestore"
import Loader from "../../components/loader/Loader"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, deleteFromCart } from "../../redux/cartSlice"
import toast from "react-hot-toast"
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard"
import gsap from "gsap"

const ProductInfo = () => {
  const context = useContext(myContext)
  const { loading, setLoading } = context

  const [product, setProduct] = useState("")
  const { id } = useParams()

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)

  // GSAP animation refs
  const productImageRef = useRef(null)
  const productTitleRef = useRef(null)
  const productPriceRef = useRef(null)
  const productDescriptionRef = useRef(null)
  const productRatingRef = useRef(null)
  const buttonsContainerRef = useRef(null)
  const pageContainerRef = useRef(null)

  // getProductData
  const getProductData = async () => {
    setLoading(true)
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id))
      setProduct({ ...productTemp.data(), id: productTemp.id })
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const cartItems = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const addCart = (item) => {
    dispatch(addToCart(item))
    toast.success("Add to cart")

    // Button click animation
    gsap.to(buttonsContainerRef.current, {
      scale: 1.05,
      duration: 0.2,
      ease: "power1.out",
      onComplete: () => {
        gsap.to(buttonsContainerRef.current, {
          scale: 1,
          duration: 0.2,
          ease: "power1.in",
        })
      },
    })
  }

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item))
    toast.success("Delete cart")

    // Button click animation
    gsap.to(buttonsContainerRef.current, {
      scale: 0.95,
      duration: 0.2,
      ease: "power1.out",
      onComplete: () => {
        gsap.to(buttonsContainerRef.current, {
          scale: 1,
          duration: 0.2,
          ease: "power1.in",
        })
      },
    })
  }

  // Initialize GSAP animations after product data is loaded
  useEffect(() => {
    if (!loading && product && pageContainerRef.current) {
      gsap.fromTo(pageContainerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" })

      const timeline = gsap.timeline()
      timeline.fromTo(productImageRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "back.out(1.2)" }, 0)
      timeline.fromTo(productTitleRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 0.3)
      timeline.fromTo(productRatingRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "power1.out" }, 0.5)
      timeline.fromTo(productPriceRef.current, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 0.6)
      timeline.fromTo(productDescriptionRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, 0.7)
      timeline.fromTo(buttonsContainerRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.4)" }, 0.9)
    }
  }, [loading, product])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    getProductData()
  }, [])

  return (
    <Layout>
      <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div ref={pageContainerRef} className="max-w-6xl px-4 mx-auto">
            <div className="flex flex-wrap mb-24 -mx-4">
              <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                <div
                  className="overflow-hidden rounded-lg cursor-pointer"
                  ref={productImageRef}
                  onClick={() => setIsModalOpen(true)}
                  title="Click to enlarge"
                >
                  <img
                    className="w-full lg:h-[39em] rounded-lg transition-transform hover:scale-105 duration-700"
                    src={product?.productImageUrl || "/placeholder.svg"}
                    alt={product?.title}
                  />
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2">
                <div className="lg:pl-20">
                  <div className="mb-6">
                    <h2
                      ref={productTitleRef}
                      className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300"
                    >
                      {product?.title}
                    </h2>
                    <div ref={productRatingRef} className="flex flex-wrap items-center mb-6">
                      <ul className="flex mb-4 mr-2 lg:mb-0">
                        {[1, 2, 3, 4, 5].map((star, index) => (
                          <li key={index}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              fill="currentColor"
                              className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                            </svg>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p
                      ref={productPriceRef}
                      className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400"
                    >
                      <span>Rs: {product?.price}</span>
                    </p>
                  </div>
                  <div className="mb-6">
                    <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">Description:</h2>
                    <p ref={productDescriptionRef}>{product?.description}</p>
                  </div>

                  <div className="mb-6" />
                  <div ref={buttonsContainerRef} className="space-y-4">
                    <div className="flex flex-wrap items-center mb-6">
                      {cartItems.some((p) => p.id === product.id) ? (
                        <button
                          onClick={() => deleteCart(product)}
                          className="w-full px-4 py-3 text-center text-white bg-blue-gray-500 border border--600 hover:bg-blue-gray-600 hover:text-gray-100 rounded-xl transition-all duration-300"
                        >
                          Delete from cart
                        </button>
                      ) : (
                        <button
                          onClick={() => addCart(product)}
                          className="w-full px-4 py-3 text-center text-white bg-blue-gray-400 border border-blue-600 hover:bg-blue-gray-600 hover:text-gray-100 rounded-xl transition-all duration-300"
                        >
                          Add to cart
                        </button>
                      )}
                    </div>
                    <div className="flex gap-4 mb-6">
                      <button className="w-full px-4 py-3 text-center text-gray-100 bg-blue-gray-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-gray-100 hover:bg-blue-gray-300 rounded-xl transition-all duration-300">
                        Buy now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()} // Prevent closing modal on clicking image container
              className="relative max-w-3xl w-full mx-4"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 text-white bg-gray-800 bg-opacity-70 rounded-full p-2 hover:bg-gray-700 transition"
                aria-label="Close modal"
              >
                &#x2715;
              </button>
              <img
                src={product?.productImageUrl || "/placeholder.svg"}
                alt={product?.title}
                className="w-full rounded-lg"
              />
            </div>
          </div>
        )}
      </section>
      <HomePageProductCard />
      <br />
      <br />
      <br />
      <br />
    </Layout>
  )
}

export default ProductInfo

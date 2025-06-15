"use client"

import { useNavigate } from "react-router"
import Layout from "../../components/layout/Layout"
import { useContext, useEffect, useRef, useState } from "react"
import myContext from "../../context/myContext"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { addToCart, deleteFromCart } from "../../redux/cartSlice"
import gsap from "gsap"

const AllProduct = () => {
  const navigate = useNavigate()
  const context = useContext(myContext)
  const { getAllProduct, selectedTitle, setSelectedTitle } = context
  const productRefs = useRef([])

  const cartItems = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  // Search state
  const [searchTerm, setSearchTerm] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  const addCart = (item) => {
    dispatch(addToCart(item))
    toast.success("Add to cart")
  }

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item))
    toast.success("Delete cart")
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  // Get unique product titles for dropdown
  const uniqueTitles = ["All", ...new Set(getAllProduct.map((item) => item.title))]

  // Filter logic (dropdown + search + price)
  const filteredProducts = getAllProduct.filter((item) => {
    const matchesTitle = selectedTitle === "All" || item.title === selectedTitle
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const price = Number(item.price)
    const matchesMax = maxPrice === "" || price <= Number(maxPrice)
    return matchesTitle && matchesSearch && matchesMax
  })

  // GSAP animation
  useEffect(() => {
    productRefs.current = productRefs.current.slice(0, filteredProducts.length)

    const tl = gsap.timeline()
    gsap.set(productRefs.current, { opacity: 0, y: 30 })

    tl.to(productRefs.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
    })

    return () => {
      tl.kill()
    }
  }, [filteredProducts])

  return (
    <Layout>
      <div className="py-8">
        <h1 className="text-center mb-5 text-2xl font-semibold">All Products</h1>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row items-center gap-4 justify-center">
          <select
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg w-[250px]"
          >
            {uniqueTitles.map((title, index) => (
              <option key={index} value={title}>
                {title}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg w-[250px]"
          />

          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg w-[120px]"
          />
        </div>

        {/* Products */}
        <section className="text-gray-600 body-font">
          <div className="container px-5 lg:px-0 py-5 mx-auto">
            <div className="flex flex-wrap -m-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item, index) => {
                  const { id, title, price, productImageUrl } = item
                  return (
                    <div
                      key={index}
                      className="p-4 w-full md:w-1/4"
                      ref={(el) => (productRefs.current[index] = el)}
                    >
                      <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                        <img
                          onClick={() => navigate(`/productinfo/${id}`)}
                          className="lg:h-80 h-96 w-full object-cover"
                          src={productImageUrl || "/placeholder.svg"}
                          alt="product"
                        />
                        <div className="p-6">
                          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                            Shah-Store
                          </h2>
                          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                            {title}
                          </h1>
                          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                            Rs: {price}
                          </h1>

                          <div className="flex justify-center">
                            {cartItems.some((p) => p.id === item.id) ? (
                              <button
                                onClick={() => deleteCart(item)}
                                className="bg-blue-400 hover:bg-blue-500 w-full text-white py-[4px] rounded-lg font-bold"
                              >
                                Delete From Cart
                              </button>
                            ) : (
                              <button
                                onClick={() => addCart(item)}
                                className="bg-blue-400 hover:bg-blue-500 w-full text-white py-[4px] rounded-lg font-bold"
                              >
                                Add To Cart
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="text-center w-full text-gray-500 mt-10">No products found.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default AllProduct

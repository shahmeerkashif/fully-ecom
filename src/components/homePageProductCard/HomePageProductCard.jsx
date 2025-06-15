import { useContext, useEffect, useRef } from "react"
import { useNavigate } from "react-router"
import myContext from "../../context/myContext"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { addToCart, deleteFromCart } from "../../redux/cartSlice"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const HomePageProductCard = () => {
  const navigate = useNavigate()
  const context = useContext(myContext)
  const { getAllProduct } = context

  const cartItems = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  // Refs for GSAP animations
  const headingRef = useRef(null)
  const cardsRef = useRef([])
  const imagesRef = useRef([])
  const categoryTextsRef = useRef([])
  const containerRef = useRef(null)

  const addCart = (item) => {
    // Create a quick animation for the add to cart action
    gsap.to(document.body, {
      duration: 0.2,
      ease: "power1.inOut",
      onComplete: () => {
        dispatch(addToCart(item))
        toast.success("Add to cart")
      },
    })
  }

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item))
    toast.success("Delete from cart")
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  // GSAP animations on component mount
  useEffect(() => {
    // Initial setup - hide elements
    gsap.set(headingRef.current, { opacity: 0, y: -50 })
    gsap.set(cardsRef.current, { opacity: 0, y: 100 })
    gsap.set(imagesRef.current, { scale: 0.8, opacity: 0 })
    gsap.set(categoryTextsRef.current, { opacity: 0, y: 20 })

    // Create a timeline for the heading animation
    const headingTl = gsap.timeline()
    headingTl.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    })

    // Create a timeline for the cards with ScrollTrigger
    const cardsTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", // Start animation when the top of the container is 80% from the top of the viewport
        toggleActions: "play none none none",
      },
    })

    // Staggered animation for cards
    cardsTl
      .to(
        cardsRef.current,
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
        },
        0,
      )
      .to(
        imagesRef.current,
        {
          scale: 1,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        0.2,
      )
      .to(
        categoryTextsRef.current,
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
        },
        0.4,
      )

    // Cleanup function
    return () => {
      if (cardsTl.scrollTrigger) {
        cardsTl.scrollTrigger.kill()
      }
      headingTl.kill()
      cardsTl.kill()
    }
  }, [getAllProduct.length])

  // Function to handle hover animations
  const handleHover = (index, isEnter) => {
    if (isEnter) {
      // Mouse enter animation
      gsap.to(cardsRef.current[index], {
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        duration: 0.3,
        ease: "power2.out",
      })
      gsap.to(imagesRef.current[index], {
        scale: 1.05,
        duration: 0.5,
        ease: "power2.out",
      })
      gsap.to(categoryTextsRef.current[index], {
        color: "#2563EB", // blue-600
        fontWeight: "bold",
        duration: 0.3,
      })
    } else {
      // Mouse leave animation
      gsap.to(cardsRef.current[index], {
        y: 0,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        duration: 0.3,
        ease: "power2.out",
      })
      gsap.to(imagesRef.current[index], {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      })
      gsap.to(categoryTextsRef.current[index], {
        color: "#3B82F6", // blue-500
        fontWeight: "medium",
        duration: 0.3,
      })
    }
  }

  // Function to handle click animation
  const handleClick = (index, category) => {
    // Create a click animation
    gsap
      .timeline()
      .to(cardsRef.current[index], {
        scale: 0.95,
        duration: 0.1,
      })
      .to(cardsRef.current[index], {
        scale: 1,
        duration: 0.2,
        onComplete: () => navigate(`/category/${category}`),
      })
  }

  // ✅ Unique products based on category
  const uniqueProductsByCategory = []
  const seenCategories = new Set()

  getAllProduct.forEach((item) => {
    if (!seenCategories.has(item.category)) {
      seenCategories.add(item.category)
      uniqueProductsByCategory.push(item)
    }
  })

  return (
    <div className="mt-10">
      {/* Heading */}
      <div>
        <h1 ref={headingRef} className="text-center mb-5 text-2xl font-semibold relative">
          Bestselling Products
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-500 rounded-full"></span>
        </h1>
      </div>

      {/* Main */}
      <section ref={containerRef} className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {uniqueProductsByCategory.map((item, index) => {
              const { id, title, price, productImageUrl, category } = item
              return (
                <div
                  key={index}
                  className="p-4 w-full md:w-1/4"
                  onMouseEnter={() => handleHover(index, true)}
                  onMouseLeave={() => handleHover(index, false)}
                >
                  <div
                    ref={(el) => (cardsRef.current[index] = el)}
                    className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer transition-all duration-300"
                  >
                    <div className="overflow-hidden">
                      <img
                        ref={(el) => (imagesRef.current[index] = el)}
                        onClick={() => handleClick(index, category)}
                        className="lg:h-80 h-96 w-full object-cover transition-transform duration-500"
                        src={productImageUrl || "/placeholder.svg"}
                        alt={title}
                      />
                    </div>
                    <div className="p-6">
                      <h2
                        ref={(el) => (categoryTextsRef.current[index] = el)}
                        onClick={() => handleClick(index, category)}
                        className="tracking-widest text-lg title-font font-medium text-blue-500 mb-1 uppercase cursor-pointer transition-colors duration-300"
                      >
                        {category}
                      </h2>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePageProductCard

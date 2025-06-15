import { Link, useNavigate } from "react-router-dom"
import SearchBar from "../searchBar/SearchBar"
import { useSelector } from "react-redux"
import { useEffect, useState, useRef } from "react"
import gsap from "gsap"
import { Sun, Moon } from "lucide-react"

const Navbar = () => {
  // get user from localStorage
  const user = JSON.parse(localStorage.getItem("users"))

  // navigate
  const navigate = useNavigate()

  // logout function
  const logout = () => {
    localStorage.clear("users")
    navigate("/login")
  }

  // CartItems
  const cartItems = useSelector((state) => state.cart)

  // 🌗 Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark"
  })

  // Refs for GSAP animations
  const navbarRef = useRef(null)
  const logoRef = useRef(null)
  const navItemsRef = useRef([])
  const searchBarRef = useRef(null)
  const toggleRef = useRef(null)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  // GSAP animations on component mount
  useEffect(() => {
    // Create a timeline for smoother sequenced animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    // Navbar background animation
    tl.fromTo(navbarRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.8 })

    // Logo animation
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6 },
      "-=0.4", // Start slightly before the previous animation ends
    )

    // Nav items staggered animation
    tl.fromTo(navItemsRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, "-=0.3")

    // Search bar animation
    tl.fromTo(searchBarRef.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5 }, "-=0.2")

    // Toggle button animation
    tl.fromTo(toggleRef.current, { opacity: 0, rotate: -90 }, { opacity: 1, rotate: 0, duration: 0.5 }, "-=0.3")

    // Cleanup function
    return () => {
      tl.kill()
    }
  }, [])

  // Animation for dark mode toggle
  const animateToggle = () => {
    gsap.to(toggleRef.current, {
      rotate: 360,
      duration: 0.6,
      ease: "back.out(1.7)",
      onComplete: () => setDarkMode(!darkMode),
    })
  }

  // navList Data with refs for animation
  const navList = (
    <ul style={{ fontFamily: "Agbalumo" }} className="flex space-x-7 text-white font-medium text-sm px-5">
      {[
        { to: "/", label: "Home" },
        { to: "/allproduct", label: "All Product" },
        ...(!user
          ? [
              { to: "/signup", label: "Signup" },
              { to: "/login", label: "Login" },
            ]
          : []),
        ...(user?.role === "user" ? [{ to: "/user-dashboard", label: "User" }] : []),
        ...(user?.role === "admin" ? [{ to: "/admin-dashboard", label: "Admin" }] : []),
        ...(user ? [{ label: "Logout", onClick: logout }] : []),
        { to: "/cart", label: `Cart(${cartItems.length})` },
      ].map((item, index) => (
        <li
          key={index}
          ref={(el) => (navItemsRef.current[index] = el)}
          className="hover:text-blue-200 transition-colors duration-300"
        >
          {item.onClick ? (
            <span className="cursor-pointer" onClick={item.onClick}>
              {item.label}
            </span>
          ) : (
            <Link to={item.to}>{item.label}</Link>
          )}
        </li>
      ))}
    </ul>
  )

  return (
    <nav ref={navbarRef} className="bg-blue-gray-400 dark:bg-gray-800 sticky top-0 border-b-2 text-white z-10">
      <div className="lg:flex lg:justify-between items-center py-3 lg:px-3">
        {/* left */}
        <div className="left py-3 lg:py-0" ref={logoRef}>
          <Link to={"/"}>
            <h2
              style={{ fontFamily: "Agbalumo" }}
              className="font-bold text-white text-2xl text-center dark:text-white hover:text-blue-200 transition-colors duration-300"
            >
              TheShahmeerStore
            </h2>
          </Link>
        </div>

        {/* right */}
        <div className="right flex justify-center mb-4 lg:mb-0">{navList}</div>

        {/* Search Bar */}
        <div ref={searchBarRef}>
          <SearchBar />
        </div>

        {/* 🌗 Dark Mode Toggle Button */}
        <button
          ref={toggleRef}
          onClick={animateToggle}
          className="p-2 rounded-full bg-blue-600 dark:bg-gray-700 ml-4 hover:bg-blue-700 dark:hover:bg-gray-600 transition-colors duration-300"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun className="h-5 w-5 text-yellow-300" /> : <Moon className="h-5 w-5 text-blue-100" />}
        </button>
      </div>
    </nav>
  )
}

export default Navbar

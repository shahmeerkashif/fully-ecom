import { useNavigate } from "react-router"
import { useEffect, useRef } from "react"
import gsap from "gsap"

// category
const category = [
  {
    image: "https://cdn-icons-png.flaticon.com/256/4359/4359963.png",
    name: "fashion",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/11833/11833323.png",
    name: "shirt",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/8174/8174424.png",
    name: "jacket",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/7648/7648246.png",
    name: "mobile",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/12142/12142416.png",
    name: "laptop",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/10686/10686553.png",
    name: "shoes",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/12114/12114279.png",
    name: "home",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/11946/11946316.png",
    name: "books",
  },
]

const Category = () => {
  // navigate
  const navigate = useNavigate()

  // Refs for GSAP animations
  const containerRef = useRef(null)
  const categoryRefs = useRef([])
  const imageRefs = useRef([])
  const textRefs = useRef([])

  // Initialize animations on component mount
  useEffect(() => {
    // Set initial states for animation
    gsap.set(categoryRefs.current, { opacity: 0, y: 50 })
    gsap.set(imageRefs.current, { scale: 0.5, opacity: 0 })
    gsap.set(textRefs.current, { opacity: 0 })

    // Create a timeline for staggered animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    // Animate container first
    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })

    // Animate category items with stagger
    tl.to(
      categoryRefs.current,
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.7,
      },
      "-=0.3",
    )

    // Animate images with bounce effect
    tl.to(
      imageRefs.current,
      {
        scale: 1,
        opacity: 1,
        stagger: 0.1,
        duration: 0.7,
        ease: "back.out(1.7)",
      },
      "-=0.5",
    )

    // Animate text labels
    tl.to(
      textRefs.current,
      {
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
      },
      "-=0.3",
    )

    // Cleanup function
    return () => {
      tl.kill()
    }
  }, [])

  // Function to handle hover animations
  const handleHover = (index, isEnter) => {
    if (isEnter) {
      // Mouse enter animation
      gsap.to(imageRefs.current[index], {
        y: -10,
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      })
      gsap.to(textRefs.current[index], {
        scale: 1.1,
        color: "#3B82F6", // blue-500
        fontWeight: "bold",
        duration: 0.3,
      })
    } else {
      // Mouse leave animation
      gsap.to(imageRefs.current[index], {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
      gsap.to(textRefs.current[index], {
        scale: 1,
        color: "#000000",
        fontWeight: "normal",
        duration: 0.3,
      })
    }
  }

  // Function to handle click animation
  const handleClick = (index, itemName) => {
    // Create a click animation
    gsap
      .timeline()
      .to(imageRefs.current[index], {
        scale: 0.8,
        duration: 0.1,
      })
      .to(imageRefs.current[index], {
        scale: 1.2,
        duration: 0.2,
        onComplete: () => navigate(`/category/${itemName}`),
      })
  }

  return (
    <div>
      <div className="flex flex-col mt-5">
        {/* main 1 */}
        <div ref={containerRef} className="flex overflow-x-scroll lg:justify-center hide-scroll-bar">
          {/* main 2  */}
          <div className="flex">
            {/* category  */}
            {category.map((item, index) => {
              return (
                <div
                  key={index}
                  className="px-3 lg:px-10"
                  ref={(el) => (categoryRefs.current[index] = el)}
                  onMouseEnter={() => handleHover(index, true)}
                  onMouseLeave={() => handleHover(index, false)}
                >
                  {/* Image  */}
                  <div
                    onClick={() => handleClick(index, item.name)}
                    className="w-16 h-16 lg:w-24 lg:h-24 max-w-xs rounded-full bg-blue-gray-400 transition-all hover:bg-blue-gray-500 cursor-pointer mb-1 flex items-center justify-center overflow-hidden"
                  >
                    {/* Image tag  */}
                    <img
                      ref={(el) => (imageRefs.current[index] = el)}
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-3/4 h-3/4 object-contain"
                    />
                  </div>

                  {/* Name Text  */}
                  <h1
                    ref={(el) => (textRefs.current[index] = el)}
                    className="text-sm lg:text-lg text-center font-medium title-font first-letter:uppercase"
                  >
                    {item.name}
                  </h1>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* style  */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
                .hide-scroll-bar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
                .hide-scroll-bar::-webkit-scrollbar {
                  display: none;
                }
            `,
        }}
      />
    </div>
  )
}

export default Category

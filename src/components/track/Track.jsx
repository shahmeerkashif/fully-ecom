"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Track = () => {
  // Refs for GSAP animations
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const iconsRef = useRef([])
  const titlesRef = useRef([])
  const descriptionsRef = useRef([])

  // GSAP animations on component mount
  useEffect(() => {
    // Set initial states for animation
    gsap.set(cardsRef.current, { opacity: 0, y: 100 })
    gsap.set(iconsRef.current, { scale: 0, opacity: 0 })
    gsap.set(titlesRef.current, { opacity: 0, y: 20 })
    gsap.set(descriptionsRef.current, { opacity: 0 })

    // Create a timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%", // Start animation when the top of the section is 80% from the top of the viewport
        toggleActions: "play none none none",
      },
    })

    // Staggered animation for cards
    tl.to(
      cardsRef.current,
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      },
      0,
    )

    // Animate icons with a bounce effect
    tl.to(
      iconsRef.current,
      {
        scale: 1,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)",
        rotation: 360,
      },
      0.3,
    )

    // Animate titles
    tl.to(
      titlesRef.current,
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.5,
      },
      0.5,
    )

    // Animate descriptions
    tl.to(
      descriptionsRef.current,
      {
        opacity: 1,
        stagger: 0.2,
        duration: 0.5,
      },
      0.7,
    )

    // Cleanup function
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill()
      }
      tl.kill()
    }
  }, [])

  // Function to handle hover animations
  const handleHover = (index, isEnter) => {
    if (isEnter) {
      // Mouse enter animation
      gsap.to(cardsRef.current[index], {
        y: -10,
        backgroundColor: "#f3f4f6", // gray-100 with slight change
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        duration: 0.3,
        ease: "power2.out",
      })
      gsap.to(iconsRef.current[index], {
        scale: 1.2,
        color: "#3B82F6", // blue-500
        duration: 0.3,
        ease: "back.out(1.7)",
      })
      gsap.to(titlesRef.current[index], {
        scale: 1.05,
        color: "#2563EB", // blue-600
        duration: 0.3,
      })
    } else {
      // Mouse leave animation
      gsap.to(cardsRef.current[index], {
        y: 0,
        backgroundColor: "#f3f4f6", // back to gray-100
        boxShadow: "inset 0 0 2px rgba(0,0,0,0.6)",
        duration: 0.3,
        ease: "power2.out",
      })
      gsap.to(iconsRef.current[index], {
        scale: 1,
        color: "#94a3b8", // blue-gray-400
        duration: 0.3,
        ease: "power2.out",
      })
      gsap.to(titlesRef.current[index], {
        scale: 1,
        color: "#111827", // gray-900
        duration: 0.3,
      })
    }
  }

  // Track data for cleaner rendering
  const trackData = [
    {
      title: "Premium Tshirts",
      description: "Our T-Shirts are 100% made of cotton.",
    },
    {
      title: "Premium Tshirts",
      description: "Our T-Shirts are 100% made of cotton.",
    },
    {
      title: "Premium Tshirts",
      description: "Our T-Shirts are 100% made of cotton.",
    },
  ]

  return (
    <section ref={sectionRef}>
      <div className="container mx-auto px-5 py-10 md:py-14">
        {/* main  */}
        <div className="flex flex-wrap -m-4 text-center">
          {trackData.map((item, index) => (
            <div key={index} className="p-4 md:w-1/3 sm:w-1/2 w-full">
              <div
                ref={(el) => (cardsRef.current[index] = el)}
                className="border-2 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg transition-all duration-300"
                onMouseEnter={() => handleHover(index, true)}
                onMouseLeave={() => handleHover(index, false)}
              >
                <svg
                  ref={(el) => (iconsRef.current[index] = el)}
                  className="text-blue-gray-400 w-12 h-12 mb-3 inline-block transition-all duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>

                <h2
                  ref={(el) => (titlesRef.current[index] = el)}
                  className="title-font font-medium text-lg text-gray-900 transition-all duration-300"
                >
                  {item.title}
                </h2>
                <p ref={(el) => (descriptionsRef.current[index] = el)} className="leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Track

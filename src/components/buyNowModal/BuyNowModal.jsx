"use client"

import { useRef, useEffect, useState } from "react"
import { Button, Dialog, DialogBody } from "@material-tailwind/react"
import gsap from "gsap"

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
  const [open, setOpen] = useState(false)
  const modalRef = useRef(null)
  const formFieldsRef = useRef([])
  const buttonRef = useRef(null)

  // Reset refs array for form fields
  formFieldsRef.current = []

  // Add to refs array function
  const addToRefs = (el) => {
    if (el && !formFieldsRef.current.includes(el)) {
      formFieldsRef.current.push(el)
    }
  }

  // Animation for modal opening
  useEffect(() => {
    if (open && modalRef.current) {
      // Initial state for elements
      gsap.set(modalRef.current, { scale: 0.8, opacity: 0 })
      gsap.set(formFieldsRef.current, { y: 20, opacity: 0 })
      gsap.set(buttonRef.current, { scale: 0.9, opacity: 0 })

      // Create timeline
      const tl = gsap.timeline()
      
      // Animate modal entrance
      tl.to(modalRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.7)"
      })
      
      // Stagger animate form fields
      .to(formFieldsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.2")
      
      // Animate button
      .to(buttonRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power1.out"
      }, "-=0.1")
    }
  }, [open])

  const handleOpen = () => setOpen(!open)

  // Animation for button hover
  const handleButtonHover = (isHovering) => {
    gsap.to(buttonRef.current, {
      scale: isHovering ? 1.03 : 1,
      duration: 0.3,
      ease: "power1.out"
    })
  }

  return (
    <>
      <Button
        type="button"
        onClick={handleOpen}
        className="w-full px-4 py-3 text-center text-gray-100 bg-green-600 border border-transparent dark:border-gray-700 hover:border-green-500 hover:text-green-700 hover:bg-green-100 rounded-xl"
        onMouseEnter={() => handleButtonHover(true)}
        onMouseLeave={() => handleButtonHover(false)}
      >
        Buy now
      </Button>
      <Dialog open={open} handler={handleOpen} className="bg-green-50">
        <DialogBody className="" ref={modalRef}>
          <div className="mb-3" ref={addToRefs}>
            <input
              type="text"
              name="name"
              value={addressInfo.name}
              onChange={(e) => {
                setAddressInfo({
                  ...addressInfo,
                  name: e.target.value
                })
              }}
              placeholder="Enter your name"
              className="bg-green-50 border border-green-200 px-2 py-2 w-full rounded-md outline-none text-green-600 placeholder-green-300"
            />
          </div>
          <div className="mb-3" ref={addToRefs}>
            <input
              type="text"
              name="address"
              value={addressInfo.address}
              onChange={(e) => {
                setAddressInfo({
                  ...addressInfo,
                  address: e.target.value
                })
              }}
              placeholder="Enter your address"
              className="bg-green-50 border border-green-200 px-2 py-2 w-full rounded-md outline-none text-green-600 placeholder-green-300"
            />
          </div>

          <div className="mb-3" ref={addToRefs}>
            <input
              type="number"
              name="pincode"
              value={addressInfo.pincode}
              onChange={(e) => {
                setAddressInfo({
                  ...addressInfo,
                  pincode: e.target.value
                })
              }}
              placeholder="Enter your pincode"
              className="bg-green-50 border border-green-200 px-2 py-2 w-full rounded-md outline-none text-green-600 placeholder-green-300"
            />
          </div>

          <div className="mb-3" ref={addToRefs}>
            <input
              type="text"
              name="mobileNumber"
              value={addressInfo.mobileNumber}
              onChange={(e) => {
                setAddressInfo({
                  ...addressInfo,
                  mobileNumber: e.target.value
                })
              }}
              placeholder="Enter your mobile number"
              className="bg-green-50 border border-green-200 px-2 py-2 w-full rounded-md outline-none text-green-600 placeholder-green-300"
            />
          </div>

          <div className="" ref={buttonRef}>
            <Button
              type="button"
              onClick={() => {
                handleOpen()
                buyNowFunction()
              }}
              className="w-full px-4 py-3 text-center text-gray-100 bg-green-600 border border-transparent dark:border-gray-700 rounded-lg"
            >
              Buy now
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  )
}

export default BuyNowModal

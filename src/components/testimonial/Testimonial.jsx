const Testimonial = () => {


    return (
        <div >
            <section className="text-gray-600 body-font mb-10">
                {/* main  */}
                <div className="container px-5 py-10 mx-auto">
                    {/* Heading  */}
                    <h1 className='text-center text-3xl font-bold text-black'>Testimonial</h1>
                    {/* para  */}
                    <h2 className='text-center text-2xl font-semibold mb-10'>
                        What our <span className='text-blue-gray-400'>customers</span> are saying
                    </h2>

                    <div className="flex flex-wrap -m-4">
                        {/* Testimonial 1 */}
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://i.pravatar.cc/100" />
                                <p className="leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                <span className="inline-block h-1 w-10 rounded bg-blue-gray-400 mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">John Doe</h2>
                                <p className="text-gray-500">Senior Product Designer</p>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://i.pravatar.cc/101" />
                                <p className="leading-relaxed">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
                                <span className="inline-block h-1 w-10 rounded bg-blue-gray-400 mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Jane Smith</h2>
                                <p className="text-gray-500">UX Researcher</p>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="lg:w-1/3 lg:mb-0 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://i.pravatar.cc/102" />
                                <p className="leading-relaxed">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                <span className="inline-block h-1 w-10 rounded bg-blue-gray-400 mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Sam Wilson</h2>
                                <p className="text-gray-500">Web Developer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Testimonial;

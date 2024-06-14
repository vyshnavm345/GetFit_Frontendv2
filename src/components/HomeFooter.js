import React from 'react'


const HomeFooter = () => {
    return (
      <>
        <footer className=" bg-black text-white py-4 ">
          <div className=" mx-2  flex justify-between">
            <div className=" space-y-4  flex-col md:flex-row md:space-x-8 lg:space-x-16">
              <section className="flex-shrink-0">
                <h1 className="text-3xl font-bold">Get-Fit</h1>
              </section>
              <div className="flex flex-col md:flex-row justify-evenly">
                <nav className="flex flex-col ml-2 space-y-4 md:space-y-0">
                  <h3 className="text-lg font-medium">Help & Information</h3>
                  <a
                    href="#"
                    className="mt-2 text-gray-400 hover:text-gray-200"
                  >
                    Supplements
                  </a>
                  <a
                    href="#"
                    className="mt-2 text-gray-400 hover:text-gray-200"
                  >
                    Company
                  </a>
                  <a
                    href="#"
                    className="mt-2 text-gray-400 hover:text-gray-200"
                  >
                    Loyalty & Rewards
                  </a>
                  <a
                    href="#"
                    className="mt-2 text-gray-400 hover:text-gray-200"
                  >
                    Contact Us
                  </a>
                </nav>
                <nav className="flex flex-col ml-2 md:ml-14 space-y-4 md:space-y-0">
                  <h3 className="text-lg font-medium">Track Your Order</h3>
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    Track Your Order
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    Help Center
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    Account Login
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    Returns Policy
                  </a>
                </nav>
                <nav className="flex flex-col ml-2 md:ml-14 space-y-4 md:space-y-0">
                  <h3 className="text-lg font-medium">Join our Newsletter</h3>
                  <p className="text-gray-400 text-sm">
                    Sign up below to receive discounts, newsletters, recipes,
                    tips, and more!
                  </p>
                  <form className="flex items-center">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="m-2 rounded-md border text-black font-bold border-gray-700 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className=" rounded-sm text-sm font-bold px-4 py-2  bg-blue-700 ml-4"
                    >
                      SUBMIT
                    </button>
                  </form>
                </nav>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end mt-4 md:mt-0">
            <p className="text-gray-400 text-sm mr-4">
              © Get-Fit {new Date().getFullYear()}
            </p>
            <a href="#" className="text-gray-400 hover:text-gray-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200 mx-4">
              Terms of Use
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200">
              Accessibility
            </a>
          </div>
        </footer>
      </>
    );
}

export default HomeFooter
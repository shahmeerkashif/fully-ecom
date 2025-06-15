import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import PrintButton from "../../components/printButton/PrintButton";

const UserDashboard = () => {
    // user
    const user = JSON.parse(localStorage.getItem('users'));

    const context = useContext(myContext);
    const { loading, getAllOrder } = context
    // console.log(getAllOrder)

    // console.log(user)
    return (
        <Layout>
            <div className=" container mx-auto px-4 py-5 lg:py-8">
                {/* Top  */}
                <div className="top ">
                    {/* main  */}
                    <div className=" bg-blue-gray-200 py-5 rounded-xl border border-blue-100">
                        {/* image  */}
                        <div className="flex justify-center">
                            <img className=" rounded-full" src="data:image/png;base64,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    " alt="" />
                        </div>
                        {/* text  */}
                        <div className="">
                            {/* Name  */}
                            <h1 className=" text-center text-lg">
                                <span className=" font-bold">Name : </span>
                                {user?.name}
                            </h1>

                            {/* Email  */}
                            <h1 className=" text-center text-lg">
                                <span className=" font-bold">Email : </span>
                                {user?.email}
                            </h1>

                            {/* Date  */}
                            <h1 className=" text-center text-lg">
                                <span className=" font-bold">Date : </span>
                                {user?.date}
                            </h1>

                            {/* Role  */}
                            <h1 className=" text-center text-lg">
                                <span className=" font-bold">Role : </span>
                                {user?.role}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* bottom  */}
                <div className="bottom">
                    {/* main 1 */}
                    <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
                        {/* text  */}
                        <h2 className=" text-2xl lg:text-3xl font-bold">Order Details</h2>

                        <div className="flex justify-center relative top-10">
                        {loading && <Loader/>}
                        </div>

                        {/* main 2 */}
                        {getAllOrder.filter((obj) => obj.userid === user?.uid).map((order, index) => {
                            // console.log(order);
                            return (
                                <div key={index}>
                                    {order.cartItems.map((item, index) => {
                                        // console.log('item', item);
                                        const { id, date, quantity, price, title, productImageUrl, category } = item
                                        // console.log('order', order)
                                        const { status } = order
                                        return (
                                            <div key={index} className="mt-5 flex flex-col overflow-hidden rounded-xl border border-pink-100 md:flex-row">
                                                {/* main 3  */}
                                                <div className="w-full border-r border-blue-100 bg-blue-gray-200 md:max-w-xs">
                                                    {/* left  */}
                                                    <div className="p-8">
                                                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                                                            <div className="mb-4">
                                                                <div className="text-sm font-semibold text-black">Order Id</div>
                                                                <div className="text-sm font-medium text-gray-900">#{id}</div>
                                                            </div>

                                                            <div className="mb-4">
                                                                <div className="text-sm font-semibold">Date</div>
                                                                <div className="text-sm font-medium text-gray-900">{date}</div>
                                                            </div>

                                                            <div className="mb-4">
                                                                <div className="text-sm font-semibold">Total Amount</div>
                                                                <div className="text-sm font-medium text-gray-900">Rs: {price * quantity}</div>
                                                            </div>

                                                            <div className="mb-4">
                                                                <div className="text-sm font-semibold">Order Status</div>
                                                                {status === 'pending' ?
                                                                    <div className="text-sm font-medium text-red-800 first-letter:uppercase">{status}</div>
                                                                    : <div className="text-sm font-medium text-green-800 first-letter:uppercase">{status}</div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* right  */}
                                                <div className="flex-1">
                                                    <div className="p-8">
                                                        <ul className="-my-7 divide-y divide-gray-200">
                                                            <li
                                                                className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
                                                            >
                                                                <div className="flex flex-1 items-stretch">
                                                                    <div className="flex-shrink-0">
                                                                        <img
                                                                            className="h-40 w-40 rounded-lg border border-gray-200 object-contain"
                                                                            src={productImageUrl}
                                                                            alt="img"
                                                                        />
                                                                    </div>

                                                                    <div className="ml-5 flex flex-col justify-between">
                                                                        <div className="flex-1">
                                                                            <p className="text-sm font-bold text-gray-900">{title}</p>
                                                                            <p className="mt-1.5 text-sm font-medium text-gray-500">{category}</p>
                                                                        </div>

                                                                        <p className="mt-4 text-sm font-medium text-gray-500">x {quantity}</p>
                                                                    </div>
                                                                </div>

                                                                <div className="ml-auto flex flex-col items-end justify-between">
                                                                    <p className="text-right text-sm font-bold text-gray-900">Rs: {price}</p>
                                                                </div>

                                                            </li>
                                                        </ul>

                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <br />
                                    <PrintButton/>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserDashboard;
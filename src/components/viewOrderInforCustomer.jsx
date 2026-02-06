import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ViewOrderInfo(props) {
  const order = props.order;
  const [isMODELopen, setIsMODELopen] = useState(false);
  

  return (
    <>
      <Modal
        isOpen={isMODELopen}
        onRequestClose={() => setIsMODELopen(false)}
        overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        className="bg-white max-w-[700px] w-full rounded-2xl outline-none shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="bg-white rounded-2xl p-6 w-full text-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 border-b pb-3">
            Order Details
          </h2>

          {/* Order Info */}
          <div className="space-y-3 mb-4">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-semibold text-accent">
                {order.orderId}
              </span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Customer Name:</span>
              <span className="font-medium">{order.name}</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{order.email}</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">{order.phoneNumber}</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">
                {new Date(order.date).toLocaleDateString()}
              </span>
            </div>

            <div className="flex flex-row justify-between items-center">
              <span className="text-gray-600">Status:</span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent">
                {order.status}
              </span>

              
            </div>

            <div className="flex justify-between py-2 bg-gray-200 flex-col">
              <span className="text-gray-600 text-bold">  Notes (Current) :&nbsp;&nbsp;&nbsp;  {order.Notes || ""}</span>
              <textarea
                className="w-full outline-0 ml-2 bg-transparent"
                
                disabled
              />
            </div>
          </div>

          {/* Items */}
          <div className="mb-4 border-t pt-4">
            <p className="text-gray-600 font-semibold mb-3">
              Order Items:
            </p>

            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg shadow-sm"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity} × LKR{" "}
                      {item.price.toLocaleString()}
                    </p>
                  </div>
                  <p className="font-semibold text-accent">
                    LKR{" "}
                    {(item.quantity * item.price).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Address */}
          {order.address && (
            <div className="mb-4 border-t pt-4">
              <p className="text-gray-600 mb-2">
                Delivery Address:
              </p>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                {order.address}
              </p>
            </div>
          )}

          {/* Total */}
          <div className="flex justify-between items-center border-t pt-4 mb-4">
            <span className="text-lg font-semibold text-gray-600">
              Total:
            </span>
            <span className="text-2xl font-bold text-accent">
              LKR {order.total.toLocaleString()}
            </span>
          </div>

          {/* Buttons */}
          <div className="m-1.5 gap-1">
           

            <button
              onClick={() => setIsMODELopen(false)}
              className="w-full bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      <button
        onClick={() => setIsMODELopen(true)}
        className="bg-accent/70 hover:bg-accent p-2 rounded-2xl text-white cursor-pointer"
      >
        View Order
      </button>
    </>
  );
}

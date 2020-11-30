import React, { useState } from "react";
import { getAllOrders, updateStatus } from "./helper/adminapicall";
import { useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import io from "socket.io-client";
import Main from "../corefile/Main";
import AdminLeftSide from "../user/AdminLeftSide";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [socket, setSocket] = useState(null);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState("");
  const statusarray = [
    "Cancelled",
    "Received",
    "Confrimed",
    "Processing",
    "TakeOff",
    "OntheWay",
    "Reached",
    "Delivered",
  ];
  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const preLoad = () => {
    getAllOrders(userId, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setOrders(data);
      }
    });
  };
  if (socket) {
    socket.on("OrderReceived", ({ value }) => {
      console.log(value);
      setReload(!reload);
    });
  }

  useEffect(() => {
    if (socket === null) {
      const newSocket = io("http://localhost:8000/admin");
      setSocket(newSocket);
    }
    preLoad();
  }, [reload]);

  const statusUpdate = (updateObj, userId, token) => {
    updateStatus(updateObj, userId, token).then((data) => {
      console.log(data);
      socket &&
        socket.emit("statusUpdated", {
          orderId: updateObj.orderId,
        });
      setReload(!reload);
    });
  };
  const manageOrder = () => {
    return (
      <div className="container">
        <h3 className="mb-4 text-left font-weight-bold">All Orders:</h3>
        <div className="row">
          <div className="col-12">
            {orders.map((order, index) => {
              return (
                <div class="card mb-3 productcard py-3 px-5">
                  <div class="row">
                    <div class="col-12 col-md-3 py-2 pt-3">
                      <h5 class="card-title">Address</h5>
                      <p class="card-text text-muted">
                        {order && order.address.name},<br />
                        {order && order.address.line1},<br />
                        {order && order.address.city},
                        {order && order.address.state},<br />
                        {order && order.address.postal_code},
                        {order && order.address.country}
                      </p>
                      <h5 class="card-title pt-3">Cordinates</h5>
                      <p class="card-text text-muted">
                        Latitude: <br />
                        <span style={{ fontWeight: "bold" }}>
                          {order && order.coordinates.lat}
                        </span>
                        <br />
                        Longitude: <br />
                        <span style={{ fontWeight: "bold" }}>
                          {order && order.coordinates.lng}
                        </span>
                      </p>
                    </div>
                    <div class="col-12 col-md-5 py-2 pt-3">
                      <h5 class="card-title ">Products Details</h5>
                      <p
                        class="card-text text-muted"
                        style={{ fontWeight: "bold" }}
                      >
                        <ul class="list-group">
                          {order.products.map((product, index) => {
                            return (
                              <li
                                key={index}
                                class="list-group-item text-muted"
                              >
                                {product.name} <br />
                                <span className="text-danger">
                                  Qty:&nbsp;&nbsp;{product.count}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </p>
                    </div>
                    <div class="col-12 col-md-4 py-2 pt-3">
                      <h5 class="card-title ">Order Details:</h5>
                      <p class="card-text text-muted">
                        Total No of items:&nbsp;
                        <span style={{ fontWeight: "bold" }}>
                          {order.quantity}
                        </span>
                        <br />
                        Total Amount: &nbsp;&nbsp;
                        <span style={{ fontWeight: "bold" }}>
                          {" "}
                          Rs. &nbsp;{order.amount}
                        </span>
                        <br />
                        Order Placed At:&nbsp;&nbsp;
                        <span style={{ fontWeight: "bold" }}>
                          {" "}
                          {new Date(order.createdAt).toLocaleString()}
                        </span>
                      </p>

                      <h5 class="font-weight-bold text-left mt-4">
                        Current Status: <br />
                        <span className="text-success ">
                          {statusarray[order.status.length]}
                        </span>
                      </h5>
                      {order.status && order.status.length <= 6 && (
                        <h5 class="font-weight-bold text-left mt-5">
                          Update Status:
                        </h5>
                      )}

                      {order.status && order.status.length <= 6 && (
                        <button
                          onClick={() => {
                            const updateObj = {
                              orderId: order._id,
                              status: {
                                statusname:
                                  statusarray[order.status.length + 1],
                                updatetime: new Date(),
                                statusno: order.status.length + 1,
                              },
                            };
                            statusUpdate(updateObj, userId, token);
                          }}
                          className="btn btn-success btn-block mt-1"
                        >
                          {order.status && statusarray[order.status.length + 1]}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Main>
      <div className="row w-100 m-0">
        <div className="col-3 p-5">
          <AdminLeftSide />
        </div>
        <div className="col-12 col-md-9 p-5 mt-1">
          <div className="row bg-white rounded">
            {error ? <h4 className="font-weight-bolder">No Orders placed yet</h4> : manageOrder()}
          </div>
        </div>
      </div>
    </Main>
  );
};

export default ManageOrders;

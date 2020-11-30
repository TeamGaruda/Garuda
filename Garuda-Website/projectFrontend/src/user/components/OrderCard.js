import React from "react";
import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  return (
    <>
      <div class="card mb-3 productcard my-5">
        <div className="card-header">
          <h5 className="text-left mx-2">
            {order &&
              order.status &&
              order.status[order.status.length - 1].statusname !==
                "Delivered" && <span className="badge badge-danger mr-3 px-3">LIVE</span>}
            Order Id:&nbsp;&nbsp;
            <span style={{ fontWeight: "bold" }}>{order._id}</span>
          </h5>
        </div>
        <div class="row  py-3 px-5">
          <div class="col-12 col-md-4 p-4">
            <h5 class="font-weight-bold text-left mb-4">
              Order Status: <br />
              <span className="text-success ">
                {order &&
                  order.status &&
                  order.status[order.status.length - 1].statusname}
              </span>
            </h5>
            <Link
              to={`/user/order/${order._id}`}
              className="btn btn-primary btn-block"
            >
              More Details
            </Link>
          </div>
          <div class="col-12 col-md-4 p-4 ">
            <h5 class="card-title ">Order Details:</h5>
            <p class="card-text text-muted">
              Total No of items:&nbsp;
              <span style={{ fontWeight: "bold" }}>{order.quantity}</span>
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
          </div>
          <div class="col-12 col-md-4 p-4">
            <h5 class="card-title ">Cordinates</h5>
            <p class="card-text text-muted">
              Latitude:{" "}
              <span style={{ fontWeight: "bold" }}>
                {order && order.coordinates.lat}
              </span>
              ,
              <br />
              Longitude:{" "}
              <span style={{ fontWeight: "bold" }}>
                {order && order.coordinates.lng}
              </span>
              ,
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCard;

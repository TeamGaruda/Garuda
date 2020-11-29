import React from "react";
import { API } from "../../backend";

export default function ImageHelper({ product,width,height }) {
  const imgUrl = product
    ? `${API}/product/photo/${product._id}`
    : `https://media.giphy.com/media/jAYUbVXgESSti/giphy.gif`;

  return (
    <div className=" border-right p-2">
      <img
        src={imgUrl}
        className="img-fluid"
        alt={`https://media.giphy.com/media/jAYUbVXgESSti/giphy.gif`}
        style={{ width:`${width}`, height: `${height}` }}
      />
    </div>
  );
}

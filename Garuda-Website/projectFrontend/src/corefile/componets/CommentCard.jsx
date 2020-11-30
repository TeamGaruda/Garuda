import React from "react";

const CommentCard = ({ user }) => {
  return (
    <div className="card" id="comment">
      <img src={user.image} alt="user images" className="img-icon" />
      <div className="card-body">
        <h5 className="card-title">{user.name}</h5>
        <h6 className="card-subtitle mb-2 px-2" style={{ color: "#ffbf00" }}>
          {user.star.map((n) => {
            return(<i className="fas fa-star fa-lg px-1"></i>);
          })}
        </h6>
        <p className="card-text">
         Eagerly waiting to be reviwed by our valuable user
        </p>
      </div>
    </div>
  );
};
export default CommentCard;

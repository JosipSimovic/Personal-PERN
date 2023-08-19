import React from "react";
import UserItem from "./UserItem";

const UsersList = (props) => {
  return (
    <div className="all-products-div">
      <ul>
        {props.users.map((item) => {
          return <UserItem key={item.id} item={item} />;
        })}
      </ul>
    </div>
  );
};

export default UsersList;

import React from "react";
import Card from "../../../shared/components/UI/Card";

import "./UserItem.css";

const UserItem = (props) => {
  const item = props.item;

  return (
    <li>
      <Card>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-8">
              <h3>{item.username}</h3>
              <p>{item.email}</p>
            </div>
            {item.admin_id !== null && (
              <div className="col-4 text-end">
                <div>
                  <span className="admin-check">
                    Admin{" "}
                    <i
                      className="fa-solid fa-circle-check"
                      style={{ color: "#39b329" }}
                    ></i>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </li>
  );
};

export default UserItem;

import React from "react";

const Notification = (props) => {
    const {noti} = props;
  return <div className="p-2 text-center italic">{noti}</div>;
};

export default Notification;

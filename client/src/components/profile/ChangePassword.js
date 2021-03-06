import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePassword } from "../../redux/actions/authAction";


const ChangePassword = ({ setChangePassword }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cnfNewPassword, setCnfNewPassword] = useState("");
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();




  const handleSubmit = e => {
    e.preventDefault();
    dispatch(changePassword( {oldPassword, newPassword, cnfNewPassword, auth} ) );
  };

  return (
      <div className="edit_profile">
        <button
            className="btn btn-danger btn_close"
            onClick={() => setChangePassword(false)}
        >
          Close
        </button>

        <form onSubmit={handleSubmit}>


          <div className="form_group">
            <label htmlFor="oldPassword">Old password</label>

            <input
                type="password"
                className="form-control"
                id="oldPassword"
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>


          <div className="form_group">
            <label htmlFor="newPassword">New password</label>

            <input
                type="password"
                className="form-control"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>


          <div className="form_group">
            <label htmlFor="cnfNewPassword">Confirm new password</label>

            <input
                type="password"
                className="form-control"
                id="cnfNewPassword"
                name="cnfNewPassword"
                value={cnfNewPassword}
                onChange={(e) => setCnfNewPassword(e.target.value)}
            />
          </div>


          <button className="btn btn-info w-100" type="submit">
            Update
          </button>
        </form>
      </div>
  );
};

export default ChangePassword;

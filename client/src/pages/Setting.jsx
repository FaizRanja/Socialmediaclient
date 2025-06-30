import React, { Fragment, useState } from "react";
import "../Components/Css/setting.Css";

const Setting = () => {
  const [oldpassword, setoldpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [visble, setvisble] = useState(false);

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldpassword);
    myForm.set("newPassword", newpassword);
    myForm.set("confirmPassword", confirmpassword);
    console.log(myForm);
  };

  const handletoggle = () => {
    setvisble(!visble);
  };
  let loading = false;

  return (
    <Fragment>
      {loading ? (
        <div>loading .....</div>
      ) : (
        <Fragment>
          <div className="updatePasswordContainer">
          <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading" > Update Password </h2>
            <form className="updatePasswordForm" onSubmit={updatePasswordSubmit}>
            
                <div className="loginpassword">
                  <input
                    type={visble ? "text" : "password"}
                    placeholder="  old password"
                    value={oldpassword}
                    onChange={(e) => setoldpassword(e.target.value)}
                  />
                  {visble ? (
                    <div onClick={handletoggle}>g</div>
                  ) : (
                    <div onClick={handletoggle}>f</div>
                  )}
                </div>
                <div className="loginpassword">
                  <input
                type={visble ? "text" : "password"}
                    placeholder=" new password"
                    value={newpassword}
                    onChange={(e) => setnewpassword(e.target.value)}
                  />
                  {visble ? (
                    <div onClick={handletoggle}>g</div>
                  ) : (
                    <div onClick={handletoggle}>f</div>
                  )}
                </div>
                <div className="loginpassword">
                  <input
                    type={visble ? "text" : "password"}
                    placeholder=" confirm password"
                    value={confirmpassword}
                    onChange={(e) => setconfirmpassword(e.target.value)}
                  />
                  {visble ? (
                    <div onClick={handletoggle}>g</div>
                  ) : (
                    <div onClick={handletoggle}>f</div>
                  )}
                </div>
              
            </form>
          </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Setting;

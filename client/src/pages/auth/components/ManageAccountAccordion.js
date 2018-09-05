import React from "react";

// utils
import isEmail from "../../../utils/validation/isEmail";

const ManageAccountAccordion = ({ email, resendEmail, resetPassword }) => {
  return (
    <div className="row">
      <div className="col-12 mt-4">
        <div id="accordion">
          <div className="card">
            <div className="card-header text-center" id="headingOne">
              <h5 className="mb-0">
                <button
                  className="btn btn-outline-dark btn-block"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Mangage Your Account
                </button>
              </h5>
            </div>

            <div
              id="collapseOne"
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div className="card-body">
                <small className="form-text text-muted mb-1">
                  * Fill in your email in the input shown above and click either
                  button to get started.
                </small>
                <small className="form-text text-muted mb-1">
                  * If you do not recieve the email first check your spam
                  folder.
                </small>
                <small className="form-text text-muted mb-3">
                  * Add <b>jlab.development.coding@gmail.com</b> to your
                  contacts if you still have not revieved the email.
                </small>
                <button
                  className="btn btn-outline-dark btn-sm btn-block"
                  onClick={resendEmail}
                  disabled={isEmail(email) ? false : true}
                >
                  Resend verification Email
                </button>
                <button
                  className="btn btn-outline-dark btn-sm btn-block"
                  disabled={isEmail(email) ? false : true}
                  onClick={() => resetPassword(email)}
                >
                  Reset your Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAccountAccordion;

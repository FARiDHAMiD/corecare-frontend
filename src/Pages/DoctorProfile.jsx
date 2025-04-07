import { useContext, useEffect, useState } from "react";
import AxiosInstance from "../utils/AxiosInstance";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import PatientsAppointments from "../Components/PatientsAppointments";

const DoctorProfile = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { id } = useParams();
  const [doctor, setDoctor] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDoctor = async () => {
    const response = await AxiosInstance.get(`doctors/${id}/`);
    setDoctor(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getDoctor();
  }, [id]);

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src={doctor.image}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: 150 }}
                />
                <h5 className="my-3">
                  {doctor.first_name} {doctor.last_name}
                </h5>
                <p className="text-muted mb-4">{doctor.title}</p>
                <div className="d-flex justify-content-center mb-2">
                  {user &&
                  user.role == "DOCTOR" &&
                  user.profile_id == doctor.id ? (
                    <>
                      <button
                        className="btn btn-outline-dark"
                        onClick={logoutUser}
                      >
                        Logout
                      </button>
                      <button
                        className="btn btn-outline-primary ms-1"
                        type="button"
                        data-bs-target="#editProfileModal"
                        data-bs-toggle="modal"
                      >
                        Edit Profile
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        data-mdb-button-init=""
                        data-mdb-ripple-init=""
                        className="btn btn-primary"
                      >
                        Appoinemnt
                      </button>
                      <button
                        type="button"
                        data-mdb-button-init=""
                        data-mdb-ripple-init=""
                        className="btn btn-outline-primary ms-1"
                      >
                        Message
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">
                      {doctor.first_name} {doctor.last_name}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{doctor.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Bio</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{doctor.bio}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Mobile</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{doctor.phone}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{doctor.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            {/* Reviews & Social Links */}
            <div className="card mb-4 mb-lg-0">
              <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3">
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fas fa-star fa-lg text-warning" />
                    <p className="mb-0">4.9 (220 Reviews)</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fa fa-users fa-lg text-body" />
                    <p className="mb-0">360 Patient</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i
                      className="fab fa-twitter fa-lg"
                      style={{ color: "#55acee" }}
                    />
                    <p className="mb-0">
                      <a target="_blank" href="https://www.x.com/">
                        https://www.x.com/
                      </a>
                    </p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i
                      className="fab fa-instagram fa-lg"
                      style={{ color: "#ac2bac" }}
                    />
                    <p className="mb-0">
                      <a target="_blank" href="https://www.instagram.com/">
                        https://www.instagram.com/
                      </a>
                    </p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i
                      className="fab fa-facebook-f fa-lg"
                      style={{ color: "#3b5998" }}
                    />
                    <p className="mb-0">
                      <a target="_blank" href="https://www.facebook.com/">
                        https://www.facebook.com/
                      </a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            {/* Doctor Personal Appointments  */}
            {user && user.role == "DOCTOR" && user.profile_id == doctor.id && (
              <>
                {/* Appointments  */}
                <h4 className="text-center">Appointments</h4>
                <div className="row my-2">
                  <div className="col-12">
                    <PatientsAppointments />
                  </div>
                </div>
              </>
            )}

            {/* Current Logged in pateint Appoinemnts */}
            {user && user.role == "PATIENT" && (
              <>
                {/* Appointments  */}
                <h4 className="text-center">
                  Your Appoinments With {doctor.first_name} {doctor.last_name}
                </h4>
                <div className="row my-2">
                  <div className="col-12">
                    <PatientsAppointments />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <>
        {/* Edit Profile Modal */}
        <div
          className="modal fade"
          id="editProfileModal"
          tabIndex={-1}
          aria-labelledby="editProfileModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editProfileModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">...</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </section>
  );
};

export default DoctorProfile;

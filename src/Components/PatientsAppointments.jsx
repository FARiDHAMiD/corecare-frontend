import { useContext, useEffect, useState } from "react";
import AxiosInstance from "../utils/AxiosInstance";
import Spinner from "./Spinner";
import AuthContext from "../Context/AuthContext";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaEye } from "react-icons/fa6";

const PatientsAppointments = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctor, setDoctor] = useState(null);

  const [questions, setQuestions] = useState([]);

  const [responses, setResponses] = useState({});

  const location = useLocation();
  const isDoctorPage = location.pathname.startsWith("/doctor/");

  const getAppointments = async () => {
    let response = await AxiosInstance.get(`appointments/`);
    setAppointments(response.data);
    setLoading(false);
  };

  const getQuestions = async () => {
    let response = await AxiosInstance.get(`previsitquestions/`);
    setQuestions(response.data);
  };

  const { id: doctorIdFromUrl } = useParams();
  const getDoctor = async () => {
    const res = await AxiosInstance.get(`doctors/${doctorIdFromUrl}/`);
    setDoctor(res.data);
  };

  const fetchResponses = async (appointmentId) => {
    try {
      const res = await AxiosInstance.get(`previsitreports/${appointmentId}/`);
      setResponses((prev) => ({
        ...prev,
        [appointmentId]: res.data.responses, // store using appointmentId as key
      }));
    } catch (error) {
      console.error("Failed to load responses", error);
      setResponses((prev) => ({
        ...prev,
        [appointmentId]: null,
      }));
    }
  };

  useEffect(() => {
    getAppointments();
    getDoctor();
    getQuestions();
  }, [doctorIdFromUrl]);

  return (
    <div className="card mb-4 mb-md-0">
      <div className="card-body">
        {loading ? (
          <Spinner />
        ) : (
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                {user.role !== "PATIENT" && <th>Patient</th>}
                {user.role !== "DOCTOR" && <th>Doctor</th>}
                <th scope="col">Department</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isDoctorPage
                ? appointments.map((appointment, index) =>
                    doctor && appointment.doctor_id == doctor.id ? (
                      <tr key={appointment.id}>
                        <th scope="row">{index + 1}</th>
                        {user.role !== "PATIENT" && (
                          <td>{appointment.patient_name}</td>
                        )}
                        {user.role !== "DOCTOR" && (
                          <td>{appointment.doctor_name}</td>
                        )}
                        <td>{appointment.department}</td>
                        <td>{new Date(appointment.time).toLocaleString()}</td>
                        <td>{appointment.status}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            data-bs-toggle="modal"
                            data-bs-target={`#responsesModal${appointment.id}`}
                            onClick={() => fetchResponses(appointment.id)}
                          >
                            <FaEye className="text-primary" />
                          </button>

                          {/* Responses Modal  */}
                          <div
                            className="modal fade"
                            id={`responsesModal${appointment.id}`}
                            tabIndex={-1}
                            aria-labelledby="responsesModalLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog modal-lg">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="responsesModalLabel"
                                  >
                                    Patient Responses
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  />
                                </div>

                                <div className="modal-body">
                                  {responses[appointment.id] ? (
                                    <ul className="list-group">
                                      {Object.entries(
                                        responses[appointment.id]
                                      ).map(([questionId, answer]) => {
                                        const question = questions.find(
                                          (q) => q.id === parseInt(questionId)
                                        );
                                        return (
                                          <li
                                            className="list-group-item"
                                            key={questionId}
                                          >
                                            <strong>
                                              {question?.question_text ||
                                                `Q${questionId}`}
                                              :
                                            </strong>{" "}
                                            <span className="text-danger">
                                              {answer}
                                            </span>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  ) : (
                                    <p className="text-muted">
                                      No responses found for this appointment.
                                    </p>
                                  )}
                                </div>

                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <></>
                    )
                  )
                : appointments.map((appointment, index) => (
                    <tr key={appointment.id}>
                      <th scope="row">{index + 1}</th>
                      {user.role !== "PATIENT" && (
                        <td>{appointment.patient_name}</td>
                      )}
                      {user.role !== "DOCTOR" && (
                        <td>
                          <Link to={`/doctor/${appointment.doctor_id}`}>
                            {appointment.doctor_name}
                          </Link>
                        </td>
                      )}
                      <td>{appointment.department}</td>
                      <td>{new Date(appointment.time).toLocaleString()}</td>
                      <td>{appointment.status}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          data-bs-toggle="modal"
                          data-bs-target={`#responsesModal${appointment.id}`}
                          onClick={() => fetchResponses(appointment.id)}
                        >
                          <FaEye className="text-primary" />
                        </button>

                        {/* Responses Modal  */}
                        <div
                          className="modal fade"
                          id={`responsesModal${appointment.id}`}
                          tabIndex={-1}
                          aria-labelledby="responsesModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="responsesModalLabel"
                                >
                                  Patient Responses
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                />
                              </div>

                              <div className="modal-body">
                                {responses[appointment.id] ? (
                                  <ul className="list-group">
                                    {Object.entries(
                                      responses[appointment.id]
                                    ).map(([questionId, answer]) => {
                                      const question = questions.find(
                                        (q) => q.id === parseInt(questionId)
                                      );
                                      return (
                                        <li
                                          className="list-group-item"
                                          key={questionId}
                                        >
                                          <strong>
                                            {question?.question_text ||
                                              `Q${questionId}`}
                                            :
                                          </strong>{" "}
                                          <span className="text-danger">
                                            {answer}
                                          </span>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                ) : (
                                  <p className="text-muted">
                                    No responses found for this appointment.
                                  </p>
                                )}
                              </div>

                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PatientsAppointments;

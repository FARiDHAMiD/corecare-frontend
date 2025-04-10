import { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import AxiosInstance from "../utils/AxiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Appointment = () => {
  let { user } = useContext(AuthContext);
  let { id } = useParams();
  const navigate = useNavigate();

  let [profile, setProfile] = useState([]);
  let [doctros, setDoctros] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [doctor, setDoctor] = useState();
  const [answers, setAnswers] = useState({});

  let [loading, setLoading] = useState(true);

  const getQuestions = async () => {
    let response = await AxiosInstance.get(`previsitquestions/`);
    setQuestions(response.data);
  };

  const defaultValues = {
    patient: user,
    doctor: "",
    time: "",
    status: "pending",
    description: "",
  };

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: defaultValues });

  let getProfile = async () => {
    let response = await AxiosInstance.get(`patients/${id}/`);
    console.log(response.data);
    setProfile(response.data);
  };

  let getDoctors = async () => {
    let response = await AxiosInstance.get("doctors/");
    setDoctros(response.data);
  };

  useEffect(() => {
    getProfile();
    getDoctors();
    getQuestions();
  }, [doctor]);

  const submit = async (data) => {
    const appoinemntData = {
      patient: user.user_id,
      doctor: data.doctor,
      description: data.description,
      time: data.time,
      status: "pending",
    };

    try {
      const res = await AxiosInstance.post(`appointments/`, appoinemntData);
      if (res.status === 201 || res.status === 200) {
        const appointmentId = res.data.id;

        // 2. Submit PreVisitReport
        const reportData = {
          appointment: appointmentId,
          responses: answers,
        };

        await AxiosInstance.post(`previsitreports/`, reportData);

        toast.success("Appointment and pre-visit answers submitted!");
        navigate(-1);
      } else {
        toast.error("Failed to add appointment!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Occured While Requesting Appointment");
    }
  };

  return (
    <>
      {/* Appointment Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <p className="d-inline-block border rounded-pill py-1 px-4">
                Appointment
              </p>
              <h1 className="mb-4">Make An Appointment To Visit Our Doctor</h1>
              <p className="mb-4">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </p>
              <div className="bg-light rounded d-flex align-items-center p-5 mb-4">
                <div
                  className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white"
                  style={{ width: 55, height: 55 }}
                >
                  <i className="fa fa-phone-alt text-primary" />
                </div>
                <div className="ms-4">
                  <p className="mb-2">Call Us Now</p>
                  <h5 className="mb-0">+012 345 6789</h5>
                </div>
              </div>
              <div className="bg-light rounded d-flex align-items-center p-5">
                <div
                  className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white"
                  style={{ width: 55, height: 55 }}
                >
                  <i className="fa fa-envelope-open text-primary" />
                </div>
                <div className="ms-4">
                  <p className="mb-2">Mail Us Now</p>
                  <h5 className="mb-0">info@example.com</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="bg-light rounded h-100 d-flex align-items-center p-5">
                <form>
                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <h5 className="text-info">
                        {profile.user && profile.user.first_name}{" "}
                        {profile.user && profile.user.last_name}
                      </h5>
                    </div>
                    <div className="col-12 col-sm-6">
                      <h5 className="text-info">
                        {profile.user && profile.user.phone}
                      </h5>
                    </div>

                    <div className="col-12 col-sm-12">
                      <select
                        className="form-select border-0"
                        style={{ height: 55 }}
                        {...register("doctor", { required: true })}
                        onChange={(e) => {
                          const selectedDoctor = doctros.find(
                            (doc) => doc.user.id === parseInt(e.target.value)
                          );
                          setDoctor(selectedDoctor);
                          setValue("doctor", e.target.value); // Still update the doctor field for submission
                        }}
                      >
                        <option defaultValue="">Choose Doctor</option>
                        {doctros.map((doc) => (
                          <option key={doc.id} value={doc.user.id}>
                            {doc.user.first_name} {doc.user.last_name} |{" "}
                            {doc.department}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12 col-sm-12">
                      <div
                        className="date"
                        id="date"
                        data-target-input="nearest"
                      >
                        <input
                          type="datetime-local"
                          className="form-control"
                          placeholder="Choose Date"
                          style={{ height: 55 }}
                          {...register("time", {
                            required: true,
                            validate: (value) => {
                              const selected = new Date(value);
                              const now = new Date();
                              return (
                                selected > now ||
                                "Please select a future date/time"
                              );
                            },
                          })}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <textarea
                        className="form-control border-0"
                        rows={5}
                        placeholder="Describe your problem"
                        defaultValue={""}
                        {...register("description", { required: true })}
                      />
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 py-3"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#questionsModal"
                      >
                        Proceed to Book Appointment
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Appointment End */}

      {/* Questions Modal  */}
      <div
        className="modal fade"
        id="questionsModal"
        tabIndex={-1}
        aria-labelledby="questionsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="questionsModalLabel">
                Please Answer Pre-visit questions...
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <form>
              <div className="modal-body">
                {questions
                  .filter((q) => doctor && doctor.dept === q.department)
                  .map((q) => (
                    <div key={q.id} className="mb-3">
                      <label className="form-label">{q.question_text}</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          setAnswers((prev) => ({
                            ...prev,
                            [q.id]: e.target.value,
                          }))
                        }
                      />
                    </div>
                  ))}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSubmit(submit)}
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Submit Appointment Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointment;

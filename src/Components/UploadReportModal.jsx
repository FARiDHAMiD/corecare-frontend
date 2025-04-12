import { useState, useEffect, useContext } from "react";
import AxiosInstance from "../utils/AxiosInstance";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";

const UploadReportModal = ({ patientId }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [reportTypes, setReportTypes] = useState([]);
  const [patientReports, setPatientReports] = useState([]);

  const getPatientReports = async () => {
    let response = await AxiosInstance.get(
      `labreports/patient/${user.profile_id}/`
    );
    setPatientReports(response.data);
  };

  // Form default values
  const defaultValues = {
    report: null, // file input for report
    report_type: "", // selected report type
  };

  // react-hook-form hooks
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  // Fetch report types from the API
  const fetchReportTypes = async () => {
    try {
      const res = await AxiosInstance.get("/reporttypes/");
      setReportTypes(res.data);
    } catch (error) {
      toast.error("Failed to fetch report types.");
    }
  };

  // Fetch report types on component mount
  useEffect(() => {
    fetchReportTypes();
    getPatientReports();
  }, [patientReports]);

  // Handle form submission to upload the report
  const uploadReport = async (data) => {
    const formData = new FormData();
    formData.append("report", data.report[0]); // Assuming single file upload
    formData.append("report_type", data.report_type);
    formData.append("patient", user.profile_id);

    setLoading(true);

    try {
      const res = await AxiosInstance.post(
        `/patients/${user.profile_id}/lab-reports/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 201 || res.status === 200) {
        toast.success("Lab report uploaded successfully!");
      } else {
        toast.error("Failed to upload lab report.");
      }
    } catch (error) {
      toast.error("Error occurred while uploading report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="uploadReportModal"
      tabIndex={-1}
      aria-labelledby="uploadReportModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="uploadReportModalLabel">
              Upload Your Lab Report
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <form onSubmit={handleSubmit(uploadReport)}>
            <div className="modal-body">
              {/* Loop over previously uploaded reports here */}
              <div>
                <h6>Your Previous Reports:</h6>
                {/* Render previous reports if available */}
                {/* Example: */}
                {patientReports.map((report) => (
                  <div key={report.id}>
                    <a
                      target="_blank"
                      href={`http://localhost:8000${report.report}`}
                    >
                      {report.report}
                    </a>{" "}
                    - {new Date(report.uploaded_at).toLocaleString()}
                    <hr />
                  </div>
                ))}
              </div>

              {/* New Report Upload */}
              <div className="mb-3">
                <h6 className="text-success">Upload New Report (One by one)</h6>
                <label htmlFor="report_type" className="form-label">
                  Report Type
                </label>
                <select
                  id="report_type"
                  className="form-select"
                  {...register("report_type", { required: true })}
                >
                  <option value="">Select Report Type</option>
                  {reportTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
                {errors.report_type && (
                  <p className="text-danger">Report type is required</p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="report" className="form-label">
                  Upload Lab Report
                </label>
                <input
                  type="file"
                  id="report"
                  className="form-control"
                  {...register("report", { required: true })}
                />
                {errors.report && (
                  <p className="text-danger">File is required</p>
                )}
              </div>
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
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload Report"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadReportModal;

import { useEffect, useState } from "react";
import WorkingOnIt from "../StatusCodes/WorkingOnIt";
import AxiosInstance from "../utils/AxiosInstance";
import Spinner from "../Components/Spinner";
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const getEvents = async () => {
    let response = await AxiosInstance.get(`events/`);
    setEvents(response.data);
    setLoading(false);
  };
  useEffect(() => {
    getEvents();
  }, []);
  return (
    <>
      <div className="text-center mx-auto py-4">
        <h1 className="fw-light">Events</h1>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {events.map((item) => (
              <div key={item.id} className="col">
                <div className="card shadow-sm">
                  <img src={item.thumbnail} alt="thumbnail" />
                  <div className="card-body">
                    <p className="card-text">{item.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <Link
                          to={`/event/${item.id}`}
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          View
                        </Link>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Edit
                        </button>
                      </div>
                      <small className="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Events;

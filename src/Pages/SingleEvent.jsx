import { useEffect, useState } from "react";
import AxiosInstance from "../utils/AxiosInstance";
import { useParams } from "react-router-dom";
import Spinner from "../Components/Spinner";

const SingleEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getEvent = async () => {
    let response = await AxiosInstance.get(`events/${id}/`);
    setEvent(response.data);
    setLoading(false);
  };

  const eventPhotos = async () => {
    let response = await AxiosInstance.get(`/event_photos/${id}`);
    setPhotos(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getEvent();
    eventPhotos();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-center my-2 text-success">{event.title}</h1>
          <div className="d-flex justify-content-center">
            <div className="container">
              <div className="card shadow-sm my-2">
                <div className="card-body">
                  <p className="card-text">{event.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">9 mins</small>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="container row">
                  {photos.map((photo) => (
                    <>
                      <div key={photo.id} className="card col-md-4 col-lg-4">
                        <img
                          src={photo.image}
                          alt="image"
                          height={250}
                          width={400}
                        />
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SingleEvent;

import { useState, useEffect } from "react"
import config from "./config"
import { toast } from 'react-toastify';
const { API_URL } = config

// this is the costum hook that will have the app logic
export default (inView) => {

  // local state management
  const [isReady, setReady] = useState(false);
  const [allAircrafts, setAircrafts] = useState();
  const [allFlights, setFlights] = useState();
  const [selectedFlights, setSelectedFlights] = useState([]);
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 25
  })

  //General fetch body
  const caller = async (url) => {
    return fetch(url)
      .then(response => response.json())
      .then(data => data.data);
  }

  //on mount call necessary data
  useEffect(() => {
    (async () => {
      try {
        const aircrafts = await caller(`${API_URL}/aircrafts`);
        const flights = await caller(`${API_URL}/flights?offset=${pagination.offset}&limit=${pagination.limit}`);
        setAircrafts(aircrafts)
        setFlights(flights)
        setReady(true)
      } catch (err) {
        notify(err)
      }
    })()
  }, []);

  //intersection observer for flights lazy loading
  useEffect(() => {
    (async () => {
      if (inView) {
        const res = await caller(`${API_URL}/flights?offset=${pagination.offset + 25}`);
        setFlights([...allFlights, ...res])
        setPagination({
          ...pagination,
          offset: pagination.offset + 25,
        })
      }
    })()
  }, [inView]);

  // user feedback toast
  const notify = (str) => {
    toast(str, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })
  }

  const removeSelected = (id) => {
    setSelectedFlights(selectedFlights.filter((f) => {
      return f.id !== id
    }))
  }

  const selectFlight = (newValue) => {
    // this will trigger the logic for the rotation column 
    const uniq = [...selectedFlights, newValue]
    const TOTAL_SECS = 86400; // 24h 
    const MINIMUM_INTERVAL = 1200; // 20min

    // check if 20 min turnaround is respected 
    // no flights after 00h
    // make sure destination is same as origin
    if (uniq.length > 1) {
      const x = uniq.reduce((acc, currFlight, idx) => {
        if (uniq[idx - 1].arrivaltime > currFlight.departuretime + MINIMUM_INTERVAL) {
          notify("Turnaround time not respected")
          return false
        } if (uniq[idx - 1].destination !== currFlight.origin) {
          notify("No teleportation allowed")
          return false
        } if (currFlight.departuretime > TOTAL_SECS) {
          notify("No flights after 00h")
          return false
        }
        return true
      })
      if (x) {
        setSelectedFlights([...new Set(uniq)])
      }
    } else {
      setSelectedFlights([...new Set(uniq)])
    }
  }

  return {
    isReady,
    allAircrafts,
    allFlights,
    selectedFlights,
    selectFlight,
    removeSelected
  }
}

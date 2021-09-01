import useAppContainer from "./useAppContainer"
import {
  Container,
  Row,
  MasterRow,
  Card,
  Icon,
  H3,
  H2,
  P,
  AvailabilityView,
  RemoveIcon
} from "./styledComponents/AppComponents"
import { useInView } from 'react-intersection-observer'
import config from "./config"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [ref, inView] = useInView({ threshold: 0 })
  const { isReady, allAircrafts, allFlights, selectedFlights, selectFlight, removeSelected } = useAppContainer(inView);
  if (isReady) {
    return (
      <>
        <ToastContainer />
        <Container justify="center">
          <MasterRow wdth="31%" textAlign="center">
            <H2>Aircrafts</H2>
            {allAircrafts.length && allAircrafts.map(craft => {
              return (
                <Card isSelected={true}>
                  <H3>Aircraft: {craft.ident}</H3>
                  <Container>
                    <Row wdth="50%">
                      <Icon>&#9992;</Icon>
                      <P>{craft.type}</P>
                    </Row>
                    <Row wdth="50%">
                      <Icon>&#x263B;</Icon>
                      <P>{craft.economySeats}</P>
                    </Row>
                  </Container>
                </Card>
              )
            })
            }
          </MasterRow>
          <MasterRow wdth="31%">
            <H2>Rotations</H2>
            {selectedFlights.length ? selectedFlights.map((flight, idx) => {
              return (
                <Card key={idx}>
                  <RemoveIcon onClick={() => removeSelected(flight.id)}>&#10006;</RemoveIcon>
                  <H3>Flight: {flight.id}</H3>
                  <Container>
                    <Row wdth="50%">
                      <P>{flight.origin}</P>
                      <P>{flight.readable_departure}</P>
                    </Row>
                    <Row wdth="50%">
                      <P>{flight.destination}</P>
                      <P>{flight.readable_arrival}</P>
                    </Row>
                  </Container>
                </Card>
              )
            }) : null}
          </MasterRow>
          <MasterRow wdth="31%" inView={inView}>
            <H2>Flights</H2>
            {allFlights.length && allFlights.map(flight => {
              return (
                <Card key={flight.id} isSelected={!!selectedFlights.find((f) => f.id === flight.id)} onClick={() => selectFlight(flight)}>
                  <H3>Flight: {flight.id}</H3>
                  <Container>
                    <Row wdth="50%">
                      <P>{flight.origin}</P>
                      <P>{flight.readable_departure}</P>
                    </Row>
                    <Row wdth="50%">
                      <P>{flight.destination}</P>
                      <P>{flight.readable_arrival}</P>
                    </Row>
                  </Container>
                </Card>
              )
            })}
            <div ref={ref} />
          </MasterRow>
        </Container>
        <Container>
          <AvailabilityView />
        </Container>
      </>
    );
  }
  return null
}

export default App;

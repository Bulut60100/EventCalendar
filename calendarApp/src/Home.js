import React from 'react';
import { CalendarGrid } from './components/calendar/CalendarGrid';
import { Title } from './components/calendar/Title';
import { Monitor } from './components/calendar/Monitor';
import Navbar from './layouts/Navbar';
import moment from 'moment';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

const ShadowWrapper = styled('div')`
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 2px solid #464648;
  border-radius: 8px;
  overflow:hidden;
  box-shadow: 0 0 0 1px #1A1A1A, 0 8px 20px 6px #888;
  margin: 15px 15px 15px 15px;
`;

const FormPositionWrapper = styled('div')`
  position: absolute;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.35);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled(ShadowWrapper)`
  width: 200px;
  //height: 300px;
  background-color: #1E1F21;
  color: #DDDDDD;
  box-shadow:unset;
`;

const EventTitle = styled('input')`
  padding: 4px 14px;
  font-size: .85rem;
  width: 100%;
  border: unset;
  background-color: #1E1F21;
  color: #DDDDDD;
  outline: unset;
  border-bottom: 1px solid #464648;
`;

const EventBody = styled('input')`
  padding: 4px 14px;
  font-size: .85rem;
  width: 100%;
  border: unset;
  background-color: #1E1F21;
  color: #DDDDDD;
  outline: unset;
  border-bottom: 1px solid #464648;
`;

const ButtonsWrapper = styled('div')`
  padding: 8px 14px;
  display: flex;
  justify-content: flex-end;
`;


export default function Home() {

  const defaultEvent = {
    title: '',
    description: '',
    date: moment().format('X'),
    userid: localStorage.getItem('auth_id')
  }

  moment.updateLocale('tr', { week: { dow: 1 } });
  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf('month').startOf('week');

  const prevHandler = () => setToday(prev => prev.clone().subtract(1, 'month'));
  const todayHandler = () => setToday(moment());
  const nextHandler = () => setToday(prev => prev.clone().add(1, 'month'));

  const [eventList, setEventList] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8001/api/events')
      .then(response => response.json())
      .then(data => {
        setEventList(data.events);

      });
  }, [today]);

  const [isShowForm, setShowForm] = useState(false);
  const [event, setEvent] = useState(null);
  const [method, setMethod] = useState(null)

  const openFormHandler = (methodName, eventForUpdate) => {
    console.log('click', methodName);
    setShowForm(true);
    setEvent(eventForUpdate || defaultEvent);
    setMethod(methodName);
  }

  const cancelButton = () => {
    setShowForm(false);
    setEvent(null);
  }

  const changeEventHandler = (text, field) => {
    setEvent(prevState => ({
      ...prevState,
      [field]: text
    }))
  }

  const url = "http://localhost:8001/api";
  const eventFetchHandler = () => {
    const fetchUrl = method === 'update' ? `${url}/event/${event.id}` : `${url}/event`;
    const httpMethod = method === 'update' ? 'PUT' : 'POST';

    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if(method === 'update') {
          setEventList(prevState => prevState.map(eventEl => eventEl.id === res.id ? res : eventEl))
        } else {
          setEventList(prevState => [...prevState, res]);
        }
        cancelButton();
      })
  }
  
  const deleteEvent = () => {
    fetch(`${url}/event/${event.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      cancelButton();
    })

  }

  return (
    <>
      {
        isShowForm ? (
          <FormPositionWrapper onClick={cancelButton}>
            <FormWrapper onClick={e => e.stopPropagation()}>
              <EventTitle value={event.title} onChange={e => changeEventHandler(e.target.value, 'title')} />
              <EventBody value={event.description} onChange={e => changeEventHandler(e.target.value, 'description')} />
              <ButtonsWrapper>
                <button onClick={cancelButton}>cancel</button>
                <button onClick={eventFetchHandler}>{method}</button>
                <button onClick={deleteEvent}>Delete</button>
              </ButtonsWrapper>
            </FormWrapper>
          </FormPositionWrapper>
        ) : null
      }
      <Navbar />
      <ShadowWrapper>
        <Title />
        <Monitor
          today={today}
          prevHandler={prevHandler}
          todayHandler={todayHandler}
          nextHandler={nextHandler}
        />
        <CalendarGrid startDay={startDay} today={today} eventList={eventList} openFormHandler={openFormHandler} />
      </ShadowWrapper>
    </>
  )
}

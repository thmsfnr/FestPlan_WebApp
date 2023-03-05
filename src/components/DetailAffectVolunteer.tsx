
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';

import { getVolunteerAssignment, createVolunteerAssignment, deleteVolunteerAssignment } from "../services/volunteer_assignment.service";
import { getVolunteer } from "../services/volunteer.service";
import { getSlot, createSlot, deleteSlot } from "../services/slot.service";

import Paper from '@mui/material/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  WeekView,
  DayView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  EditRecurrenceMenu,
  AllDayPanel,
  ConfirmationDialog,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';


const PREFIX = 'Demo';

const classes = {
  toolbarRoot: `${PREFIX}-toolbarRoot`,
  progress: `${PREFIX}-progress`,
};

const StyledDiv = styled('div')({
  [`&.${classes.toolbarRoot}`]: {
    position: 'relative',
  },
});

const StyledLinearProgress = styled(LinearProgress)(() => ({
  [`&.${classes.progress}`]: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
  },
}));

const ToolbarWithLoading = (
  ({ children, ...restProps }:any ) => (
    <StyledDiv className={classes.toolbarRoot}>
      <Toolbar.Root {...restProps}>
        {children}
      </Toolbar.Root>
      <StyledLinearProgress className={classes.progress} />
    </StyledDiv>
  )
);

const usaTime = (date: any) => new Date(date).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });

const mapAppointmentData = (appointment:any) => ({
  id: appointment.id,
  startDate: usaTime(appointment.start.dateTime),
  endDate: usaTime(appointment.end.dateTime),
  title: appointment.summary,
});

const getCurrentDate = () => {
  const currentDate = new Date();
  return `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
};

const initialState = {
  data: [],
  loading: false,
  currentDate: getCurrentDate(),
  currentViewName: 'Week',
};

const reducer = (state:any, action:any) => {
  switch (action.type) {
    case 'setLoading':
      return { ...state, loading: action.payload };
    case 'setData':
      return { ...state, data: action.payload.map(mapAppointmentData) };
    case 'setCurrentViewName':
      return { ...state, currentViewName: action.payload };
    case 'setCurrentDate':
      return { ...state, currentDate: action.payload };
    default:
      return state;
  }
};
const currentDate = '2023-02-14';
const schedulerData = [
  { startDate: '2023-02-14T09:45', endDate: '2023-02-14T11:00', title: 'Meeting' },
  { startDate: '2023-02-14T12:00', endDate: '2023-02-14T13:30', title: 'Go to a gym' },
];


/**
 * Props of the component
 */
type Props = {
    parent: () => void
    content: any
}

/**
 * Component to display the details of a zone and to affect a volunteer to it
 * @param parent A function to return to the parent component
 * @param content The content of the zone
 */
const DetailAffectVolunteer: React.FC<Props> = ({ parent, content }) => {
  const [list, setList] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [selected, setSelected] = useState<number>();
  const [myEvents, setEvents] = React.useState<any[]>([]);

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const {
    data, loading, currentViewName, currentDate,
  } = state;
  const setCurrentViewName = React.useCallback((nextViewName:any) => dispatch({
    type: 'setCurrentViewName', payload: nextViewName,
  }), [dispatch]);
  const setData = React.useCallback((nextData:any) => dispatch({
    type: 'setData', payload: nextData,
  }), [dispatch]);
  const setCurrentDate = React.useCallback((nextDate:any) => dispatch({
    type: 'setCurrentDate', payload: nextDate,
  }), [dispatch]);
  const setLoading = React.useCallback((nextLoading:any) => dispatch({
    type: 'setLoading', payload: nextLoading,
  }), [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
    // Volunteers assigned to the zone
    getVolunteerAssignment(undefined, content.idSlot, content.idZone).then(
      (response) => {
        convertData(response);
        volunteers.forEach((item) => {
          let found = false;
          response.forEach((item2: { idVolunteer: any; }) => {
            if (item.idVolunteer === item2.idVolunteer) {
              found = true;
            }
          });
          if (!found) {
            setVolunteers([...volunteers, item]);
          }
        }
        );
      },
      (error) => {
        window.location.reload();
      }
    );
    // All volunteers
    getVolunteer().then(
      (response) => {
        setVolunteers(response);
        setSelected(response[0].idVolunteer);
      },
      (error) => {
        window.location.reload();
      }
    );
    }
    fetchData();
    getData(setData, setLoading);
  }, [setData, currentViewName, currentDate]);


  /**
   * Manage the click on the create button
   * @param idVolunteer Id of the volunteer to assign
   * @param idZone Id of the zone to assign
   * @param idSlot Id of the slot to assign
   */
  const createAssignment = (idVolunteer: number, idSlot: number, idZone: number, ) => {
    createVolunteerAssignment(idVolunteer, idSlot, idZone).then(
      (response) => {
        window.location.reload();
      },
      (error) => {
        window.location.reload();
      }
    );
  }

  /**
   * Manage the click on the delete button 
   * @param idVolunteer Id of the volunteer to delete
   * @param idZone Id of the zone to delete
   */
  const removeAssignment = (idVolunteer: number, slot: number) => {
    deleteVolunteerAssignment(idVolunteer, slot).then(
      (response) => {
        window.location.reload();
      },
      (error) => {
        window.location.reload();
      }
    );
  }

  /**
   * Create a slot
   * @param startDate Start date of the slot
   * @param startDate Start date of the slot
   * @param endDate End date of the slot
   */
  const creationSlotThenAssigment = (selected: number, startDate: Date, endDate: Date) => {
    createSlot(startDate, endDate).then(
      (response) => {
        console.log("Slot created");
        createAssignment(selected, response.idSlot, content.idZone);
      },
      (error) => {
        window.location.reload();
      }
    );
  }

  const echoes = (event: any) => {
    console.log(myEvents);
    convertData(myEvents);
    /* Problème car le convert cherche à le faire dès le départ */
  }

  const convertData = (data : any) => {
    let events: any[] = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      events.push({
        startDate: element.Slot.startDate,
        endDate: element.Slot.endDate,
        title: element.Volunteer.name + " " + element.Volunteer.surname,
        color: '#ff6d42'
      });
    }
    console.log(events[0].startDate);
    setEvents(events);
  }
  


  return(
    <div className="container">
      {/* Back button */}
      <section style={styles.back}>
        <Button variant="outlined" color="primary" onClick={parent}>Retour</Button>
      </section>
      {/* Management */}
      <section style={styles.page}>
        {/* Assign a new volunteer to the zone */}
        <article style={styles.assign}>
          <select style={styles.select} value={selected} onChange={e => {setSelected(parseInt(e.target.value))}}>
            {volunteers.map((item) => (
              <option value={item.idVolunteer}>{item.name + " "+ item.surname}</option>
            ))}
          </select>
          <p>Debut : {content.startDate}</p>
          <p>Fin : {content.endDate}</p>
          <Button style={styles.button} variant="contained" color="primary" onClick={() => {
            if (selected !== undefined) {
              echoes(undefined);
              {/*creationSlotThenAssigment(selected, content.startDate, content.endDate);
              {/* TODO: Faire le form pour récup les dates et l'heure aussi? */}
            }
          }}>Ajouter</Button>
        </article>
        {/* List of volunteers assigned to the zone */}
        <article>
          {list.map((item) => (
            <div style={styles.tile}>
              <p>{item.Volunteer.name + " " + item.surname}</p>
              <Button variant="contained" color="error" onClick={() => {
                removeAssignment(item.VolunteerIdVolunteer, content.idZone)
              }}>🗑️</Button>
            </div>
          ))}
        </article>
      </section>
      <Paper>
        <Scheduler
          data={schedulerData}
          height={660}
        >
          <ViewState
            currentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={setCurrentViewName}
            onCurrentDateChange={setCurrentDate}
          />
          <DayView
            startDayHour={7.5}
            endDayHour={17.5}
          />
          <WeekView
            startDayHour={7.5}
            endDayHour={17.5}
          />
          <MonthView
          />
          <Appointments />
          <Toolbar
            {...loading ? { rootComponent: ToolbarWithLoading } : null}
          />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <AppointmentTooltip
            showOpenButton
            showCloseButton
            showDeleteButton
          />
          <AppointmentForm />
        </Scheduler>
      </Paper>
    </div>

  );
}

// CSS-In-JS style attributes (to have a completely autonomous component)
const styles = {
  back: {
    "margin": "30px",
    "marginBottom": "30px",
    "text-align": "center"
  },
  page: {
    "display": "flex",
    "flex-direction": "column",
    "backgroundColor": "#E6E6E6",
    "padding": "30px",
    "borderRadius": "30px",
  },
  assign: {
    "display": "flex",
    "flex-direction": "column",
    "margin": "30px",
  },
  list: {
    "display": "flex",
    "flex-wrap": "wrap",
    "justifyContent": "center",
    "margin": "30px",
  },
  tile: {
    "backgroundColor": "#FFFFFF",
    "padding": "20px",
    "borderRadius": "10px",
    "text-align": "center",
    "margin": "20px",
  },
  select : {
    "margin": "20px",
    "border": "none",
    "fontSize": "17px",
    "padding": "10px",
    "paddingLeft": "30px",
    "paddingRight": "30px",
    "borderRadius": "10px",
    "fontWeight": "bold",
  },
  button: {
    "marginRight": "30px",
    "marginLeft": "30px",
  }  
}

export default DetailAffectVolunteer;

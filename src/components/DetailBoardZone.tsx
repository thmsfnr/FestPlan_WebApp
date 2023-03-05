
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';

import { getVolunteerAssignment } from "../services/volunteer_assignment.service";

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import {
  ViewState,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  DayView,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AppointmentForm,
  AppointmentTooltip,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

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

/**
 * Props of the component
 */ 
 type Props = {
  parent: () => void
  content: any
}

/**
 * Component to display volunteers and slots of a selected zone
 * @param parent A function to return to the parent component
 * @returns 
 */
const DetailBoardZone: React.FC<Props> = ({ parent, content }) => {
    const [volunteers, setVolunteers] = useState<any[]>([]);
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
    getVolunteerAssignment(undefined).then(
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
  }
  fetchData();
}, [setData, currentViewName, currentDate]);

  const convertData = (data : any) => {
    let events: any[] = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].Zone.idZone === content.idZone) {
            const element = data[i];
            events.push({
                startDate: element.Slot.startDate,
                endDate: element.Slot.endDate,
                title: element.Volunteer.name + " " + element.Volunteer.surname,
            });
    }
    }
    setEvents(events);
  }

/**
 * Props of the component
 */
type Props = {
    parent: () => void
    content: any
}

    return (
        <div className="container">{/* Back button */}
        <header style={styles.header} className="jumbotron">
          <Button variant="outlined" color="primary" onClick={parent}>Retour</Button>
        </header>
        <Paper>
          <Scheduler
            data={myEvents}
            height={750}
            locale="fr-FR"
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
              showCloseButton
            />
            <AppointmentForm />
          </Scheduler>
        </Paper>
      </div>
    )
}


// CSS-In-JS style attributes (to have a completely autonomous component)
const styles = {
    header: {
      "display": "flex",
      "justifyContent": "center",
      "margin": "30px",
    },
  }

export default DetailBoardZone

import * as React from 'react';
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

const PUBLIC_KEY = 'AIzaSyBnNAISIUKe6xdhq1_rjor2rxoI3UlMY7k';
const CALENDAR_ID = 'f7jnetm22dsjc3npc2lu3buvu4@group.calendar.google.com';

const getData = (setData: any, setLoading: any) => {
  const dataUrl = ['https://www.googleapis.com/calendar/v3/calendars/', CALENDAR_ID, '/events?key=', PUBLIC_KEY].join('');
  setLoading(true);

  return fetch(dataUrl)
    .then(response => response.json())
    .then((data) => {
      setTimeout(() => {
        setData(data.items);
        setLoading(false);
        console.log(data.items);
      }, 600);
    });
};

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

const initialState = {
  data: [],
  loading: false,
  currentDate: '2017-05-23',
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

export default () => {
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

  React.useEffect(() => {
    getData(setData, setLoading);
  }, [setData, currentViewName, currentDate]);

  return (
    <Paper>
      <Scheduler
        data={data}
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
        />
        <AppointmentForm readOnly />
      </Scheduler>
    </Paper>
  );
};
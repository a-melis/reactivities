import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import Navbar from "../../features/nav/Navbar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
  const [activities, setAcctivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setAcctivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleEditActivity = (activity: IActivity) => {
    setAcctivities([...activities.filter(a => a.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleDeleteActivity = (id: string) => {
    setAcctivities([...activities.filter(a => a.id !== id)])
  } 


  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities').then( response => {
      let activities: IActivity[] = [];
      response.data.forEach( activity => {
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      })
      setAcctivities(activities);
    });
  }, []);
  

  return (
    <Fragment>
      <Navbar openCreateForm={handleOpenCreateForm}/>
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard  
        setSelectedActivity={setSelectedActivity}
        editMode={editMode}  
        setEditMode={setEditMode}  
        activities={activities}  
        selectActivity={handleSelectActivity} 
        selectedActivity={selectedActivity}
        createActivity={handleCreateActivity}
        editActivity={handleEditActivity}
        deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
};

export default App;

import { Button, TextField } from "@mui/material";
import "./MyNotes.css";
import React, { useState, useEffect } from "react";
import { TextareaAutosize,Textarea } from '@mui/base/TextareaAutosize';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

function MyNotes() {
  const [myNotes, setMyNotes] = new useState([]);


  const [myNotesEmpty, setMyNotesEmpty] = useState(true);

  const [formData, setFormData] = new useState({
    date: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "date") {
   

      myNotes.forEach((element) => {
        if (element.date === value) {
          setFormData(element);
        }
      });
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if (formData.date === "") {
      console.log("Date is null");
      
    }
    if (formData.note === "") {
      console.log("Note is null")
    }

    if (formData.date !== "" && formData.note !== "") {
      setMyNotes((prevState) => {
        prevState.forEach((note) => {
          if (note.date === formData.date) {
            note.note = formData.note;
          }
        });

        if (prevState.some((note) => note.date === formData.date)) {
          return [...prevState]; 
        } else {
          setMyNotesEmpty(false);
          return [...prevState, formData];
        }
      });
    }
    setFormData({
        date: "",
        note: "",
      })
  };

  useEffect(() => {
    console.log(myNotes);
  }, [myNotes]);

  const style = {
    p: 0,
    width: '100%',
    maxWidth: 360,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
  }

  return (
    <div className="myNotes">
      <form onSubmit={handleSubmit}>
        <div>
          {/* <label htmlFor="date"> Select Date :</label> */}
          <TextField
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div id="noteArea">
          <TextareaAutosize 
            aria-label="minimum height" 
            minRows={3} 
            placeholder="What's New" 
            value={formData.note}
            id="note"
            name="note"
            onChange={handleChange}
            required
          />

        </div>

        <Button type="submit" variant="contained">Submit</Button>
      </form>

      <div className="format_table">
        <table>
          <thead>
            <tr>
              {myNotesEmpty ? null : <td>Date</td>}
              {myNotesEmpty ? null : <td>Notes</td>}
            </tr>
          </thead>
          <tbody>
            {myNotes.map((formData, index) => (
              <tr key={index}>
                <td>{formData.date}</td>
                <td>{formData.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="listOfNotes">
        <List sx={style} aria-label="mailbox folders">

          {myNotes.map((formData)=>{
            return(
            <div>
              <ListItem>
                <ListItemText primary={formData.date} />
              </ListItem>
              <Divider component="li" />
            </div>
            )
          })}
        </List>
      </div>
    </div>
  );
}

export default MyNotes;

import { Button, TextField } from "@mui/material";
import "./MyNotes.css";
import React, { useState, useEffect } from "react";
import { TextareaAutosize,Textarea } from '@mui/base/TextareaAutosize';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event,index) => {
    setAnchorEl({...anchorEl,[index]: event.currentTarget});
  };

  const handleClose = (index) => {
    setAnchorEl({...anchorEl,[index]: null});
  };

  const handleDelete = (index)=>{
    const tempNotes = [...myNotes]
    tempNotes.splice(index,1)
    setMyNotes(tempNotes)
  }

  const open = (index)=> Boolean(anchorEl && anchorEl[index]);
  const getPopoverId = (index) => (open(index) ? `popover-${index}` : undefined);

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

      <div className="listOfNotes">
        <List sx={style} aria-label="mailbox folders">

          {myNotes.map((formData,index)=>{

            return(
            <div key={index}>
              <ListItem>
                <ListItemText primary={formData.date} />
                <div>
                  <Button aria-describedby={getPopoverId(index)} onClick={(event) => handleClick(event, index)} startIcon={<EditIcon/>}/>
                  <Popover
                    id={getPopoverId(index)}
                    open={open(index)}
                    anchorEl={anchorEl && anchorEl[index]}
                    onClose={()=>{handleClose(index)}}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  
                  >
                    <Typography sx={{ p: 2 }}>{formData.note}</Typography>
                  </Popover>
                </div>

                <div>
                  <Button endIcon={<DeleteIcon/>} onClick={(index)=>{handleDelete(index)}}/>
                </div>
              </ListItem>
              {myNotesEmpty ? null : <Divider component="li" />}
            </div>
            )
          })}
         
        </List>
      </div>

    </div>
  );
}

export default MyNotes;

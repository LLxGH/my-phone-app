import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import ImageIcon from '@mui/icons-material/Image';
import axios from "axios";

import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import FormDialog from "./Dialog";
import DeleteContact from "./DeleteContact";


export default function Contact() {

    const [contacts, setContacts] = useState([]);
    const dataUrl = 'http://127.0.0.1:3000/persons';

    useEffect(() => {
        getData();
    }, []);

    function getData() {
        axios.get(dataUrl)

            .then(function (response) {
                // handle success
                console.log(response);
                setContacts(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }
    
    return <>

    <FormDialog></FormDialog>
        
        <List
            sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
            }}
        >
            {contacts.map((contact, i) =>
                <Box key={i}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={contact.name}
                            secondary={contact.phone} />
                            <DeleteContact
                            contacts={contacts}
                            setContacts={setContacts}
                            contactPos={i}/>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </Box>
            )}

        </List>
    </>
}

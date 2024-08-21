"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, writeBatch } from "firebase/firestore"; // Ensure these are imported
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    fetch("api/generate", {
      method: "POST",
      body: text,
    })
      .then((res) => res.json())
      .then((data) => setFlashcards(data));
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashcards = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }

    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user.id);
    const docSnap = await getDoc(userDocRef);

    let collections = [];
    if (docSnap.exists()) {
      collections = docSnap.data().flashcards || [];
      if (collections.find((f) => f.name === name)) {
        alert("Flashcard collection with the same name already exists.");
        return;
      }
      collections.push({ name });
    } else {
      collections = [{ name }];
    }

    batch.set(userDocRef, { flashcards: collections }, { merge: true });

    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });
    await batch.commit();
    handleClose();
    router.push("/flashcards");
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 4,
          mb: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Generate Flashcards</Typography>
        <Paper sx={{ p: 4, width: "100%" }}>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
            label="Enter text for flashcards"
            multiline
            rows={4}
            variant="outlined"
            sx={{
              mb: 2,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Submit
          </Button>
        </Paper>
      </Box>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Flashcards Preview</Typography>
          <Grid container spacing={3}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardActionArea onClick={() => handleCardClick(index)}>
                    <CardContent>
                      <Box>
                        <div>
                          <div>
                            <Typography
                              variant="h5"
                              component="div"
                            >
                              {flashcard.front}
                            </Typography>
                          </div>
                        </div>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}

// 'use client'
// import { useRouter } from "next/navigation"
// import { useUser } from "@clerk/nextjs"
// import { P } from "@clerk/clerk-react/dist/controlComponents-B9SlJ0L1"
// import { collection } from "firebase/firestore"
// import { Box, Container, Paper, TextField, Typography } from "@mui/material"
// import { useState } from "react"

// export default function Generate() {
//     const {isLoaded, isSignedIn, user} = useUser()
//     const [flashcards, setFlashcards] = useState([])
//     const [flipped, setFlipped] = useState([])
//     const [text, setText] = useState('')
//     const [name, setName] = useState('')
//     const [open, setOpen] = useState(false)
//     const router = useRouter()

//     const handleSubmit= async () => {
//         fetch('api/generate', {
//             method: 'POST',
//             body: text,
//         }).then((res)=> res.json())
//         .then((data) > setFlashcards(data))
//     }

//     const handleCardClick = (id) => {
//         setFlipped((prev) => {
//             ...prev,
//             [id]: !prev[id],
//         })
//     }

//     const handleOpen = () => {
//         setOpen(true)
//     }

//     const handleClose = () => {
//         setOpen(false)
//     }

//     const saveFlashcards = async () => {
//         if (!name) {
//             alert('Please enter a name')
//             return
//         }

//         const batch = writeBatch(db)
//         const userDocRef = doc(collection(db,'users'), user.id)
//         const docSnap = await getDoc(userDocRef)

//         if(docSnap.exists()) {
//             const collections = docSnap.data().flashcards || []
//             if (collections.find((f)=> f.name === name)) }
//             alert("Flashcard collections with the same name already exists.")
//             return
//         }
//         else {
//             collections.push({ name});
//             batch.set(userDocRef, {flashcards: collections}, {merge: true})
//         }
//     }
//     else {
//         batch.set(userDocRef, {flashcards: [{name}]})
//     }

//     const colRef = collection(userDocRef, name)
//     flashcards.forEach((flashcard) => {
//         const cardDocRef = doc(colRef)
//         batch.set(cardDocRef, flashcard)
//     })
//     await batch.commit()
//     handleClose()
//     router.push('/flashcards')
// }

// return(<Container maxWidth="md">
//     <Box sx={{
//         mt: 4, mb: 6, display: 'flex', flexDirection:'column', alignItems: 'center',
//     }}>
//         <Typography variant="h4">Generate Flashcards</Typography>
//         <Paper sx={{p: 4, width: '100%'}}>
//             <TextField value={text} onChange={(e) =>
//         </Paper>
//     </Box>
// </Container>)
// }

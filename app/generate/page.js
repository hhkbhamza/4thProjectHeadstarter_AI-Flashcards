'use client'
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { P } from "@clerk/clerk-react/dist/controlComponents-B9SlJ0L1"
import { collection } from "firebase/firestore"

export default function Generate() {
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleSubmit= async () => {
        fetch('api/generate', {
            method: 'POST',
            body: text,
        }).then((res)=> res.json())
        .then((data) > setFlashcards(data))
    }

    const handleCardClick = (id) => {
        setFlipped((prev) => {
            ...prev,
            [id]: !prev[id],
        })
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const saveFlashcards = async () => {
        if (!name) {
            alert('Please enter a name')
            return
        }

        const batch = writeBatch(db)
        const userDocRef = doc(collection(db,'users'), user.id)
        const docSnap = await getDoc(userDocRef)

        if(docSnap.exists()) {
            const collections = docSnap.data().flashcards || []
            if (collections.find((f)=> f.name === name)) }
            alert("Flashcard collections with the same name already exists.")
            return
        }
        else {
            collections.push({ name});
            batch.set(userDocRef, {flashcards: collections}, {merge: true})
        }
    }
    else {
        batch.set(userDocRef, {flashcards: [{name}]})
    }

    const colRef = collection(userDocRef, name) 
    flashcards.forEach((flashcard) => {
        const cardDocRef = doc(colRef)
        batch.set(cardDocRef, flashcard)
    })
    await batch.commit()
    handleClose()
    router.push('/flashcards')
}
}
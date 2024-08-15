import { Typography } from "@mui/material";

export default function SignUpPage() {
    return <Container maxWidth="sm">
        <AppBar position="static" sx={{backgroundColor: "3f51b5"}}>
            <Toobar>
                <Typography variant="h6" sx={{
                    flexGrow: 1,
                }}>
                    Flashcard SaaS
                </Typography>
                <Button color="inherit">
                    <Link href="/login" passhref>
                        Login
                    </Link>

                </Button>
            </Toobar>
        </AppBar>
    </Container>
}
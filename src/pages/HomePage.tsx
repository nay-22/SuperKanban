import { Typography } from "@mui/material"
import Sidebar from "../components/Sidebar"

const HomePage = () => {
    return <>
        <div className="flex items-start justify-normal h-screen">
            <div className="w-fit">
                <Sidebar callback={() => { }} />
            </div>
            <main className="flex items-center justify-center h-screen w-screen bg-taskBackgroundPrimary">
                <Typography variant="h2">HomePage.tsx</Typography>
            </main>
        </div>
    </>

}

export default HomePage
import PageContainer from "../../components/PageContainer";
import ProjectGrid from "./components/ProjectGrid";
import { projectData } from "./projectData";
import {
    Typography,
    Stack
} from '@mui/material';

const Project = () => {
    return (
        <PageContainer>
            <Stack sx={{ minWidth: '100%', display: 'flex', mt: 5 }} direction='column'>
                <Typography sx={{ alignSelf: 'center', p: 1, mb: 3 }} variant="h4">Projects</Typography>
                <ProjectGrid data={projectData} />
            </Stack>
        </PageContainer>
    )
};

export default Project;
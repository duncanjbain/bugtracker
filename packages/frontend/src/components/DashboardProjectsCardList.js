import React from 'react';
import { StyledTable, StyledTableHeader,  StyledTableRow, StyledTableLink} from '../ui/components/StyledTable'

const DashboardProjectsCardList = ({projects}) => (
        <StyledTable>
            <thead>
                <StyledTableHeader>Key</StyledTableHeader>
                <StyledTableHeader>Project Name</StyledTableHeader>
                <StyledTableHeader>Project Lead</StyledTableHeader>
            </thead>
            <tbody>
                {projects.map(project =>
                <StyledTableRow>
                    <td>{project.projectKey}</td>
                    <td><StyledTableLink to={`/project/${project.projectKey}`}>{project.projectName}</StyledTableLink></td>
                    <td><StyledTableLink to={`/user/${project.projectLead._id}`}>{project.projectLead.username}</StyledTableLink></td>
                </StyledTableRow>
                )}
            </tbody>
        </StyledTable>

);

export default DashboardProjectsCardList;

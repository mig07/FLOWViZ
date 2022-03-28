import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('MyFirstPipeline', "This is my first pipeline", new Date().toDateString(), "-", "Finished"),
    createData('ExamplePipeline', "This is an example pipeline", new Date().toDateString(), "-", "Executing"),
    createData('TrimmomaticPipeline', "A trimmomatic pipeline", new Date().toDateString(), "-", "Executing"),
];

const tableStyle={
  TableCell: {
    align: "left"
  }
}

export default function WorkflowList() {
    return (
      <div style={tableStyle}>
        <TableContainer sx={{marginTop:5}} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Creation date</TableCell>
            <TableCell>Finish date</TableCell>
            <TableCell>State</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.calories}</TableCell>
              <TableCell>{row.fat}</TableCell>
              <TableCell>{row.carbs}</TableCell>
              <TableCell>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  ); 
}
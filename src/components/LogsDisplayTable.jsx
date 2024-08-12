import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

function LogDisplayTable({ logs, tableContainerRef }) {

   

      


    return (

        <>
            <TableContainer sx={{

                width: '100%',
                height: 500,

                overflowY: 'auto'
            }} component={Paper} ref={tableContainerRef}>

                <Table stickyHeader>

                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant='h6'>Time In</Typography> </TableCell>
                            <TableCell><Typography variant='h6'>Time Out</Typography></TableCell>
                            <TableCell><Typography variant='h6'>Name</Typography></TableCell>
                            <TableCell><Typography variant='h6'>Message</Typography></TableCell>
                            <TableCell><Typography variant='h6'>Action</Typography></TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {logs.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell><Typography variant='body1'>{log.time}</Typography> </TableCell>
                                <TableCell><Typography variant='body1'>{log.timeOut}</Typography> </TableCell>
                                <TableCell><Typography variant='body1'>{log.name}</Typography> </TableCell>
                                <TableCell><Typography variant='body1'>{log.message}</Typography> </TableCell>
                                <TableCell><Typography variant='body1'>{log.action}</Typography> </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>

            </TableContainer>
        </>
    )
}


export default LogDisplayTable;
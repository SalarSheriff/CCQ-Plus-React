import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function LogDisplayTable({ logs, tableContainerRef }) {

   

      


    return (

        <>
            <TableContainer sx={{

                width: '100%',
                height: '50%',

                overflowY: 'auto'
            }} component={Paper} ref={tableContainerRef}>

                <Table stickyHeader>

                    <TableHead>
                        <TableRow>
                            <TableCell>Time In</TableCell>
                            <TableCell>Time Out</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Message</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {logs.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell>{log.time}</TableCell>
                                <TableCell>{log.timeOut}</TableCell>
                                <TableCell>{log.name}</TableCell>
                                <TableCell>{log.message}</TableCell>
                                <TableCell>{log.action}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>

            </TableContainer>
        </>
    )
}


export default LogDisplayTable;
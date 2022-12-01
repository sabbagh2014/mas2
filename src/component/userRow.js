import React, { useState } from 'react'
import { TableCell, TableRow,Typography, Button, Box, Avatar, makeStyles } from '@material-ui/core'
import { DonationPopUp } from 'src/component/Modals/DonationPopUp'
import {  tokensDetails } from "src/constants";
import { useNavigate } from 'react-router-dom'
import {sortAddress} from "src/utils"
const useStyles = makeStyles(() => ({
  table: {
    minWidth: 320,
    border: '1px solid #e5e3dd',
    '& th': {
      border: '1px solid #e5e3dd',
    },
    '& td': {
      border: '1px solid #e5e3dd',
    },
  },
  createButton: {
    color: '#fff',
    backgroundImage: 'linear-gradient(45deg, #240b36 30%, #c31432 90%)',
    margin: '0px 10px',
  },
}))
export default function ChildTableUser({ row, index }) {
  const classes = useStyles()
  const [openDonation, setOpenDonation] = useState(false)
  const navigate = useNavigate()
  const mastoken = tokensDetails[0];
  return (
    <>
      <TableRow className={classes.tbody} key={row.coinName}>
        <TableCell
          style={{ color: 'black' }}
          align="Center"
          component="th"
          scope="row"
        >
          {index + 1}
        </TableCell>
        <TableCell
          style={{ cursor: 'pointer', textAlign:'center'}}
          align="Center"
          onClick={() =>
            navigate('/user-profile/'+row.userName)
          }
        >
          <Box  
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: 'flex-start'
          }}>
              <Avatar 
                style={{width:"60px",height:"60px", backgroundColor:"#999"}} 
                src={row.profilePic ? row.profilePic : 
                `https://avatars.dicebear.com/api/miniavs/${row._id}.svg`} 
                alt=""
              />
              <Box align='left' ml={2}>
                <Typography variant='h6'>
                  {row.name ? row.name : ''} {' '} 
                </Typography>
                <Typography variant='h5'>
                   {' '} @{row.userName }
                </Typography>
                <Typography variant='body2'>
                  {sortAddress(row.ethAccount?.address)}
                </Typography>
              </Box>
          </Box>
        </TableCell>
        
        <TableCell style={{ color: 'black' }} align="Center">
        <Typography variant='h5'>
        {row.followers ? row.followers.length : 'N/A'}
        </Typography>
        </TableCell>
        <TableCell style={{ color: 'black' }} align="Center">
        <Typography variant='h5'>
          {row.supporters ? row.supporters.length : 'N/A'}
          </Typography>
        </TableCell>
        <TableCell style={{ color: 'black' }} align="Center">

        <Typography variant='h5'>
        {parseFloat(row.masBalance).toFixed(2)}
        </Typography>

        </TableCell>
        <TableCell style={{ color: 'black' }} align="Center">

        <Typography variant='h5'>
        {parseFloat(row.referralBalance).toFixed(2)}
        </Typography>
          
          
        </TableCell>

        <TableCell style={{ color: 'black' }} align="Center">
          <Button
            className={classes.createButton}
            onClick={ () => setOpenDonation(true) }
          >
            Transfer Funds
          </Button>
        </TableCell>
      </TableRow>

        <DonationPopUp
          open={openDonation}
          handleClose={() => setOpenDonation(false)}
          userData={row}
        />
    </>
  )
}

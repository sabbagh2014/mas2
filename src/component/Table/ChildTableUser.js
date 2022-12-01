import React, { useState } from 'react'
import { TableCell, TableRow, Button, Box, makeStyles } from '@material-ui/core'
import { DonationPopUp } from 'src/component/Modals/DonationPopUp'
import { useNavigate } from 'react-router-dom'
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
          style={{ cursor: 'pointer' }}
          align="Center"
          onClick={() =>
            navigate('/user-profile/'+row?.userName)
          }
        >
          <Box  
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: 'center'
          }}><figure
              style={{
                width: " 45px",
                height: " 45px",
                borderRadius: "45px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: 'center'
              }}
            >
              <img style={{width:"100%",height:"100%"}} src={row.profilePic ? row.profilePic : `https://avatars.dicebear.com/api/miniavs/${row._id}.svg`} alt="" />
            </figure></Box>
        </TableCell>
        <TableCell
          style={{ color: 'blue', cursor: 'pointer' }}
          align="Center"
          onClick={() =>
            navigate('/user-profile/'+row?.userName)
          }
        >
          {row?.ethAccount?.address}
          
        </TableCell>
        <TableCell style={{ color: 'black' }} align="Center">
          {row?.name ? row?.name : row?.userName ? row?.userName : 'N/A'}
        </TableCell>
        <TableCell style={{ color: 'black' }} align="Center">
          {row?.userType ? row?.userType : 'N/A'}
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

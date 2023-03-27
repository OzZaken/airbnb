import React from 'react'
import { css } from '@emotion/react'
import { Box } from '@mui/system'
import { CircularProgress, Skeleton } from '@mui/material'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`

const LoaderMap = {
    amenity: (
        <Box sx={{ display: 'flex', padding: '5px 15px' }}>
            <Skeleton variant="square" width={30} height={30} />
        </Box>
    ),
    search: <Box><CircularProgress css={override} /></Box>

}

export default function LoaderApp({ from }) {
    return <div className="app-loading">{LoaderMap[from]}</div>
}
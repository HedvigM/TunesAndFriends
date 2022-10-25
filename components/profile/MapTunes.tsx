import { Box, Typography } from '@mui/material';

export const MapTunes = (props) => {
  console.log('props', props);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 10px',
          minWidth: '350px',
        }}
      >
        <Box sx={{}}>
          <Typography variant='h2' sx={{ borderBottom: '1px solid black' }}>
            Tunes
          </Typography>
          {props.tunes.map((tune, index) => (
            <Typography key={index} variant='body1'>
              {tune}
            </Typography>
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'flex-start',
          }}
        >
          {props.commonTunes && (
            <Typography variant='h2' sx={{ borderBottom: '1px solid black' }}>
              In common
            </Typography>
          )}
          {props.commonTunes &&
            props.commonTunes.map((tunes, index) => (
              <Box key={index} sx={{}}>
                <Typography key={index} variant='body1'>
                  {tunes}
                </Typography>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

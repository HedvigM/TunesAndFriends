import { Avatar, Box, Button, Typography } from '@mui/material';

export const Presentation = (props) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          /*  maxWidth: '500px', */
          minWidth: '350px',
          display: 'flex',
          flexDirection: 'column',
          justifyItems: 'center',
        }}
      >
        <Box>
          <Typography
            variant='h1'
            textAlign='left'
            sx={{
              padding: '5px',
              wordBreak: 'break-word',
            }}
          >
            {props.user.name}
          </Typography>
          <Typography
            variant='h2'
            fontWeight={200}
            sx={{
              padding: '0 5px ',
              wordBreak: 'break-word',
            }}
          >
            {props.user.town}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px',
          }}
        >
          <Avatar
            alt='users avatar'
            sx={{ width: 100, height: 100 }}
            src={props.user.picture}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyItems: 'center',
                alignItems: 'center',
              }}
            >
              <Typography textAlign='left' variant='body1'>
                <b>{props.tunes.length}</b>
              </Typography>
              <Typography variant='body1'>tunes</Typography>
            </Box>
            <Box
              sx={{
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyItems: 'center',
                alignItems: 'center',
              }}
            >
              <Typography textAlign='left' variant='body1'>
                {props.user.followedBy ? (
                  <b>{props.user.followedBy.length}</b>
                ) : (
                  <b>0</b>
                )}
              </Typography>
              <Typography variant='body1'>följare</Typography>
            </Box>
            <Box
              sx={{
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyItems: 'center',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography textAlign='left' variant='body1'>
                  {props.user.following ? (
                    <b>{props.user.following.length}</b>
                  ) : (
                    <b>0</b>
                  )}
                </Typography>
              </Box>
              <Typography variant='body1'>följer</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ padding: '10px' }}>
          <Box>
            <Typography textAlign='left' variant='body1'>
              <b>{props.user.name}</b>
            </Typography>
            <Typography textAlign='left' variant='body1'>
              {props.user.profileText}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { A } from 'styles/theme';

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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'flex-start',
          }}
        >
          <Typography variant='h2' sx={{ borderBottom: '1px solid black' }}>
            Tunes
          </Typography>
          {props.tunes.map((tunes, index) => (
            <Box key={index}>
              <Link
                href={{
                  pathname: `/detailedtune/[slug]`,
                  query: { slug: `${tunes.id}` },
                }}
              >
                <A>{tunes}</A>
              </Link>
            </Box>
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
                <Link
                  href={{
                    pathname: `/detailedtune/[slug]`,
                    query: { slug: `${tunes.id}` },
                  }}
                >
                  <A>{tunes}</A>
                </Link>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

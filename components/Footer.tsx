import styled from '@emotion/styled';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { faMountain } from '@fortawesome/free-solid-svg-icons';

export const Footer = () => {
  library.add(fab);

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'secondary.contrastText',
        }}
      >
        <Icons>
          <Icon
            href='https://github.com/HedvigM'
            target='_blank'
            rel='noreferrer noopener'
            aria-label='a link to my GitHub account'
          >
            <Typography variant={'h1'}>
              <FontAwesomeIcon
                icon={['fab', 'github']}
                style={{ color: 'white' }}
              />
            </Typography>
          </Icon>
          <Icon
            href='https://www.linkedin.com/in/hedvig-mejstedt'
            target='_blank'
            rel='noreferrer noopener'
            aria-label='a link to my linkedin account'
          >
            <Typography variant={'h1'}>
              <FontAwesomeIcon
                icon={['fab', 'linkedin']}
                style={{ color: 'white' }}
              />
            </Typography>
          </Icon>
          <Icon
            href='https://stackoverflow.com/users/16650863/hedvig'
            target='_blank'
            rel='noreferrer noopener'
            aria-label='a link to my stack-overflow account'
          >
            <Typography variant={'h1'}>
              <FontAwesomeIcon
                icon={['fab', 'stack-overflow']}
                style={{ color: 'white' }}
              />
            </Typography>
          </Icon>
          <Icon
            href='https://mejstedt.se'
            target='_blank'
            rel='noreferrer noopener'
            aria-label='a link to my portfolio'
          >
            <Typography variant={'h1'}>
              <FontAwesomeIcon icon={faMountain} style={{ color: 'white' }} />{' '}
            </Typography>
          </Icon>
        </Icons>
      </Box>
    </>
  );
};

const Icons = styled.div`
  display: flex;
  justify-content: center;
`;
const Icon = styled.a`
  margin: 5px 5px;
  color: black;
  cursor: pointer;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
  :hover {
    -webkit-transform: scale(1.5);
    transform: scale(1.1);
  }
`;

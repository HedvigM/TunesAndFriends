import { styled } from '@mui/material';
import { theme } from 'styles/theme';

export const Header2 = () => {
  return (
    <OuterContainer>
      <HeaderContainer>
        <H1>Hej jag heter Hedvig</H1>
      </HeaderContainer>
    </OuterContainer>
  );
};

const HeaderContainer = styled('div')({
  height: '23px',
  width: 'fit-content',
  padding: '0 10px',
  marginTop: '41px',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.first,
});
const OuterContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
});
const H1 = styled('h1')({
  margin: 0,
  padding: 0,
});

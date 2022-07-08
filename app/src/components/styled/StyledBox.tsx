import styled from '@emotion/styled';
import Box from '@mui/material/Box';

const StyledBox = styled(Box)(() => ({
  maxWidth: '880px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  margin: '80px auto 40px',
  textDecoration: 'none',
}));

export default StyledBox;

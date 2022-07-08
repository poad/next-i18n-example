import styled from '@emotion/styled';
import Link from '@mui/material/Link';

const CardStyleLink = styled(Link)(() => ({
  padding: '18px 18px 24px',
  width: '220px',
  textAlign: 'left',
  color: '#434343',
  border: '1px solid #9b9b9b',
  textDecoration: 'none',
  '&:hover, &.Mui-focusVisible, &.Mui-active': {
    borderColor: '#067df7',
  },
  '& h3': {
    margin: '0',
    color: '#067df7',
    fontSize: '18px',
  },
  '& p': {
    margin: '0',
    padding: '12px 0 0',
    color: '#333',
    fontSize: '13px',
  },
}));

export default CardStyleLink;

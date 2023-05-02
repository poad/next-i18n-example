import { GitHub } from '@mui/icons-material';
import { Box, Link } from '@mui/material';

interface GitHubProjectLinkProps {
  container?: Element,
  owener: string,
  repo: string,
}

const GitHubProjectLink = ({ owener, repo } : GitHubProjectLinkProps): JSX.Element => {
  return (
    <Box
      position='fixed'
      bottom='1rem'
      right='1rem'
    >
      <Link href={`https://github.com/${owener}/${repo}`}>
        <GitHub sx={{ w: '3rem', h:'3rem' }} />
      </Link>
    </Box>
  );
};

export default GitHubProjectLink;
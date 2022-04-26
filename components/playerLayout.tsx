import { Box } from '@chakra-ui/layout';
import Sidebar from './sidebar';

const sidebarWidth = '250px';
const playBarHeight = '100px';

const PlayerLayout = ({ children }) => {
  return (
    <Box width="100vw" height="100vh">
      <Box position="absolute" top="0" left="0" width={sidebarWidth}>
        <Sidebar />
      </Box>

      <Box marginLeft={sidebarWidth} marginBottom={playBarHeight}>
        <Box height={`calc(100vh - ${playBarHeight})`}>{children}</Box>
      </Box>
      <Box position="absolute" left="0" bottom="0" height={playBarHeight}>
        playbar
      </Box>
    </Box>
  );
};

export default PlayerLayout;

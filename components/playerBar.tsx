import { Box, Flex, Text } from '@chakra-ui/layout';
import { Song, Artist } from '@prisma/client';
import { useStoreState } from 'easy-peasy';
import Player from './player';

type SongWithArtist = Song & {
  artist?: Artist;
};

const PlayerBar = () => {
  const songs = useStoreState(
    (state: any) => state.activeSongs as SongWithArtist[]
  );
  const activeSong = useStoreState(
    (state: any) => state.activeSong as SongWithArtist
  );

  return (
    <Box height="100px" width="100vw" bg="gray.900" padding="10px">
      <Flex align="center" color="white">
        {activeSong && (
          <Box padding="20px" width="30%">
            <Text fontSize="large">{activeSong.name}</Text>
            <Text fontSize="sm">{activeSong.artist.name}</Text>
          </Box>
        )}
        <Box width="40%">
          {activeSong && <Player songs={songs} activeSong={activeSong} />}
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;

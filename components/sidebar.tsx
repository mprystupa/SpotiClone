import Image from 'next/image';
import Link from 'next/link';
import {
  Box,
  Divider,
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/layout';
import {
  MdFavorite,
  MdHome,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdSearch,
} from 'react-icons/md';
import { IconType } from 'react-icons';
import { usePlaylist } from '../lib/hooks';

interface MenuItem {
  name: string;
  icon: IconType;
  route: string;
}

const navMenu: MenuItem[] = [
  {
    name: 'Home',
    icon: MdHome,
    route: '/',
  },
  {
    name: 'Search',
    icon: MdSearch,
    route: '/search',
  },
  {
    name: 'Your Library',
    icon: MdLibraryMusic,
    route: '/library',
  },
];

const musicMenu: MenuItem[] = [
  {
    name: 'Create Playlist',
    icon: MdPlaylistAdd,
    route: '/',
  },
  {
    name: 'Favourites',
    icon: MdFavorite,
    route: '/favourites',
  },
];

const Sidebar = () => {
  const { playlists } = usePlaylist();

  return (
    <Box width="100%" height="calc(100vh - 100px)" bg="black" color="gray">
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <Image src="/logo.svg" height={60} width={120} />
        </Box>

        <Box marginBottom="20px">
          <List spacing={2}>
            {navMenu.map((entry) => (
              <ListItem paddingX="20px" fontSize="16px" key={entry.name}>
                <LinkBox>
                  <Link href={entry.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={entry.icon}
                        color="white"
                        marginRight="20px"
                      />
                      {entry.name}
                    </LinkOverlay>
                  </Link>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box marginBottom="20px">
          <List spacing={2}>
            {musicMenu.map((entry) => (
              <ListItem paddingX="20px" fontSize="16px" key={entry.name}>
                <LinkBox>
                  <Link href={entry.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={entry.icon}
                        color="white"
                        marginRight="20px"
                      />
                      {entry.name}
                    </LinkOverlay>
                  </Link>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider color="gray.800" />

        <Box height="63%" overflowY="auto" paddingY="10px">
          {' '}
          <List spacing={1.5}>
            {playlists.map((playlist) => (
              <ListItem paddingX="20px" fontSize="16px" key={playlist.id}>
                <LinkBox>
                  <Link
                    href={{
                      pathname: `/playlist/[id]`,
                      query: { id: playlist.id },
                    }}
                    passHref
                  >
                    <LinkOverlay>{playlist.name}</LinkOverlay>
                  </Link>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;

import { Playlist as PlaylistModel } from '@prisma/client';
import { FC } from 'react';
import GradientLayout from '../../components/gradientLayout';
import SongTable from '../../components/songTable';
import { validateToken } from '../../lib/auth';
import prisma from '../../lib/prisma';

const getBGColor = (id) => {
  const colors = [
    'red',
    'green',
    'blue',
    'orange',
    'purple',
    'grey',
    'teal',
    'yellow',
  ];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const Playlist: FC<{ playlist: PlaylistModel }> = ({ playlist }) => {
  const color = getBGColor(playlist?.id ?? 0);

  return (
    <GradientLayout
      color={color}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
      roundImage={false}
    >
      <SongTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  let user;

  try {
    user = validateToken(req.cookies[process.env.ACCESS_TOKEN_NAME]);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    };
  }
  const playlist = await prisma.playlist.findFirst({
    where: {
      id: +query.id,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: { playlist },
  };
};

export default Playlist;

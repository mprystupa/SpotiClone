import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from '@chakra-ui/react';

import ReactHowler from 'react-howler';
import { useEffect, useRef, useState } from 'react';
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from 'react-icons/md';
import { useStoreActions } from 'easy-peasy';
import { formatTime } from '../lib/formatters';

const Player = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState(0);
  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);

  const soundRef = useRef(null);

  const setPlayState = (value: boolean) => {
    setPlaying(value);
  };

  const getShuffledSongIndex = (currentSongIndex: number) => {
    const next = Math.floor(Math.random() * songs.length);

    if (next === currentSongIndex && songs.length > 1) {
      return getShuffledSongIndex(currentSongIndex);
    }

    return next;
  };

  const prevSong = () => {
    setIndex((state) => (state ? state - 1 : songs.length - 1));
  };

  const nextSong = () => {
    setIndex((state) => {
      if (shuffle) {
        return getShuffledSongIndex(state);
      }

      return state === songs.length - 1 ? 0 : state + 1;
    });
  };

  const onEnd = () => {
    if (repeat) {
      // restart song
      setSeek(0);
      soundRef.current.seek(0);
    } else {
      nextSong();
    }
  };

  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = (e) => {
    const currentSeekValue = e[0];
    setSeek(parseFloat(currentSeekValue));
    soundRef.current.seek(currentSeekValue);
  };

  return (
    <Box>
      <Box>
        <ReactHowler
          ref={soundRef}
          playing={playing}
          src={activeSong?.url}
          onLoad={onLoad}
          onEnd={onEnd}
        />
      </Box>

      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            variant="link"
            aria-label="shuffle"
            fontSize="24px"
            color={shuffle ? 'white' : ''}
            onClick={() => setShuffle((state) => !state)}
            icon={<MdShuffle />}
          />
          <IconButton
            variant="link"
            aria-label="previous"
            fontSize="24px"
            icon={<MdSkipPrevious />}
            onClick={prevSong}
          />
          {playing ? (
            <IconButton
              variant="link"
              aria-label="pause"
              fontSize="42px"
              color="white"
              onClick={() => setPlayState(false)}
              icon={<MdOutlinePauseCircleFilled />}
            />
          ) : (
            <IconButton
              variant="link"
              aria-label="play"
              fontSize="42px"
              color="white"
              onClick={() => setPlayState(true)}
              icon={<MdOutlinePlayCircleFilled />}
            />
          )}
          <IconButton
            variant="link"
            aria-label="next"
            fontSize="24px"
            icon={<MdSkipNext />}
            onClick={nextSong}
          />
          <IconButton
            variant="link"
            aria-label="repeat"
            fontSize="24px"
            color={repeat ? 'white' : ''}
            onClick={() => setRepeat((state) => !state)}
            icon={<MdOutlineRepeat />}
          />
        </ButtonGroup>
      </Center>

      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Text fontSize="xs">0:00</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              aria-label={['min', 'max']}
              step={0.1}
              min={0}
              max={duration ? +duration.toFixed(2) : 0}
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
              id="player-range"
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
                <RangeSliderThumb index={0} />
              </RangeSliderTrack>
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="xs">{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;

import React from 'react'
import Image from 'next/image';
import css from './index.module.css'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; import Link from 'next/link';
interface IGameCardProps {
  game: {
    id: string;
    image: string;
    name: string;
    link: string;
  }
}

const GameCard: React.FC<IGameCardProps> = props => {
  const { game } = props
  return <div className={css['game-card-wrapper']} >
    <div className={css['game-card-overlay']}>
      <div className={css['content-overlay']}>
        <span style={{ width: 100, height: 20, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {game.name}
        </span>
        <button className={css["btn-play"]}>
          <PlayArrowIcon />
        </button>
      </div>
    </div>
    <Image src={game.image} alt={`game image + ${game.id}`} width={150} height={209} style={{ objectFit: 'cover', borderRadius: 10 }} />
  </div >
}

export default GameCard
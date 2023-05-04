import { dice } from "@/utils/images"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Head from "next/head"

export type Player = {
  isBot: boolean
  tempScore: number
  totalScore: number
}

export type GameType = {
  singlePlayer: boolean
  botDifficulty: string
}

export default function Game() {
  const [won, setWon] = useState({ player: 0, won: false })
  const [turn, setTurn] = useState({ player: 0, roll: 5 })
  const [players, setPlayers] = useState<Player[]>([] as Player[])
  const [botRoll, setBotRoll] = useState(0)
  const changeTurn = (goodRoll = true) => {
    const newTotal1 = players[0]!.totalScore + (goodRoll ? players[0]!.tempScore : 0)
    const newTotal2 = players[1]!.totalScore + (goodRoll ? players[1]!.tempScore : 0)
    const newTotals = [{ total: newTotal1 }, { total: newTotal2 }]
    setPlayers([
      {
        ...players[0]!,
        totalScore: newTotal1,
        tempScore: 0,
      },
      {
        ...players[1]!,
        totalScore: newTotal2,
        tempScore: 0,
      },
    ])
    setTurn({ player: Number(!!turn.player === false), roll: 0 })
    if (newTotals.filter((total) => total.total >= 100).length > 0) {
      setWon({
        won: true,
        player: Number(newTotal2 >= 100),
      })
    }
  }
  const handleRoll = () => {
    const newRoll = Math.floor(Math.random() * 6)
    if (!won.won) {
      if (!!turn.player) {
        setBotRoll(botRoll + 1)
      }
      setTurn({ ...turn, roll: newRoll })
      if (newRoll + 1 != 1) {
        !!turn.player
          ? setPlayers([
              players[0]!,
              { ...players[1]!, tempScore: players[1]!.tempScore + newRoll + 1 },
            ])
          : setPlayers([
              { ...players[0]!, tempScore: players[0]!.tempScore + newRoll + 1 },
              players[1]!,
            ])
      } else {
        changeTurn(false)
      }
    }
  }
  const easy = useRef(true)
  let currentGame = useRef<GameType | undefined>(undefined)
  const router = useRouter()
  const query = router.query
  useEffect(() => {
    if (router.isReady) {
      currentGame.current = {
        singlePlayer: query.singlePlayer === "1",
        botDifficulty:
          `${query.botDifficulty}` === "easy" || "hard" ? `${query.botDifficulty}` : "easy",
      }
      setPlayers([
        { isBot: false, totalScore: 0, tempScore: 0 },
        {
          isBot:
            currentGame.current.singlePlayer != undefined ? currentGame.current.singlePlayer : true,
          totalScore: 0,
          tempScore: 0,
        },
      ])
      if (currentGame.current.botDifficulty === "hard") {
        easy.current = false
      }
    }
  }, [router.isReady])
  useEffect(() => {
    const botTimer = setInterval(() => {
      if (players.length > 0) {
        if (players[1]!.isBot && turn.player == 1) {
          if (easy.current) {
            if (botRoll < 2) {
              handleRoll()
            } else {
              setBotRoll(0)
              changeTurn()
            }
          } else {
            if (players[1]!.tempScore <= 20) {
              handleRoll()
            } else {
              changeTurn()
            }
          }
        }
      }
    }, 700)
    return () => {
      clearInterval(botTimer)
    }
  }, [players, turn.player, botRoll, easy])
  useEffect(() => {
    if (won.won) {
      setTimeout(() => {
        router.push("/").catch((err) => {
          console.log(err)
        })
      }, 5000)
    }
  }, [won])
  return (
    <div className="page">
      <Head>
        <title>Pig Dice</title>
      </Head>
      {/* Scores */}
      <div className="w-1/2 mx-auto">
        <div className="grid grid-flow-row grid-cols-2 mt-4 space-x-6 text-2xl font-medium text-center md:text-3xl">
          <p className={won.won && won.player === 0 ? "text-bs-success" : ""}>
            Player1: {players[0]?.totalScore}
          </p>
          <p className={won.won && won.player === 1 ? "text-bs-success" : ""}>
            {currentGame.current?.singlePlayer ? "Bot" : "Player2"}: {players[1]?.totalScore}
          </p>
        </div>
        <hr className="mt-4" />
      </div>
      {/* Dice */}
      <div className="flex flex-row justify-center w-1/2 gap-10 mx-auto mt-10">
        <div className="max-w-[8rem] mx-auto">
          <Image
            className={`w-full ${turn.player && "invisible"}`}
            src={dice[turn.roll].src}
            width={0}
            height={0}
            alt="dice"
          />
        </div>
        <div className="max-w-[8rem] mx-auto">
          <Image
            className={`w-full ${!turn.player && "invisible"}`}
            src={dice[turn.roll].src}
            width={0}
            height={0}
            alt="dice"
          />
        </div>
      </div>
      {/* Actions */}
      <div className="flex flex-row justify-center w-1/2 gap-4 mx-auto mt-20">
        <button
          onClick={handleRoll}
          className="px-4 py-1.5 text-white bg-bs-success disabled:opacity-30 rounded-md font-medium"
          disabled={(turn.player === 1 && players[1]!.isBot) || won.won}
        >
          Roll!
        </button>
        <button
          onClick={() => changeTurn()}
          className="px-4 py-1.5 text-white bg-bs-danger disabled:opacity-30 rounded-md font-medium"
          disabled={(turn.player === 1 && players[1]!.isBot) || won.won}
        >
          Hold!
        </button>
      </div>
      <div className="w-1/2 mx-auto mt-8 text-xl text-center md:text-2xl">
        <p>Current Roll Value: {players[turn.player]?.tempScore}</p>
      </div>
    </div>
  )
}

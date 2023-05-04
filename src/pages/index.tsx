import { BlitzPage } from "@blitzjs/next"
import Link from "next/link"
import Head from "next/head"
import { useState } from "react"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Home: BlitzPage = () => {
  const [showDifficulty, setShowDifficulty] = useState(false)
  return (
    <div className="page">
      <Head>
        <title>Pig Dice</title>
      </Head>
      <div className="flex flex-row justify-center my-4">
        <div className="max-w-md text-center md:max-w-4xl">
          <p className="text-4xl font-semibold">Pig Dice</p>
          <hr className="w-3/5 mx-auto my-4" />
          <div className="w-3/5 mx-auto space-y-4">
            <p>
              {
                "Pig Dice! But what is Pig Dice? How did it come about? No one knows. Don't fact check us. But we can tell you how to play."
              }
            </p>
            <p>
              Pig Dice is played with, traditionally, two players and one die. The first player to
              *100* wins, but there are stipulations. If you roll your six sided die and get
              anything from TWO to SIX you can either roll again, adding the die together as many
              times as youd like...UNLESS: If you roll a ONE you ose the score of all the die you
              rolled on this turn.
            </p>
            <p>
              You do have the option to pass at any time, saving the total of the die rolled on this
              turn into your total and passing the die to your opponent. Give it a try!
            </p>
            <p>
              You have your choice of multiplayer OR two levels of difficulty in single player mode.
              Good luck!
            </p>
          </div>
          {!showDifficulty ? (
            <div className="mt-6 space-x-2">
              <button
                onClick={() => setShowDifficulty(true)}
                className="px-4 py-1.5 text-white bg-bs-info rounded-md font-medium"
              >
                Single Player
              </button>
              <Link href="/game?singlePlayer=0">
                <button className="px-4 py-1.5 text-white bg-bs-primary rounded-md font-medium">
                  Multi Player
                </button>
              </Link>
            </div>
          ) : (
            <div className="mt-6 space-x-2">
              <Link href="/game?singlePlayer=1&botDifficulty=easy">
                <button className="px-4 py-1.5 text-white bg-bs-success rounded-md font-medium">
                  Easy
                </button>
              </Link>
              <Link href="/game?singlePlayer=1&botDifficulty=hard">
                <button className="px-4 py-1.5 text-white bg-bs-danger rounded-md font-medium">
                  Hard
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home

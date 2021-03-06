import Image from "next/image";
import { useState } from "react";
import shuffle from "just-shuffle";
import splitAt from "just-split-at";
import remove from "just-remove";
import Link from "next/link";
import Players from "../data/players.json";

import basketball from "../public/assets/ball2.png";
import basketballStrong from "../public/assets/ball.png";
import jerseyWhite from "../public/assets/basketball-jersey-white.png";
import jerseyBlack from "../public/assets/basketball-jersey-black.png";
import basketballPlayers from "../public/assets/basketball-players.png";

export default function Home() {
  let normalPlayers = Players.normalPlayers;
  let weightedPlayers = Players.weightedPlayers;
  let shooterPlayers = Players.shooterPlayers;
  let flyPlayers = Players.flyPlayers;

  const [normalPool, setNormalPool] = useState(normalPlayers);
  const [weightedPool, setWeightedPool] = useState(weightedPlayers);
  const [shooterPool, setShooterPool] = useState(shooterPlayers);
  const [flyPool, setFlyPool] = useState(flyPlayers);
  const [teamBlack, setTeamBlack] = useState([]);
  const [teamWhite, setTeamWhite] = useState([]);

  function pickTeam() {
    let shuffled = shuffle(normalPool);
    let team = splitAt(shuffled, shuffled.length / 2);
    let team1 = team[1];
    let team2 = team[0];

    let shooterShuffled = shuffle(shooterPool);
    let shooterTeamSplit = splitAt(shooterShuffled, shooterShuffled.length / 2);

    if (team1.length <= team2.length) {
      team1 = [...team1, ...shooterTeamSplit[1]];
      team2 = [...team2, ...shooterTeamSplit[0]];
    } else {
      team1 = [...team1, ...shooterTeamSplit[0]];
      team2 = [...team2, ...shooterTeamSplit[1]];
    }

    let flyShuffled = shuffle(flyPool);
    let flyTeamSplit = splitAt(flyShuffled, flyShuffled.length / 2);

    if (team1.length <= team2.length) {
      team1 = [...team1, ...flyTeamSplit[1]];
      team2 = [...team2, ...flyTeamSplit[0]];
    } else {
      team1 = [...team1, ...flyTeamSplit[0]];
      team2 = [...team2, ...flyTeamSplit[1]];
    }

    let weightPoolShuffled = shuffle(weightedPool);
    let weightTeamSplit = splitAt(
      weightPoolShuffled,
      weightPoolShuffled.length / 2
    );

    if (team1.length <= team2.length) {
      team1 = [...team1, ...weightTeamSplit[1]];
      team2 = [...team2, ...weightTeamSplit[0]];
    } else {
      team1 = [...team1, ...weightTeamSplit[0]];
      team2 = [...team2, ...weightTeamSplit[1]];
    }

    setTeamBlack(team1);
    setTeamWhite(team2);
  }

  function toggleNormalPlayer(name) {
    if (normalPool.includes(name)) {
      setNormalPool(remove(normalPool, [name]));
    } else {
      setNormalPool([...normalPool, name]);
    }
  }

  function toggleWeightedPlayer(name) {
    if (weightedPool.includes(name)) {
      setWeightedPool(remove(weightedPool, [name]));
    } else {
      setWeightedPool([...weightedPool, name]);
    }
  }

  function toggleShooterPlayer(name) {
    if (shooterPool.includes(name)) {
      setShooterPool(remove(shooterPool, [name]));
    } else {
      setShooterPool([...shooterPool, name]);
    }
  }

  function toogleFlyPlayers(name) {
    if (flyPool.includes(name)) {
      setFlyPool(remove(flyPool, [name]));
    } else {
      setFlyPool([...flyPool, name]);
    }
  }

  function getPlayerIcon(name) {
    let playerIcon = basketball;
    if (weightedPlayers.includes(name)) {
      playerIcon = basketballStrong;
    }
    return playerIcon;
  }

  return (
    <div>
      <section className="my-5 flex justify-center">
        <button className="btn btn-accent" onClick={pickTeam}>
          ????????????
        </button>
      </section>
      <section className="grid grid-cols-2 gap-5 mb-5">
        <div className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 flex flex-col">
          <div className="h-12 w-full flex justify-between items-center text-white px-2">
            <div className="flex">
              <span className="mr-2">??????</span>
              <Image width={24} height={24} src={jerseyBlack} alt="tshirt" />
            </div>
            <div className="bg-white rounded-full px-1 flex text-primary">
              <span className="text-xs">{teamBlack.length}</span>
            </div>
          </div>
          <div className="p-3 bg-base-100 m-0.5 rounded-xl flex-1 min-h-16 overflow-hidden">
            <ul>
              {teamBlack.map((name) => {
                return (
                  <li className={`flex mb-2 animate-slide`} key={name}>
                    <Image
                      src={getPlayerIcon(name)}
                      alt="teamBlack"
                      width={24}
                      height={24}
                    />
                    <span className="ml-2">{name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="w-full rounded-xl bg-gradient-to-r from-[#EBF4F5] to-[#B5C6E0] flex flex-col">
          <div className="h-12 w-full flex justify-between items-center text-black px-2">
            <div className="flex">
              <span className="mr-2">??????</span>
              <Image width={24} height={24} src={jerseyWhite} alt="tshirt" />
            </div>
            <div className="bg-black rounded-full border-black px-1 flex text-white">
              <span className="text-xs">{teamWhite.length}</span>
            </div>
          </div>
          <div className="p-3 bg-base-100 m-0.5 rounded-xl flex-1 overflow-hidden">
            <ul>
              {teamWhite.map((name) => {
                return (
                  <li className="flex mb-2 animate-slide" key={name}>
                    <Image
                      src={getPlayerIcon(name)}
                      alt="teamWhite"
                      width={24}
                      height={24}
                    />
                    <span className="ml-2">{name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
      <section className="mb-10">
        <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium flex">
            <Image
              src={basketballPlayers}
              alt="basketball players"
              width={24}
              height={24}
            />
            <h1 className="ml-2">???????????????</h1>
          </div>
          <div className="collapse-content">
            <div className="mb-2">
              <h2>??????</h2>
              <div className="grid grid-cols-3 gap-1">
                {normalPlayers.map((name) => {
                  const checked = normalPool.includes(name);
                  return (
                    <label
                      className="label cursor-pointer justify-start"
                      key={name}
                    >
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary mr-2"
                        value={name}
                        defaultChecked={true}
                        onChange={(e) => toggleNormalPlayer(name)}
                        checked={checked}
                      />
                      <span
                        className={`label-text ${
                          checked && "text-white font-medium"
                        }`}
                      >
                        {name}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="mb-2">
              <h2>??????</h2>
              <div className="grid grid-cols-3 gap-1">
                {weightedPlayers.map((name) => {
                  const checked = weightedPool.includes(name);
                  return (
                    <label
                      className="label cursor-pointer justify-start"
                      key={name}
                    >
                      <input
                        type="checkbox"
                        className="checkbox checkbox-accent mr-2"
                        value={name}
                        defaultChecked={true}
                        onChange={(e) => toggleWeightedPlayer(name)}
                        checked={checked}
                      />
                      <span
                        className={`label-text ${
                          checked && "text-white font-medium"
                        }`}
                      >
                        {name}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="mb-2">
              <h2>3??????</h2>
              <div className="grid grid-cols-3 gap-1">
                {shooterPlayers.map((name) => {
                  const checked = shooterPool.includes(name);
                  return (
                    <label
                      className="label cursor-pointer justify-start"
                      key={name}
                    >
                      <input
                        type="checkbox"
                        className="checkbox checkbox-secondary mr-2"
                        value={name}
                        defaultChecked={true}
                        onChange={(e) => toggleShooterPlayer(name)}
                        checked={checked}
                      />
                      <span
                        className={`label-text ${
                          checked && "text-white font-medium"
                        }`}
                      >
                        {name}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
            <div>
              <h2>??????</h2>
              <div className="grid grid-cols-3 gap-1">
                {flyPlayers.map((name) => {
                  const checked = flyPool.includes(name);
                  return (
                    <label
                      className="label cursor-pointer justify-start"
                      key={name}
                    >
                      <input
                        type="checkbox"
                        className="checkbox mr-2"
                        value={name}
                        defaultChecked={true}
                        onChange={(e) => toogleFlyPlayers(name)}
                        checked={checked}
                      />
                      <span
                        className={`label-text ${
                          checked && "text-white font-medium"
                        }`}
                      >
                        {name}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="text-center w-full mb-10">
        <Link href="/" passHref>
          <button className="btn btn-outline btn-wide">??????</button>
        </Link>
      </section>
    </div>
  );
}

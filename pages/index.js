import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localizedFormat from "dayjs/plugin/localizedFormat";

import relativeTime from "dayjs/plugin/relativeTime";
import Players from "../data/players.json";
import gamesApi from "./api/games";

import basketball from "../public/assets/ball2.png";
import basketballStrong from "../public/assets/ball.png";
import promote from "../public/assets/promote.png";
import jerseyWhite from "../public/assets/basketball-jersey-white.png";
import jerseyBlack from "../public/assets/basketball-jersey-black.png";
import basketballPlayers from "../public/assets/basketball-players.png";

dayjs.extend(weekday);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export default function Home({ nextGame }) {
  const router = useRouter();
  const [user, setUser] = useState("");

  let regularPlayers = Players.regularPlayers;
  let weightedPlayers = Players.weightedPlayers;

  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    let userName = localStorage.getItem("obc-user");
    if (!userName) {
      router.push("/join");
    } else {
      setUser(userName);
    }
  }, []);

  async function handleJoin() {
    try {
      const type = regularPlayers.includes(user) ? "regular" : "dropIn";
      await fetch("/api/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, type, id: nextGame.id }),
      });

      refreshData();
    } catch (err) {
      // DO NOTHING
    }
  }

  async function handleRemove() {
    try {
      const type = regularPlayers.includes(user) ? "regular" : "dropIn";
      await fetch("/api/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, type, id: nextGame.id }),
      });

      refreshData();
    } catch (err) {
      // DO NOTHING
    }
  }

  if (!nextGame || !user) return null;

  const alreadyJoined =
    nextGame?.regular?.includes(user) || nextGame?.dropIn?.includes(user);

  function getPlayerIcon(name) {
    let playerIcon = basketball;
    if (weightedPlayers.includes(name)) {
      playerIcon = basketballStrong;
    }
    return playerIcon;
  }

  return (
    <div>
      <section className="text-center w-full mb-5">
        <span className="text-xl mr-5">Hi</span>
        <span className="text-2xl text-secondary font-semibold italic underline decoration-sky-500 underline-offset-4">
          {user}
        </span>
      </section>
      <section className="mb-5 flex justify-between">
        <h1>Next Game: {dayjs(nextGame.date).format("LL")}</h1>
        <span className="text-accent">8:30pm - 10:30pm</span>
      </section>
      <section className="mb-5">
        <div className="flex justify-between">
          <h1>星期五12点分队</h1>
          <span className="font-bold text-secondary">
            {dayjs().to(dayjs(nextGame.date))}
          </span>
        </div>
        <div className="text-[10px] italic text-gray-500 underline underline-offset-1">
          星期天重置分队
        </div>
      </section>

      <section className="grid grid-cols-2 gap-5 mb-5">
        <div className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 flex flex-col">
          <div className="h-12 w-full flex justify-between items-center text-white px-2">
            <div className="flex">
              <span className="mr-2">黑队</span>
              <Image width={24} height={24} src={jerseyBlack} alt="tshirt" />
            </div>
            <div className="bg-white rounded-full px-1 flex text-primary">
              <span className="text-xs">{nextGame?.teamBlack?.length}</span>
            </div>
          </div>
          <div className="p-3 bg-base-100 m-0.5 rounded-xl flex-1 min-h-16 overflow-hidden">
            <ul>
              {nextGame?.teamBlack?.map((name) => {
                return (
                  <li className={`flex mb-2 animate-slide`} key={name}>
                    <Image
                      src={getPlayerIcon(name)}
                      alt="team"
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
              <span className="mr-2">白队</span>
              <Image width={24} height={24} src={jerseyWhite} alt="tshirt" />
            </div>
            <div className="bg-black rounded-full border-black px-1 flex text-white">
              <span className="text-xs">{nextGame?.teamWhite?.length}</span>
            </div>
          </div>
          <div className="p-3 bg-base-100 m-0.5 rounded-xl flex-1 overflow-hidden">
            <ul>
              {nextGame?.teamWhite?.map((name) => {
                return (
                  <li className="flex mb-2 animate-slide" key={name}>
                    <Image
                      src={getPlayerIcon(name)}
                      alt="team"
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
      {dayjs().isBefore(nextGame.date, "hour") ? (
        <section className="mb-5 text-center w-full">
          {alreadyJoined ? (
            <button
              className="btn btn-secondary btn-outline"
              onClick={handleRemove}
            >
              取消参加活动
            </button>
          ) : (
            <button className="btn btn-accent w-full" onClick={handleJoin}>
              点击参加下次活动
            </button>
          )}
        </section>
      ) : (
        <section className="mb-5 text-center w-full">报名已截止</section>
      )}
      <section className="mb-5">
        <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium flex">
            <Image
              src={basketballPlayers}
              alt="basketball players"
              width={24}
              height={24}
            />
            <div className="flex items-center">
              <h1 className="mx-2">已确认参加人员名单</h1>
              <div className="badge badge-primary">
                {(nextGame?.regular?.length || 0) +
                  (nextGame?.dropIn?.length || 0)}
              </div>
            </div>
          </div>
          <div className="collapse-content">
            <div className="mb-2">
              <h2 className="font-semibold">常规人员</h2>
              <div className="grid grid-cols-3 gap-1">
                {regularPlayers.map((name) => {
                  const checked = nextGame?.regular?.includes(name);
                  return (
                    <label
                      className="label cursor-pointer justify-start"
                      key={name}
                    >
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary mr-2"
                        value={name}
                        checked={checked}
                        readOnly
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
              <h2 className="font-semibold">Drop In</h2>
              <div className="grid grid-cols-3 gap-1">
                {nextGame?.dropIn?.map((name) => {
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
                        checked={true}
                        readOnly
                      />
                      <span className="label-text text-white font-medium">
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

      <section className="mb-5">
        <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium flex">
            <Image src={promote} alt="promote" />
            <h1 className="ml-2">公告</h1>
          </div>
          <div className="collapse-content">
            <p>从下周开始的八次：</p>
            <p>July 8- Aug 26 </p>
            <p>每周五晚8:30-10:30</p>
            <p>地点: Iroquois Ridge community center</p>
            <p>Dropin的朋友一次$15</p>
          </div>
        </div>
      </section>
      {/* <section className="mb-10">
        <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium flex">
            <Image src={fireball} alt="promote" />
            <h1 className="ml-2">精彩集锦</h1>
          </div>
          <div className="collapse-content">
            <iframe
              width="100%"
              src="https://www.youtube.com/embed/D5scvVGVugw"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section> */}
      <section className="w-full text-center mb-5">
        <Link href="/dropIn">
          <a className="link link-accent">Drop In 记录</a>
        </Link>
      </section>
      <section className="w-full text-center mb-20">
        <Link href="/play">
          <a className="link link-accent">随机分队模拟器</a>
        </Link>
      </section>
    </div>
  );
}

export async function getServerSideProps() {
  const games = await gamesApi();
  const nextGame = games.find((game) => {
    return dayjs(game.date).isSame(dayjs().weekday(5), "day");
  });

  return { props: { nextGame } };
}

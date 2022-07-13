import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { useRouter } from "next/router";

import basketball from "../public/assets/basketball-ball.png";
import fireball from "../public/assets/fireball.png";
import promote from "../public/assets/promote.png";
import logo from "../public/assets/basketball-logo.png";
import jerseyWhite from "../public/assets/basketball-jersey-white.png";
import jerseyBlack from "../public/assets/basketball-jersey-black.png";
import basketballPlayers from "../public/assets/basketball-players.png";
import basketballShooter from "../public/assets/shooting.png";
import basketballStrong from "../public/assets/stand.png";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState("");

  let regularTeam = [
    "Jerry",
    "Tom",
    "周苏杭",
    "李浩华",
    "陈伟",
    "Fake",
    "Dong",
    "邓恺",
    "Terence",
    "陈智",
  ];
  let weightedTeam = ["William", "Erwin", "Steven"];
  let shooterTeam = ["Xyu", "Jacky"];
  let regularPool = regularTeam;
  let weightedPool = weightedTeam;
  let shooterPool = shooterTeam;
  let team1 = [];
  let team2 = [];

  useEffect(() => {
    let userName = localStorage.getItem("obc-user");
    if (!userName) {
      router.push("/join");
    } else {
      setUser(userName);
    }
  }, []);

  return (
    <div>
      <section className="mb-5 flex justify-between">
        <h1>Next Game: July 15, 2022</h1>
        <span className="text-accent">8:30pm - 10:30pm</span>
      </section>
      <section className="mb-5 flex justify-between">
        <h1>分队尚未开始</h1>
        <Link href="/play">
          <a className="link link-accent">随机分队模拟器</a>
        </Link>
      </section>
      <section className="grid grid-cols-2 gap-5 mb-5" id="pool">
        <div className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 flex flex-col">
          <div className="h-12 w-full flex justify-between items-center text-white px-2">
            <div className="flex">
              <span className="mr-2">黑队</span>
              <Image width={24} height={24} src={jerseyBlack} alt="tshirt" />
            </div>
            <div className="bg-white rounded-full px-1 flex text-primary">
              <span className="text-xs">{team1.length}</span>
            </div>
          </div>
          <div className="p-3 bg-base-100 m-0.5 rounded-xl flex-1 min-h-16">
            <ul>
              {team1.map((name) => {
                let icon = weightedTeam.includes(name)
                  ? basketballStrong
                  : shooterTeam.includes(name)
                  ? basketballShooter
                  : basketbal;
                return (
                  <li className="flex mb-2" key={name}>
                    <Image src={icon} alt="team" className="mr-2" />
                    <span>{name}</span>
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
              <span className="text-xs">{team2.length}</span>
            </div>
          </div>
          <div className="p-3 bg-base-100 m-0.5 rounded-xl flex-1">
            <ul>
              {team2.map((name) => {
                let icon = weightedTeam.includes(name)
                  ? basketballStrong
                  : shooterTeam.includes(name)
                  ? basketballShooter
                  : basketball;

                return (
                  <li className="flex mb-2" key={name}>
                    <Image src={icon} alt="team" className="mr-2" />
                    <span>{name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
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
            <h1 className="ml-2">参加人员名单</h1>
          </div>
          <div className="collapse-content">
            <div className="mb-2">
              <h2>常规人员</h2>
              <div className="grid grid-cols-3 gap-1">
                {regularTeam.map((name) => {
                  return (
                    <label
                      className="label cursor-pointer justify-start"
                      key={name}
                    >
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary mr-2"
                        value={name}
                        checked={true}
                      />
                      <span className="label-text">{name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="mb-2">
              <h2>Drop In</h2>
              <div className="grid grid-cols-3 gap-1">
                {weightedTeam.map((name) => {
                  return (
                    <label
                      className="label cursor-pointer justify-start"
                      key={name}
                    >
                      <input
                        type="checkbox"
                        className="checkbox checkbox-accent mr-2"
                        value={name}
                      />
                      <span className="label-text">{name}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between">
              <button className="btn btn-accent mt-10">参加下次活动</button>
              <button className="btn btn-secondary mt-10">
                Drop In 点这里参加
              </button>
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
      <section className="mb-10">
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
      </section>
    </div>
  );
}

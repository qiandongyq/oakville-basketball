import Link from "next/link";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import gamesApi from "./api/games";

dayjs.extend(localizedFormat);

export default function DropIn({ pastGames }) {
  return (
    <div className="">
      <h1 className="text-accent mb-5"></h1>
      {pastGames.map((game) => {
        return (
          <div
            key={game.id}
            className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
          >
            <input type="checkbox" />
            <div className="collapse-title flex items-center">
              <span className="mr-5">{dayjs(game.date).format("LL")}</span>
              <div className="badge badge-primary mr-10">
                {game.dropIn?.length}
              </div>
              <div className="font-bold text-xl text-accent">
                Total $ {game.dropIn?.length * 15}
              </div>
            </div>
            <div className="collapse-content">
              <p>
                {game.dropIn?.map((name) => {
                  return (
                    <span key={name} className="mr-2 text-secondary">
                      {name},
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        );
      })}

      <section className="text-center w-full my-10">
        <Link href="/" passHref>
          <button className="btn btn-outline btn-wide">返回</button>
        </Link>
      </section>
    </div>
  );
}

export async function getServerSideProps() {
  const games = await gamesApi();
  const pastGames = games.filter((game) => {
    return dayjs().isAfter(dayjs(game.date));
  });

  return { props: { pastGames } };
}

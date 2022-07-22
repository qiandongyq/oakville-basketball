import Link from "next/link";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import gamesApi from "./api/games";
import groupBy from "just-group-by";

dayjs.extend(localizedFormat);

export default function DropIn({ seasonGames }) {
  return (
    <div className="">
      <h1 className="text-accent mb-5">联赛赛季</h1>
      {Object.keys(seasonGames).map((key) => {
        const games = seasonGames[key];
        const dropInTotal = games.reduce(
          (acc, curr) => (acc += curr?.dropIn?.length || 0),
          0
        );
        return (
          <div
            key={key}
            className="mb-2 collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
          >
            <input type="checkbox" />
            <div className="collapse-title flex items-center">
              <span>{key}</span>
            </div>
            <div className="collapse-content">
              <div className="mb-5">
                <div className="text-accent mb-3">常规人员</div>
                {games[0]?.regularTotal}
              </div>
              <div className="text-accent mb-1">Drop in 记录</div>
              {games
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((game) => {
                  const gameDropInCount = game?.dropIn?.length || 0;
                  return (
                    <div
                      key={game.id}
                      className="flex justify-between border-b border-spacing-5 border-gray-600 p-2"
                    >
                      <div>{dayjs(game.date).format("MMMM D")}</div>
                      <div>{game?.dropIn?.toString()}</div>
                      <div>${gameDropInCount * 15}</div>
                    </div>
                  );
                })}
              <div className="text-right mt-5 px-2 font-bold text-xl">
                <span>Total: </span>
                <span>{dropInTotal} * 15 = </span>
                <span className="text-2xl">$ {dropInTotal * 15}</span>
              </div>
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

  let seasonGames = groupBy(pastGames, (game) => game.season);

  return { props: { seasonGames } };
}

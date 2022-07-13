import { useState } from "react";
import { useRouter } from "next/router";

export default function Join() {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  const handleJoin = () => {
    if (!userName) {
      return;
    }
    localStorage.setItem("obc-user", userName);
    router.push("/");
  };

  return (
    <div className="form-control w-full">
      <label className="label flex">输入你的名字</label>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full input-lg mb-5"
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleJoin}>
        加入
      </button>
    </div>
  );
}

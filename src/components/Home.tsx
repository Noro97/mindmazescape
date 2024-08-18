import { useEffect, useState } from "react";
import CoinBalance from "./CoinBalance";
import ImageButton from "./ImageButton";
import { debounce } from "lodash-es";
import imgUrl from "../assets/img/brain.png";
import {
  initSwipeBehavior,
  postEvent,
  User,
  initCloudStorage,
} from "@telegram-apps/sdk";
import EnergyBalance from "./EnergyBalance";

const Home = ({ user }: { user: User | undefined }) => {
  const [swipeBehavior] = initSwipeBehavior();
  const cloudStorage = initCloudStorage();

  const energyBar = 1000;
  const [data, setData] = useState<{ coins: number; energy: number }>({
    coins: 0,
    energy: 1000,
  });

  const handleTouchCount = (count: number) => {
    if (+data.energy !== 0 && +data.energy - count >= 0) {
      setData((prevState) => ({
        energy: prevState.energy - count,
        coins: prevState.coins + count,
      }));

      // cloudStorage
      //   .set("coins", `${+data.coins + count.toString()}`)
      //   .catch((e) => {
      //     console.log("e", e);
      //   });
      // cloudStorage
      //   .set("energy", `${+data.energy - count.toString()}`)
      //   .catch((e) => {
      //     console.log("e", e);
      //   });

      // localStorage.setItem("coins", `${data.coins + 1}`);
      // localStorage.setItem("energy", `${data.energy - 1}`);
      // console.log("typeof data.enerfy", typeof data.energy);
      // console.log("typeof count", typeof count);
    }
  };

  useEffect(() => {
    // cloudStorage.delete(["coins", "energy"]);
    const interval = setInterval(() => {
      setData((prevState) => ({
        energy:
          prevState.energy == 1000 ? prevState.energy : +prevState.energy + 1,
        coins: +prevState.coins + 1,
      }));
      cloudStorage.set("coins", `${data.coins + 1}`).catch((e) => {
        console.log("e", e);
      });
      if (data.energy < 1000) {
        cloudStorage.set("energy", `${data.energy + 1}`).catch((e) => {
          console.log("e", e);
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // useMemo(() => {
  //   const coins = localStorage.getItem("coins");
  //   const energy = localStorage.getItem("energy");

  //   setData((prevState) => ({
  //     coins: prevState.coins + +coins,
  //     energy: +energy,
  //   }));

  //   console.log("coins", typeof coins);
  //   console.log("energy", typeof energy);
  // }, []);

  // useEffect(() => {
  //   // cloudStorage.delete(["coins", "energy"]);

  //   cloudStorage
  //     .get(["energy", "coins"])
  //     .then((result) => {
  //       setData((prevState) => ({
  //         coins: +prevState.coins + +result.coins,
  //         energy: +result.energy,
  //       }));
  //       console.log("result", result);
  //     })
  //     .catch((e) => {
  //       console.log("e", e);
  //     });
  // }, []);

  useEffect(() => {
    swipeBehavior.disableVerticalSwipe();
    postEvent("web_app_expand");
  }, []);

  return (
    <>
      <div className="flex flex-col items-center px-[5px]   text-center">
        <h1 className="text-[#86fc6a] text-[36px]">Hello, {user?.firstName}</h1>

        <CoinBalance balance={data.coins} />
        <EnergyBalance balance={data.energy} energyBar={energyBar} />
      </div>

      <ImageButton
        hasEnergy={data.energy > 0}
        imageSrc={imgUrl}
        altText="Placeholder Image"
        onTouchCount={handleTouchCount}
      />
    </>
  );
};

export default Home;

import { useEffect, useState } from "react";
import CoinBalance from "./CoinBalance";
import ImageButton from "./ImageButton";
import imgUrl from "../assets/img/brain.png";

const Home = () => {
  // const [swipeBehavior] = initSwipeBehavior();

  const energyBar = 1000;
  // const { sendEnergyGainMessage } = useEnergyGainWS({
  //   userId: user.id,
  // });
  // const { sendCoinGainMessage } = useCoinGainWS({
  //   userId: user.id,
  // });

  const [data, setData] = useState<{ coins: number; energy: number }>({
    coins: 0,
    energy: 1000,
  });

  const energyPercentage = Math.round((+data.energy / energyBar) * 100);

  const handleTouchCount = (count: number) => {
    if (+data.energy !== 0 && +data.energy - count >= 0) {
      setData((prevState) => ({
        energy: prevState.energy - count,
        coins: prevState.coins + count,
      }));
    }
  };

  // const fetchData = async () => {
  //   try {
  //     const response = await getCoinsEnergyData(user.id);
  //     setData({
  //       energy: +response.energy,
  //       coins: +response.coins,
  //     });
  //   } catch (e) {
  //     if (isAxiosError(e)) {
  //       alert(e);
  //     }
  //   }
  // };

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevState) => ({
        energy:
          prevState.energy == 1000 ? prevState.energy : +prevState.energy + 1,
        coins: +prevState.coins + 1,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  useEffect(() => {
    // swipeBehavior.disableVerticalSwipe();
    // postEvent("web_app_expand");
  }, []);

  return (
    <>
      <CoinBalance balance={data.coins} />
      <ImageButton
        hasEnergy={data.energy > 0}
        imageSrc={imgUrl}
        altText="Placeholder Image"
        // onClickCount={handleTouchCount}
        onTouchCount={handleTouchCount}
      />
      <div>
        <p className="font-sans">Your Energy: {energyPercentage}%</p>
        <div className="relative text-center bg-[#22001B] w-[40%] h-[24px] rounded-[38px] overflow-hidden">
          <p className="relative z-[1]">{data.energy}</p>
          <div
            className="bg-gradient-to-r from-[#ff6c06] to-[#f83c26] absolute rounded-[38px] top-0 left-0 h-[24px] font-sans text-center font-bold "
            style={{ width: `${energyPercentage}%` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Home;

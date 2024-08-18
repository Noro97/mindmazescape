import { SDKProvider } from "@telegram-apps/sdk-react";
import {
  mockTelegramEnv,
  parseInitData,
  initInitData,
  retrieveLaunchParams,
} from "@telegram-apps/sdk";

import Home from "./components/Home";

const App = () => {
  const initDataRaw = new URLSearchParams([
    [
      "user",
      JSON.stringify({
        id: 99281932,
        first_name: "Andrew",
        last_name: "Rogue",
        username: "rogue",
        language_code: "en",
        is_premium: true,
        allows_write_to_pm: true,
      }),
    ],
    [
      "hash",
      "89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31",
    ],
    ["auth_date", "1716922846"],
    ["start_param", "debug"],
    ["chat_type", "sender"],
    ["chat_instance", "8428209589180549439"],
  ]).toString();

  mockTelegramEnv({
    themeParams: {
      accentTextColor: "#6ab2f2",
      bgColor: "#17212b",
      buttonColor: "#5288c1",
      buttonTextColor: "#ffffff",
      destructiveTextColor: "#ec3942",
      headerBgColor: "#17212b",
      hintColor: "#708499",
      linkColor: "#6ab3f3",
      secondaryBgColor: "#232e3c",
      sectionBgColor: "#17212b",
      sectionHeaderTextColor: "#6ab3f3",
      subtitleTextColor: "#708499",
      textColor: "#f5f5f5",
    },
    initData: parseInitData(initDataRaw),
    initDataRaw,
    version: "7.8",
    platform: "tdesktop",
  });

  const initData = initInitData();
  const launchparams = retrieveLaunchParams();
  const isMobilePlatform =
    launchparams.platform == "android" ||
    launchparams.platform == "android_x" ||
    launchparams.platform == "ios";

  return (
    <SDKProvider acceptCustomStyles debug>
      <div className="overflow-y-hidden flex flex-col bg-no-repeat justify-around bg-center-layer gap-2 bg-cover w-full h-[100vh] px-[20px]">
        {isMobilePlatform ? (
          <Home user={launchparams.initData?.user || initData?.user} />
        ) : (
          <div className="text-center">
            <h1 className="text-[45px] text-[#86fc6a]">Play on your mobile</h1>
            <img src="qr-code.svg" alt="coin" />
            <h1 className="text-[45px] text-[#86fc6a]">@MindMazescapeBot</h1>
          </div>
        )}
      </div>
    </SDKProvider>
  );
};

export default App;

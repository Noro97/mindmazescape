import NumberWithCommas from "../utils/NumberWithCommas";

export default function CoinBalance({ balance }: { balance: number }) {
  return (
    <div className="flex h-[50px] justify-between items-center">
      <img src="coin.svg" alt="coin" />
      <span className="text-[#86fc6a] text-[56px]">
        {NumberWithCommas(balance)}
      </span>
    </div>
  );
}

export default function CoinBalance({ balance }: { balance: number }) {
  return (
    <div className="flex justify-center gap-[10px] text-[48px] px-[45px]  border-[5px] border-white/50 rounded-[20px] text-center">
      <img src="coin.svg" alt="coin" />
      <span className='text-[#86fc6a]'>{balance}</span>
    </div>
  );
}

export default function EnergyBalance({
  balance,
  energyBar,
}: {
  balance: number;
  energyBar: number;
}) {
  const energyPercentage = Math.round((+balance / energyBar) * 100);

  return (
    <div className="relative text-center bg-[#bbbbbb]/40 border-[1px] border-white w-[60%] h-[34px] rounded-[38px] overflow-hidden">
      <p className="relative z-[1] text-[26px]">
        {balance}/{energyBar}
      </p>
      <div
        className="bg-gradient-to-r from-[#4d4b4b] to-[#86fc6a] absolute rounded-[38px] top-0 left-0 h-[34px] font-sans text-center font-bold "
        style={{ width: `${energyPercentage}%` }}
      ></div>
    </div>
  );
}

import React from 'react';

interface CardProps {
  title: string;
  description: string;
  profit: string;
  total: string;
  level: string;
  bgColor: string;
}

const cardsData: Omit<CardProps, 'bgColor'>[] = [
  {
    title: "Consensus Piranha Pass",
    description: "Limited edition pass to elevate your experience at Consensus",
    profit: "29.99K",
    total: "2.14M",
    level: "11",
  },
  {
    title: "There are two chairs...",
    description: "Welcome to TG office",
    profit: "35.77K",
    total: "4.03M",
    level: "12",
  },
  {
    title: "USDT on TON",
    description: "The future of peer-to-peer",
    profit: "30.44K",
    total: "3.32M",
    level: "14",
  },
  {
    title: "Web3 academy launch",
    description: "Edutainment = mass adoption",
    profit: "20.72K",
    total: "262.23K",
    level: "10",
  },
  {
    title: "TON + Hamster Kombat = Success",
    description: "Web3 breakthrough is coming",
    profit: "35.76K",
    total: "3.73M",
    level: "6",
  },
  {
    title: "Special Hamster Conference",
    description: "Mega Event",
    profit: "18.12K",
    total: "799.2K",
    level: "13",
  },
  {
    title: "Blockchain Pizza Party",
    description: "Free slices for everyone!",
    profit: "15.65K",
    total: "1.98M",
    level: "9",
  },
  {
    title: "TON Gaming League",
    description: "Get ready for Web3 games",
    profit: "40.12K",
    total: "4.12M",
    level: "12",
  },
  {
    title: "DAO Stakeholders Event",
    description: "Governance for the future",
    profit: "25.88K",
    total: "2.88M",
    level: "8",
  },
  {
    title: "NFT Collectors Meetup",
    description: "Exclusive NFTs revealed",
    profit: "33.45K",
    total: "3.65M",
    level: "13",
  },
  {
    title: "Crypto Whale Symposium",
    description: "The biggest event of the year",
    profit: "50.23K",
    total: "5.12M",
    level: "15",
  },
  {
    title: "Metaverse Expo",
    description: "Discover virtual worlds",
    profit: "22.10K",
    total: "2.02M",
    level: "11",
  },
  {
    title: "TON DeFi Summit",
    description: "Decentralized finance insights",
    profit: "28.88K",
    total: "3.10M",
    level: "10",
  },
  {
    title: "Web3 Future Talks",
    description: "Discussions on blockchain tech",
    profit: "18.50K",
    total: "1.99M",
    level: "9",
  },
  {
    title: "Consensus Networking Night",
    description: "Exclusive networking event",
    profit: "30.20K",
    total: "2.20M",
    level: "12",
  },
  {
    title: "TON Gala Dinner",
    description: "Celebrate TON's success",
    profit: "25.90K",
    total: "2.90M",
    level: "11",
  }
];

const bgColors = [
  'from-blue-500 to-blue-800',
  'from-pink-500 to-pink-800',
  'from-green-500 to-green-800',
  'from-yellow-500 to-yellow-800',
  'from-red-500 to-red-800',
  'from-purple-500 to-purple-800',
  'from-orange-500 to-orange-800',
  'from-teal-500 to-teal-800',
  'from-indigo-500 to-indigo-800',
  'from-amber-500 to-amber-800',
  'from-fuchsia-500 to-fuchsia-800',
  'from-lime-500 to-lime-800',
  'from-rose-500 to-rose-800',
  'from-cyan-500 to-cyan-800',
  'from-violet-500 to-violet-800',
  'from-sky-500 to-sky-800',
];

const Card: React.FC<CardProps> = ({ title, profit, total, level, bgColor, iconSrc, kycLevel }) => {
  return (
    <div className={`bg-gradient-to-b ${bgColor} rounded-xl p-4 w-full h-40 shadow-lg text-white flex flex-col justify-between`}>
      <div className="flex justify-between items-center">
        {/* Icon Image */}
        <img className="h-8 w-8" src={iconSrc} alt={`${title} icon`} />
        
        {/* Title and Profit per Hour */}
        <div className="flex flex-col text-left">
          <h3 style={{fontSize:'0.6rem'}} className="text font-bold">{title}</h3>
          <p className="text-xs text-left text-gray-300">Profit per hour</p>
          <p className="text-sm text-left text-white font-semibold">{profit}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        {/* Level and Total */}
        <div className="flex items-center">
          <p className="text-xs text-white">lvl {level}</p>
        </div>
        <div className="text-right">
          {kycLevel ? (
            <p className="text-xs text-gray-300">KYC {kycLevel}</p>
          ) : (
            <p className="text-xs text-white">{total}</p>
          )}
        </div>
      </div>
    </div>
  );
};
const CardGrid: React.FC = () => {
  return (
    <div className="p-3 bg-gray-900 min-h-screen">
      <div className="grid grid-cols-2  lg:grid-cols-3 gap-3">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            profit={card.profit}
            total={card.total}
            level={card.level}
            bgColor={bgColors[index % bgColors.length]} // Assign different background for each card
          />
        ))}
      </div>
    </div>
  );
};

export default CardGrid;

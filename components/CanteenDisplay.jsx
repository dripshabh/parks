// Canteen Display Component
// Shows backside in middle, 3 available canteens below in semicircle with counts

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useGame } from '../src/contexts/GameContext.jsx';
import ImageIcon from './ImageIcon.jsx';
import { getCanteenImageProps, getCanteenTypesWithCounts } from '../src/utils/canteenImages.js';

export default function CanteenDisplay() {
  const { gameState } = useGame();
  const [allCanteens, setAllCanteens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/canteens')
      .then(res => res.json())
      .then(data => {
        setAllCanteens(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching canteens:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !gameState) {
    return (
      <div className="bg-blue-50 rounded-lg p-3 shadow-lg border-2 border-blue-600">
        <div className="text-center text-sm text-gray-600">Loading canteens...</div>
      </div>
    );
  }

  // Get unique canteen types (one of each)
  const uniqueCanteenTypes = Array.from(
    new Map(allCanteens.map(c => [c.name, c])).values()
  ).slice(0, 3); // Show first 3 unique types

  return (
    <div className="bg-blue-50 rounded-lg p-4 shadow-lg border-2 border-blue-600">
      <h3 className="text-sm font-bold mb-3 text-center text-blue-900">Canteen Display</h3>
      
      {/* Backside in the middle */}
      <div className="flex justify-center mb-3">
        <motion.div
          className="bg-white rounded-lg p-2 border-2 border-blue-400 shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <ImageIcon
            {...getCanteenImageProps("backside")}
            size={80}
            fallback="💧"
          />
        </motion.div>
      </div>

      {/* Canteen tokens side by side */}
      <div className="flex justify-center gap-3">
        {uniqueCanteenTypes.map((canteen, index) => (
          <motion.div
            key={canteen.name || index}
            className="bg-white rounded-lg p-2 border-2 border-blue-400 shadow-md"
            whileHover={{ scale: 1.15, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            <ImageIcon
              {...getCanteenImageProps(canteen.name)}
              size={60}
              fallback="💧"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface LikeButtonProps {
  modelId: string;
  likesCount: number;
  showCount?: boolean;
}

export function LikeButton({ modelId, likesCount, showCount = false }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likesCount);

  const handleLike = () => {
    setLiked(!liked);
    setCurrentLikes(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleLike}
      className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors ${
        liked 
          ? 'bg-red-100 text-red-600' 
          : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
      }`}
    >
      <Heart 
        className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} 
      />
      {showCount && (
        <span className="text-sm font-medium">
          {currentLikes}
        </span>
      )}
    </motion.button>
  );
}
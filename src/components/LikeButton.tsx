import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLikes } from '../hooks/useLikes';
import { useAuth } from '../hooks/useAuth';

interface LikeButtonProps {
  modelId: string;
  showCount?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function LikeButton({ modelId, showCount = false, size = 'md' }: LikeButtonProps) {
  const { likeCount, isLiked, loading, toggleLike } = useLikes(modelId);
  const { user } = useAuth();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = async () => {
    if (!user) {
      // Could show a toast or modal here
      return;
    }

    setIsAnimating(true);
    await toggleLike();
    
    // Reset animation after a short delay
    setTimeout(() => setIsAnimating(false), 600);
  };

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const buttonSizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  if (loading) {
    return (
      <div className={`flex items-center space-x-1 ${buttonSizeClasses[size]} bg-gray-100 text-gray-400 rounded-full`}>
        <Heart className={`${sizeClasses[size]} animate-pulse`} />
        {showCount && <span className="font-medium">...</span>}
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: user ? 1.05 : 1 }}
      whileTap={{ scale: user ? 0.95 : 1 }}
      onClick={handleLike}
      disabled={!user || loading}
      className={`flex items-center space-x-1 ${buttonSizeClasses[size]} rounded-full transition-all duration-200 ${
        isLiked 
          ? 'bg-red-100 text-red-600' 
          : user 
          ? 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500' 
          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
      } ${!user ? 'opacity-75' : ''}`}
      title={!user ? 'Sign in to like models' : isLiked ? 'Unlike' : 'Like'}
    >
      <motion.div
        animate={isAnimating && isLiked ? {
          scale: [1, 1.3, 1],
          rotate: [0, -10, 10, 0]
        } : {}}
        transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
      >
        <Heart 
          className={`${sizeClasses[size]} ${isLiked ? 'fill-current' : ''} transition-all duration-200`} 
        />
      </motion.div>
      {showCount && (
        <motion.span 
          key={likeCount}
          initial={{ scale: 1 }}
          animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.3 }}
          className="font-medium"
        >
          {likeCount}
        </motion.span>
      )}
    </motion.button>
  );
}

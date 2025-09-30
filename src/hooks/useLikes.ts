import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export function useLikes(modelId: string) {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (modelId) {
      fetchLikeData();
    }
  }, [modelId, user]);

  const fetchLikeData = async () => {
    try {
      setLoading(true);

      // Get like count
      const { count, error: countError } = await supabase
        .from('likes')
        .select('*', { count: 'exact', head: true })
        .eq('model_id', modelId);

      if (countError) throw countError;
      setLikeCount(count || 0);

      // Check if current user liked this model
      if (user) {
        const { data, error: likeError } = await supabase
          .from('likes')
          .select('id')
          .eq('model_id', modelId)
          .eq('user_id', user.id)
          .single();

        if (likeError && likeError.code !== 'PGRST116') {
          throw likeError;
        }

        setIsLiked(!!data);
      } else {
        setIsLiked(false);
      }
    } catch (error) {
      console.error('Error fetching like data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async () => {
    if (!user) {
      console.warn('User must be logged in to like models');
      return;
    }

    try {
      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('model_id', modelId)
          .eq('user_id', user.id);

        if (error) throw error;

        setIsLiked(false);
        setLikeCount(prev => Math.max(0, prev - 1));
      } else {
        // Like
        const { error } = await supabase
          .from('likes')
          .insert({
            model_id: modelId,
            user_id: user.id
          });

        if (error) throw error;

        setIsLiked(true);
        setLikeCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      // Revert optimistic update on error
      await fetchLikeData();
    }
  };

  return {
    likeCount,
    isLiked,
    loading,
    toggleLike,
    refetch: fetchLikeData
  };
}
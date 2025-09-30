import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
}

export function useUsers() {
  const [userProfiles, setUserProfiles] = useState<Record<string, UserProfile>>({});
  const [loading, setLoading] = useState(false);

  const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      // Check if we already have this user's profile
      if (userProfiles[userId]) {
        return userProfiles[userId];
      }

      setLoading(true);

      // Get user data from auth.users (this requires service role key in production)
      // For now, we'll use a simpler approach with the user_id
      const { data, error } = await supabase.auth.admin.getUserById(userId);

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      const profile: UserProfile = {
        id: data.user.id,
        email: data.user.email || 'Unknown',
        full_name: data.user.user_metadata?.full_name
      };

      // Cache the profile
      setUserProfiles(prev => ({
        ...prev,
        [userId]: profile
      }));

      return profile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchMultipleUserProfiles = async (userIds: string[]) => {
    const uniqueIds = [...new Set(userIds)].filter(id => !userProfiles[id]);
    
    if (uniqueIds.length === 0) return;

    try {
      setLoading(true);
      
      // In a real app, you'd want to batch this or use a different approach
      // For now, we'll fetch them individually
      const profiles = await Promise.all(
        uniqueIds.map(id => fetchUserProfile(id))
      );

      const profileMap = profiles.reduce((acc, profile) => {
        if (profile) {
          acc[profile.id] = profile;
        }
        return acc;
      }, {} as Record<string, UserProfile>);

      setUserProfiles(prev => ({ ...prev, ...profileMap }));
    } catch (error) {
      console.error('Error fetching multiple user profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    userProfiles,
    loading,
    fetchUserProfile,
    fetchMultipleUserProfiles
  };
}
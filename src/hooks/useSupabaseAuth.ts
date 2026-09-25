import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { UserProgress } from '../types';

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'saved' | 'error'>('idle');

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /**
   * Loads user progress from Supabase if logged in
   */
  const loadCloudProgress = async (): Promise<UserProgress | null> => {
    if (!user) return null;
    try {
      setSyncStatus('syncing');
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.warn('Error loading cloud progress from Supabase:', error.message);
        setSyncStatus('error');
        return null;
      }

      if (data && data.progress_data) {
        setSyncStatus('saved');
        return data.progress_data as UserProgress;
      }

      setSyncStatus('idle');
      return null;
    } catch (err) {
      console.warn('Network error loading progress:', err);
      setSyncStatus('error');
      return null;
    }
  };

  /**
   * Saves user progress to Supabase
   */
  const saveCloudProgress = async (progress: UserProgress): Promise<boolean> => {
    if (!user) return false;
    try {
      setSyncStatus('syncing');
      
      // Upsert profile
      await supabase.from('profiles').upsert({
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Alumno',
        updated_at: new Date().toISOString()
      });

      // Upsert user_progress
      const { error } = await supabase.from('user_progress').upsert({
        user_id: user.id,
        xp: progress.xp || progress.score,
        score: progress.score,
        lives: progress.lives,
        budget: progress.budget,
        streak: progress.streak,
        last_active_date: new Date().toISOString().split('T')[0],
        badges: progress.unlockedBadges || [],
        progress_data: progress,
        updated_at: new Date().toISOString()
      });

      if (error) {
        console.warn('Error saving to Supabase:', error.message);
        setSyncStatus('error');
        return false;
      }

      setSyncStatus('saved');
      setTimeout(() => setSyncStatus('idle'), 2500);
      return true;
    } catch (err) {
      console.warn('Failed to save to Supabase:', err);
      setSyncStatus('error');
      return false;
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return {
    user,
    session,
    loading,
    syncStatus,
    loadCloudProgress,
    saveCloudProgress,
    signOut
  };
}

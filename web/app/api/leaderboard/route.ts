import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - Fetch leaderboard
export async function GET() {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Supabase environment variables not configured');
      return NextResponse.json(
        { error: 'Leaderboard service not configured', leaderboard: [] },
        { status: 503 }
      );
    }

    // Fetch top 100 scores, ordered by score descending, then by created_at ascending (earlier scores rank higher if tied)
    const { data, error } = await supabase
      .from('leaderboards')
      .select('username, score, created_at')
      .order('score', { ascending: false })
      .order('created_at', { ascending: true })
      .limit(100);

    if (error) {
      console.error('Error fetching leaderboard:', error);
      return NextResponse.json(
        { error: 'Failed to fetch leaderboard', leaderboard: [] },
        { status: 500 }
      );
    }

    // Transform data to match expected format
    const leaderboard = (data || []).map(entry => ({
      username: entry.username,
      score: entry.score,
      timestamp: new Date(entry.created_at).getTime(),
    }));

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error('Unexpected error fetching leaderboard:', error);
    return NextResponse.json(
      { error: 'Internal server error', leaderboard: [] },
      { status: 500 }
    );
  }
}

// POST - Submit a score
export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Supabase environment variables not configured');
      return NextResponse.json(
        { error: 'Leaderboard service not configured' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { username, score } = body;

    if (!username || typeof username !== 'string' || username.trim().length === 0) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    if (typeof score !== 'number' || score < 0) {
      return NextResponse.json(
        { error: 'Valid score is required' },
        { status: 400 }
      );
    }

    // Sanitize username (max 20 chars, alphanumeric + spaces/hyphens/underscores)
    const sanitizedUsername = username.trim().slice(0, 20).replace(/[^a-zA-Z0-9\s\-_]/g, '');

    if (sanitizedUsername.length === 0) {
      return NextResponse.json(
        { error: 'Invalid username format' },
        { status: 400 }
      );
    }

    const finalScore = Math.floor(score);

    // Check if user already has a score in the database
    const { data: existingScores, error: checkError } = await supabase
      .from('leaderboards')
      .select('id, username, score, created_at')
      .eq('username', sanitizedUsername)
      .order('score', { ascending: false })
      .limit(1);

    if (checkError) {
      console.error('Error checking existing score:', checkError);
      return NextResponse.json(
        { error: 'Failed to check existing score' },
        { status: 500 }
      );
    }

    let insertedData;
    let scoreNotUpdated = false;
    let existingHighScore: number | undefined = undefined;
    
    if (existingScores && existingScores.length > 0) {
      // User already has a score - only update if new score is higher
      const existingScore = existingScores[0].score;
      existingHighScore = existingScore;
      
      if (finalScore > existingScore) {
        // Update existing entry with new higher score
        const { data: updatedData, error: updateError } = await supabase
          .from('leaderboards')
          .update({ score: finalScore })
          .eq('id', existingScores[0].id)
          .select('id, username, score, created_at')
          .single();

        if (updateError) {
          console.error('Error updating score:', updateError);
          return NextResponse.json(
            { error: 'Failed to update score' },
            { status: 500 }
          );
        }
        
        insertedData = updatedData;
      } else {
        // New score is not higher, don't update - return existing entry
        insertedData = existingScores[0];
        scoreNotUpdated = true;
        // Still need to fetch full leaderboard for response
      }
    } else {
      // No existing score - insert new entry
      const { data: newData, error: insertError } = await supabase
        .from('leaderboards')
        .insert({
          username: sanitizedUsername,
          score: finalScore,
        })
        .select('id, username, score, created_at')
        .single();

      if (insertError) {
        console.error('Error inserting score:', insertError);
        return NextResponse.json(
          { error: 'Failed to submit score' },
          { status: 500 }
        );
      }
      
      insertedData = newData;
    }

    // Fetch full leaderboard to calculate rank
    const { data: allScores, error: rankError } = await supabase
      .from('leaderboards')
      .select('id, username, score, created_at')
      .order('score', { ascending: false })
      .order('created_at', { ascending: true });

    if (rankError) {
      console.error('Error fetching rank:', rankError);
      // Still return success even if we can't get rank
      const { data: leaderboardData } = await supabase
        .from('leaderboards')
        .select('username, score, created_at')
        .order('score', { ascending: false })
        .order('created_at', { ascending: true })
        .limit(100);

      const leaderboard = (leaderboardData || []).map(entry => ({
        username: entry.username,
        score: entry.score,
        timestamp: new Date(entry.created_at).getTime(),
      }));

      return NextResponse.json({
        success: true,
        rank: null,
        leaderboard,
      });
    }

    // Find rank (1-indexed)
    const rank = (allScores || []).findIndex(
      entry => entry.id === insertedData.id
    ) + 1;

    // Get top 100 for leaderboard response
    const leaderboard = (allScores || [])
      .slice(0, 100)
      .map(entry => ({
        username: entry.username,
        score: entry.score,
        timestamp: new Date(entry.created_at).getTime(),
      }));

    return NextResponse.json({
      success: true,
      rank: rank > 0 ? rank : (allScores?.length || 0),
      leaderboard,
      scoreNotUpdated: scoreNotUpdated, // Indicates if score wasn't updated because it's lower
      existingScore: existingHighScore, // The existing high score (only set if scoreNotUpdated is true)
    });
  } catch (error) {
    console.error('Unexpected error submitting score:', error);
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

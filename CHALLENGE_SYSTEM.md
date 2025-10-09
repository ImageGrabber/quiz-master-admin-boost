# Challenge System

A real-time challenge system that allows participants to challenge other online users to quiz battles.

## Features

### 🎯 Core Functionality
- **Online User Detection**: Real-time tracking of who is currently online and available for challenges
- **Challenge Requests**: Send and receive challenge invitations with custom messages
- **Real-time Notifications**: Instant updates when challenges are sent, accepted, or declined
- **Head-to-Head Battles**: Direct quiz competitions between two players
- **Live Scoring**: Real-time score tracking and ranking during challenges

### 🏗️ Architecture

#### Database Schema
- `online_users`: Tracks users currently online with availability status
- `challenge_requests`: Manages challenge invitations between users
- `challenge_sessions`: Active challenge sessions with quiz details
- `challenge_participants`: Participants in each challenge session
- `challenge_answers`: Individual answers submitted during challenges
- `challenge_results`: Final results and rankings for completed challenges

#### Real-time Features
- Supabase real-time subscriptions for instant updates
- Online user presence tracking
- Live challenge request notifications
- Real-time session updates during quiz battles

### 🎮 User Experience

#### Challenge Interface (`/challenge`)
- **Online Players Tab**: View all currently online and available players
- **My Challenges Tab**: Manage incoming and outgoing challenge requests
- **Active Sessions Tab**: Join ongoing challenge sessions

#### Challenge Session (`/challenge/:sessionId`)
- **Waiting Room**: Participants must mark themselves as ready
- **Quiz Battle**: Synchronized quiz experience with timer
- **Results Display**: Final scores and rankings

### 🔧 Technical Implementation

#### Components
- `ChallengeInterface`: Main challenge center with player list and request management
- `ChallengeSession`: Real-time quiz battle interface
- `useChallenge`: Custom hook for challenge system state management
- `challengeService`: Service layer for API calls and real-time subscriptions

#### Key Features
- **Automatic Cleanup**: Expired challenge requests are automatically cleaned up
- **Activity Tracking**: Users' current activity (idle, in_quiz, in_challenge) is tracked
- **Session Management**: Challenge sessions are created automatically when requests are accepted
- **Real-time Updates**: All participants see live updates during quiz battles

### 🚀 Getting Started

1. **Database Migration**: Run the challenge system migration to set up the required tables
2. **Access Challenge Center**: Navigate to `/challenge` from the dashboard
3. **Find Online Players**: Browse the list of currently online users
4. **Send Challenges**: Select a quiz and send challenge requests to other players
5. **Join Battles**: Accept incoming challenges and participate in quiz battles

### 📱 User Flow

1. **User goes online**: Automatically marked as available in the online users list
2. **Send challenge**: Select a player and quiz, optionally add a message
3. **Receive notification**: Challenged player gets real-time notification
4. **Accept/Decline**: Player can accept or decline the challenge
5. **Join session**: Both players join the challenge session
6. **Mark ready**: Both players must mark themselves as ready
7. **Quiz battle**: Synchronized quiz experience with live scoring
8. **View results**: Final scores and rankings are displayed

### 🔒 Security & Privacy

- **Row Level Security**: All tables have proper RLS policies
- **User Authentication**: All actions require authenticated users
- **Privacy Controls**: Users can control their online availability
- **Session Isolation**: Challenge sessions are isolated and secure

### 🎯 Future Enhancements

- **Tournament Mode**: Multi-player tournaments with brackets
- **Spectator Mode**: Allow others to watch ongoing challenges
- **Achievement System**: Badges and rewards for challenge victories
- **Chat Integration**: Real-time chat during challenge sessions
- **Custom Rules**: Allow custom quiz rules and time limits

## Database Migration

Run the migration file to set up the challenge system:

```sql
-- Located at: supabase/migrations/20250115000000-add-challenge-system.sql
```

This migration creates all necessary tables, indexes, RLS policies, and real-time subscriptions for the challenge system.

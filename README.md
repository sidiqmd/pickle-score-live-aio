# Pickle Score Live

A modern, full-stack pickleball scorecard application built with Next.js, NestJS, and PostgreSQL. Track your pickleball games and matches with an intuitive, feature-rich interface.

## Features

### Core Functionality
- **Real-Time Scoring**: Track scores instantly with an intuitive interface
- **Singles & Doubles Support**: Full support for both game formats
- **Multiple Scoring Systems**: Rally point and service point scoring
- **Timeout Management**: Track timeouts, medical breaks, and game delays
- **Penalty Tracking**: Record warnings, technical fouls, and forfeitures
- **Match History**: Complete history of all matches with detailed statistics
- **Modern UI**: Built with shadcn/ui and Tailwind CSS (Amber Minimal theme)

### Technical Features
- Responsive design for mobile and desktop
- RESTful API with NestJS
- PostgreSQL database with TypeORM
- Docker support for easy deployment
- TypeScript throughout the stack

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **shadcn/ui** - Beautiful, accessible components
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible components
- **Axios** - HTTP client

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeORM** - ORM for TypeScript
- **PostgreSQL** - Relational database
- **Class Validator** - Validation decorators

## Project Structure

```
pickle-score-live-aio/
├── frontend/               # Next.js frontend application
│   ├── app/               # Next.js app directory
│   │   ├── page.tsx       # Landing page
│   │   ├── matches/       # Match history
│   │   └── scorecard/     # Scorecard pages
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   └── scorecard/    # Scorecard-specific components
│   └── lib/              # Utilities and API client
├── backend/               # NestJS backend application
│   └── src/
│       ├── entities/      # Database entities
│       ├── dto/          # Data transfer objects
│       ├── services/     # Business logic
│       ├── controllers/  # API endpoints
│       ├── migrations/   # Database migrations
│       └── config/       # Configuration files
└── docker-compose.yml    # Docker orchestration
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- PostgreSQL 15 or higher
- npm or yarn

### Option 1: Local Development

#### 1. Set up PostgreSQL

Create a PostgreSQL database:

```bash
createdb pickle_score
```

Or using PostgreSQL CLI:

```sql
CREATE DATABASE pickle_score;
```

#### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
npm run migration:run

# Start development server
npm run start:dev
```

The backend will be running at `http://localhost:3001`

#### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local if needed

# Start development server
npm run dev
```

The frontend will be running at `http://localhost:3000`

### Option 2: Docker (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (database data)
docker-compose down -v
```

Services will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`
- PostgreSQL: `localhost:5432`

## Database Migrations

### Create a new migration

```bash
cd backend
npm run migration:generate -- src/migrations/MigrationName
```

### Run migrations

```bash
npm run migration:run
```

### Revert last migration

```bash
npm run migration:revert
```

## API Endpoints

### Matches

- `POST /matches` - Create a new match
- `GET /matches` - Get all matches
- `GET /matches/:id` - Get a specific match
- `PATCH /matches/:id` - Update a match
- `DELETE /matches/:id` - Delete a match

### Games

- `POST /matches/:matchId/games` - Create a new game for a match
- `GET /games/:id` - Get a specific game
- `PATCH /games/:id` - Update a game
- `POST /games/:id/start` - Start a game
- `POST /games/:id/complete` - Complete a game
- `POST /games/:id/events` - Add an event to a game

## Development

### Frontend Development

```bash
cd frontend

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Backend Development

```bash
cd backend

# Run development server (with watch mode)
npm run start:dev

# Build for production
npm run build

# Start production server
npm run start:prod

# Run tests
npm test

# Lint code
npm run lint
```

## Production Deployment

### Using Docker

1. Build and start all services:

```bash
docker-compose up -d
```

2. The application will be available at `http://localhost:3000`

### Manual Deployment

#### Backend

```bash
cd backend
npm run build
NODE_ENV=production node dist/main.js
```

#### Frontend

```bash
cd frontend
npm run build
npm start
```

## Environment Variables

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend (.env)

```env
PORT=3001
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=pickle_score
NODE_ENV=development
```

## Features Comparison with pbscorecard.com

This application includes all features from pbscorecard.com **except DUPR integration**:

✅ **Included Features:**
- Digital scorecard for tracking games
- Singles and doubles support
- Rally point and service point scoring
- Timeout management with counters
- Verbal warnings, technical warnings, and technical fouls
- Medical timeout tracking
- Game and match forfeits
- Side switching
- Match history and results
- Venue and court number tracking
- Multi-game match support

❌ **Excluded Features:**
- DUPR account integration
- Automatic DUPR result submission

## Modern Improvements

This application adds several modern improvements:

- **Beautiful Landing Page**: Feature-rich homepage with clear navigation
- **Modern UI Design**: Clean, minimal design with amber theme
- **Responsive Layout**: Works perfectly on mobile and desktop
- **Real-time Updates**: Instant score updates and game state management
- **Match History**: Browse all past matches with detailed information
- **Sample Scorecard**: Interactive demo for new users
- **Docker Support**: Easy deployment with containerization
- **TypeScript**: Type safety throughout the entire stack
- **REST API**: Well-documented, standard API endpoints

## License

MIT

## Support

For issues and questions, please open an issue on the repository.

---

**Pickle Score Live** - Modern pickleball scoring for everyone

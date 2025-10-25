import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Player {
  id?: string;
  name: string;
  gender: 'M' | 'F' | 'X';
  team: number;
}

export interface GameConfig {
  gameFormat: 'singles' | 'doubles';
  scoringSystem: 'rally' | 'service';
  maxGames: number;
  winningScore: number;
  timeoutsPerGame: number;
  venue?: string;
  courtNumber?: string;
}

export interface Match {
  id: string;
  players: Player[];
  config: GameConfig;
  status: 'pending' | 'in_progress' | 'completed' | 'forfeited';
  createdAt: string;
  updatedAt: string;
  games?: Game[];
}

export interface Game {
  id: string;
  matchId: string;
  gameNumber: number;
  team1Score: number;
  team2Score: number;
  team1Timeouts: number;
  team2Timeouts: number;
  currentServer: number;
  serverNumber: 1 | 2;
  status: 'pending' | 'in_progress' | 'completed';
  startedAt?: string;
  completedAt?: string;
  events: GameEvent[];
}

export interface GameEvent {
  id: string;
  gameId: string;
  type: 'score' | 'timeout' | 'warning' | 'technical_warning' | 'technical_foul' | 'medical_timeout' | 'switch_sides';
  team?: number;
  player?: string;
  timestamp: string;
  data?: any;
}

// Match API
export const matchApi = {
  create: async (data: { players: Player[]; config: GameConfig }): Promise<Match> => {
    const response = await api.post('/matches', data);
    return response.data;
  },

  getAll: async (): Promise<Match[]> => {
    const response = await api.get('/matches');
    return response.data;
  },

  getById: async (id: string): Promise<Match> => {
    const response = await api.get(`/matches/${id}`);
    return response.data;
  },

  update: async (id: string, data: Partial<Match>): Promise<Match> => {
    const response = await api.patch(`/matches/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/matches/${id}`);
  },
};

// Game API
export const gameApi = {
  create: async (matchId: string): Promise<Game> => {
    const response = await api.post(`/matches/${matchId}/games`);
    return response.data;
  },

  getById: async (id: string): Promise<Game> => {
    const response = await api.get(`/games/${id}`);
    return response.data;
  },

  update: async (id: string, data: Partial<Game>): Promise<Game> => {
    const response = await api.patch(`/games/${id}`, data);
    return response.data;
  },

  addEvent: async (gameId: string, event: Omit<GameEvent, 'id' | 'gameId' | 'timestamp'>): Promise<GameEvent> => {
    const response = await api.post(`/games/${gameId}/events`, event);
    return response.data;
  },

  start: async (id: string): Promise<Game> => {
    const response = await api.post(`/games/${id}/start`);
    return response.data;
  },

  complete: async (id: string): Promise<Game> => {
    const response = await api.post(`/games/${id}/complete`);
    return response.data;
  },
};

export default api;

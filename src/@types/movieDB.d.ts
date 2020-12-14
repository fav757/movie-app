export type Actor = {
  known_for_department?: Array<string>;
  name?: string;
  profile_path?: string;
  gender?: number;
  character?: string;
  popularity?: number;
  known_for?: Array<{
    id: number;
    media_type: string;
  }>;
};

export type FilmInfo = {
  id?: number;
  name?: string;
  title?: string;
  status?: string;
  backdrop_path?: string;
  poster_path?: string;
  homepage?: string;
  adult?: boolean;
  release_date?: string;
  first_air_date?: string;
  last_air_date?: string;
  number_of_episodes?: number;
  number_of_seasons?: number;
  genres?: { id: number; name: string }[];
  runtime?: number;
  tagline?: string;
  vote_average?: number;
  popularity?: number;
  overview?: string;
  production_companies?: Company[];
  genre_ids?: Array<number>;
};

export interface ReviewData {
  author?: string;
  author_details?: {
    name?: string;
    username?: string;
    avatar_path?: string;
    rating?: number;
  };
  content?: string;
  created_at?: string;
  id?: string;
  updated_at?: string;
  url?: string;
}

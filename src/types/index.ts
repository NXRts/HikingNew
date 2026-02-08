export interface Mountain {
  id: string;
  name: string;
  elevation: number;
  difficulty: "Easy" | "Moderate" | "Hard" | "Expert";
  description: string;
  location: [number, number]; // [lat, lng]
  gpxUrl: string;
}

export interface Waypoint {
  id: string;
  type: "basecamp" | "water" | "pos" | "summit";
  name: string;
  coordinates: [number, number];
  description?: string;
}

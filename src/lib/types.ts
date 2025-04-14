export interface Event {
    id: number;
    created_at: string;
    name: string;
    eventDate: string;
    time: string;
    location: string;
    description: string;
    image: string;
    eventOrganizerID: string;
    bulkVote: boolean;
    showVote: boolean;
    voteStartDate: string;
    voteEndDate: string;
  }
  
  export type EventStatus = 'upcoming' | 'current' | 'past';
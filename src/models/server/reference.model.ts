export type TReferenceResponse = {
  greetings: string;
  references: TReference[];
};

export type TReference = {
  id: string;
  question: string;
  type: string;
  sortIndex: number;
  suggestions: { id: string; value: string; selected?: boolean }[];
};

export type TItineraryReferenceRequest = {
  destination: string;
  startDate: string;
  endDate: string;
  member: string;
  styles: string[];
  activities: string[];
};

export type TItineraryReferenceRes = {
  schedule: TSchedule[];
  accommodations: TAccommodation[];
};

export type TItinerary = {
  destination: string;
  startDate: string;
  endDate: string;
  member: string;
  styles: string[];
  activities: string[];
};

export type TSchedule = {
  day: number;
  locations: TLocation[];
};

export type TLocation = {
  day: number;
  time: string;
  locationName: string;
  note: string;
  coords: [number, number];
};

export type TAccommodation = {
  accommodationName: string;
  description: string;
  link: string;
};

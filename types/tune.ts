/**
 * Tune-related types
 */

export type TuneObject = {
  id: number;
  sessionId: number;
  name: string;
  tags: { id: number; name: string }[];
};


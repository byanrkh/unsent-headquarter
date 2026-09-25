// Placeholder data shaped like the real `letters` table (see libs/letters.ts
// on unsent.cc). Swap this for real fetches once the admin API exists —
// the shapes below are what the UI expects back.

export type AdminLetter = {
  id: string;
  to: string;
  message: string;
  createdAt: string;
  feltCount: number;
  reportCount: number;
  status: "visible" | "hidden";
};

export const mockLetters: AdminLetter[] = [
  {
    id: "1",
    to: "my father",
    message:
      "I forgave you a long time ago. I just never found the moment to say it out loud, and now I'm not sure there's a right one left.",
    createdAt: "2026-09-25T09:12:00Z",
    feltCount: 312,
    reportCount: 0,
    status: "visible",
  },
  {
    id: "2",
    to: "the version of me from three years ago",
    message:
      "You were right to leave. I just wish it hadn't taken this long to stop hurting.",
    createdAt: "2026-09-25T07:40:00Z",
    feltCount: 128,
    reportCount: 0,
    status: "visible",
  },
  {
    id: "3",
    to: "someone I met once on a train",
    message:
      "I think about that conversation more than I'll ever admit to anyone who actually knows me.",
    createdAt: "2026-09-24T22:03:00Z",
    feltCount: 47,
    reportCount: 2,
    status: "visible",
  },
  {
    id: "4",
    to: "my best friend",
    message:
      "I'm sorry I wasn't there. I didn't know how to be, back then, and I've never known how to say that without it sounding like an excuse.",
    createdAt: "2026-09-24T14:55:00Z",
    feltCount: 9,
    reportCount: 5,
    status: "hidden",
  },
  {
    id: "5",
    to: "my mother",
    message: "Thank you for staying up. I noticed every time, even silently.",
    createdAt: "2026-09-24T11:02:00Z",
    feltCount: 201,
    reportCount: 0,
    status: "visible",
  },
  {
    id: "6",
    to: "whoever reads this",
    message: "It gets quieter. Not better, exactly — just quieter.",
    createdAt: "2026-09-23T20:18:00Z",
    feltCount: 89,
    reportCount: 1,
    status: "visible",
  },
];

export const mockStats = {
  totalLetters: 4821,
  lettersToday: 63,
  totalFelt: 39204,
  pendingReports: mockLetters.filter((l) => l.reportCount > 0).length,
};

// Letters submitted per day, oldest to newest — last entry is "today".
// Drives the sparkline on the overview page.
export const last7Days = [41, 38, 52, 47, 60, 55, 63];
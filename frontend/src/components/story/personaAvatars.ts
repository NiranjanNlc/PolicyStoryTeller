const AVATARS = ["👩‍💼", "👨‍🌾", "👩‍🏫", "🧑‍💻", "👨‍⚕️", "🧑‍🎓"] as const;

export function personaAvatar(index: number): string {
  return AVATARS[index % AVATARS.length];
}

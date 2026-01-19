export enum GameMode {
  MENU = 'MENU',
  LEVEL_1_TALKING_BOX = 'LEVEL_1_TALKING_BOX',
  LEVEL_1_BUG_SMASH = 'LEVEL_1_BUG_SMASH',
  LEVEL_1_ROBOT_CHEF = 'LEVEL_1_ROBOT_CHEF',
  LEVEL_2_TREASURE = 'LEVEL_2_TREASURE',
  LEVEL_2_NUMBER_BATTLE = 'LEVEL_2_NUMBER_BATTLE',
  LEVEL_2_INTERVIEW = 'LEVEL_2_INTERVIEW',
  LEVEL_3_GATE = 'LEVEL_3_GATE',
  LEVEL_3_PATH = 'LEVEL_3_PATH',
  LEVEL_3_TRAFFIC = 'LEVEL_3_TRAFFIC',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface PythonVariable {
  name: string;
  value: string | number;
  type: 'string' | 'number';
}

export interface BugChallenge {
  id: number;
  brokenCode: string;
  correctCode: string | string[]; // Can accept multiple correct variations
  hint: string;
  solved: boolean;
}
import type {IconType} from 'react-icons';
import { AiOutlineOpenAI } from "react-icons/ai";
import {

  SiGooglegemini,
  SiClaude,
  SiGithubcopilot,
  SiPerplexity,
  SiDeepseek,
} from 'react-icons/si';



export interface AIButton {
  name: string;
  url: string;
  icon : IconType;
}

export const aiButtons: AIButton[] = [
  {
    name: 'ChatGPT',
    url: 'https://chatgpt.com/',
    icon: AiOutlineOpenAI,
  },
  {
    name: 'Gemini',
    url: 'https://gemini.google.com/',
    icon: SiGooglegemini,
  },
  {
    name: 'Claude',
    url: 'https://claude.ai/',
    icon: SiClaude,
  },
  {
    name: 'Copilot',
    url: 'https://copilot.microsoft.com/',
    icon: SiGithubcopilot,
  },
  {
    name: 'Perplexity',
    url: 'https://www.perplexity.ai/',
    icon: SiPerplexity,
  },
  {
    name: 'DeepSeek',
    url: 'https://chat.deepseek.com/',
    icon: SiDeepseek,
  },
];



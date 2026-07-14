import { describe, it, expect } from 'vitest';
import { buildTypingFrames } from './hangulTypewriter';

describe('buildTypingFrames', () => {
  it('assembles a Korean word jamo-by-jamo', () => {
    expect(buildTypingFrames('알고리즘')).toEqual([
      'ㅇ', '아', '알', '알ㄱ', '알고', '알고ㄹ', '알고리', '알고리ㅈ', '알고리즈', '알고리즘',
    ]);
  });

  it('types non-Korean text one character per frame', () => {
    expect(buildTypingFrames('AI')).toEqual(['A', 'AI']);
  });

  it('handles mixed content and spaces', () => {
    expect(buildTypingFrames('AI 봇')).toEqual(['A', 'AI', 'AI ', 'AI ㅂ', 'AI 보', 'AI 봇']);
  });

  it('always ends on the full target', () => {
    for (const s of ['풀스택 엔지니어', 'Solutions Architect', '알고리즘 트레이딩 애호가']) {
      const frames = buildTypingFrames(s);
      expect(frames[frames.length - 1]).toBe(s);
    }
  });
});

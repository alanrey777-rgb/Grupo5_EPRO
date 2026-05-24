import { Lesson } from './lesson.model';

export interface MaterialFile {
  id: number;
  fileName: string;
  fileUrl: string;
  fileType: string;
  uploadedAt: string;
  lesson: Lesson;
}
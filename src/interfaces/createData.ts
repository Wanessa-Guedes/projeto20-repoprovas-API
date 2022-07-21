import { User, Category, Test, Discipline, Term, TeacherDiscipline, Teacher } from "@prisma/client";

export type CreateDataUser = Omit<User, "id" | "createAt">;
export type CreateDataCategory = Omit<Category, "id" | "createAt">;
export type CreateDataTest = Omit<Test, "id" | "createAt">;
export type CreateDataDiscipline = Omit<Discipline, "id" | "createAt">;
export type CreateDataTerm = Omit<Term, "id" | "createAt">;
export type CreateDataTeacherDiscipline = Omit<TeacherDiscipline, "id" | "createAt">;
export type CreateDataTeacher = Omit<Teacher, "id" | "createAt">;
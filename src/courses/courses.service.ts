import { Course } from './entities/course.entity';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Fundamentos do framwork Nestjs',
      description: 'Curso completo',
      tags: ['node.js', 'nestjs', 'javascript'],
    },
  ];

  // metodos utilizados no controler
  findAll() {
    return this.courses;
  }

  findOne(id: string) {
    const course = this.courses.find((course: Course) => {
      return course.id === Number(id);
    });
    console.log(course);
    if (!course) {
      throw new HttpException(
        `Course ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return course;
  }

  // os DTO (Data-transfer Object)
  create(createCourseDto: any) {
    this.courses.push(createCourseDto);
    return createCourseDto;
  }

  update(id: string, updateCourseDto: any) {
    const findCourse = this.courses.findIndex((course: Course) => {
      return course.id === Number(id);
    });

    if (findCourse >= 0) {
      this.courses[findCourse] = updateCourseDto;
    }

    return this.courses;
  }

  remove(id: string) {
    const findCourse = this.courses.findIndex((course: Course) => {
      return course.id === Number(id);
    });
    if (findCourse >= 0) {
      this.courses.splice(findCourse, 1);
    }

    return this.courses;
  }
}

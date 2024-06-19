import {
  ChildEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}

/**
 * 아래는 computer와 airplane 각각의 테이블을 만들지 않고 singleBaseModel이라는
 * 하나의 테이블에 모두 들어와 있는 것을 확인할 수 있다.
 * 하지만 이런 방법은 권장하는 것은 아님
 */
@Entity()
@TableInheritance({
  column: {
    name: 'type',
    type: 'varchar',
  },
})
export class SingleBaseModel {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
@ChildEntity()
export class ComputerModel extends SingleBaseModel {
  @Column()
  brand: string;
}
@ChildEntity()
export class AirplaneModel extends SingleBaseModel {
  @Column()
  country: string;
}
@Entity()
export class BookModel extends BaseModel {
  @Column()
  name: string;
}
@Entity()
export class CarModel extends BaseModel {
  @Column()
  brand: string;
}

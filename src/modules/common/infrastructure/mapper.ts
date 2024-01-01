export abstract class Mapper<OrmEntity, Entity> {
  public abstract toDomain(ormEntity: OrmEntity): Entity;

  public abstract toPersist(entity: Entity): OrmEntity;
}
